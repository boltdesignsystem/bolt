// IMPORTANT: NO ASYNC
// Only synchronous functions. Tests runners don't take well to waiting, or `await`-ing :) Jest needs to know the name of every test at bootstrap and you can't run any async at beginning (i.e. before a global `beforeAll()` than can be async). CLI tools can miss the `stdout` sometimes if async isn't done totally right. It all makes it way more resiliant to just synchronous.
const execa = require('execa');
const { join, dirname, relative, parse } = require('path');
const { readJSONSync } = require('fs-extra');
const globby = require('globby');
const findPkg = require('find-pkg');

/**
 * helper function to get gitSha without needing a GITHUB_TOKEN (for local dev);
 * @returns {string} git sha of last commit
 */
const gitSha = execa.sync('git', ['rev-parse', '--short', 'HEAD']).stdout;

const repoRoot = join(__dirname, '../../..');
const lernaCli = join(repoRoot, 'node_modules/.bin/lerna');

/**
 * Run Lerna commands and retrieve structured data
 * @param {string} cmd - anything after the `lerna` cli, `--json` gets appended, see `lerna -h`
 * @returns {Object | Array} lernaResults
 */
function runLernaCmd(cmd) {
  try {
    const results = execa.shellSync([lernaCli, cmd, '--json'].join(' '), {
      cwd: repoRoot,
    });
    return JSON.parse(results.stdout);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

/**
 * @typedef {Object} BoltPkg
 * @prop {string} name
 * @prop {string} version
 * @prop {string} location
 * @prop {boolean} private
 */

/**
 * Get all Bolt packages known by Lerna
 * @param {Object} opt
 * @param {boolean} [opt.includePrivatePkgs=false] - include any packages with `"private": true` in their `package.json`
 * @returns {BoltPkg[]} - boltPkgs
 */
function getPkgList({ includePrivatePkgs = false } = {}) {
  const cmds = ['list'];
  if (includePrivatePkgs) cmds.push('--all');
  return runLernaCmd(cmds.join(' '));
}

/**
 * Get a package's recursive dependencies
 * @param {string} pkgName - name of package, i.e. '@bolt/components-band'
 * @returns {string[]} list of local packages that are dependencies, recursively
 * @see {getPkgDependents}
 */
function getPkgDependencies(pkgName) {
  const cmds = [
    'list',
    '--include-filtered-dependencies',
    `--scope '${pkgName}'`,
  ];
  const pkgs = runLernaCmd(cmds.join(' '));
  return pkgs.filter(p => p.name !== pkgName).map(p => p.name);
}

/**
 * Get a package's recursive dependents
 * @param {string} pkgName - name of package, i.e. '@bolt/components-band'
 * @returns {string[]} list of local packages that are dependents, recursively
 * @see {getPkgDependencies}
 */
function getPkgDependents(pkgName) {
  const cmds = [
    'list',
    '--include-filtered-dependents',
    `--scope '${pkgName}'`,
  ];
  const pkgs = runLernaCmd(cmds.join(' '));
  return pkgs.filter(p => p.name !== pkgName).map(p => p.name);
}

/**
 * Get a packages file path from its name
 * @param {string} pkgName - name of package, i.e. '@bolt/components-band'
 * @returns {string} absolute path to folder
 */
function getPkgPathFromName(pkgName) {
  try {
    const pkg = require.resolve(`${pkgName}/package.json`);
    return dirname(pkg);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

/**
 * Get a list of all files in a package
 * @param {string} pkgName - name of package, i.e. `@bolt/components-band`
 * @returns {string[]} list of file paths in that package
 */
function getPkgFiles(pkgName) {
  const pkgDir = getPkgPathFromName(pkgName);
  return globby.sync(join(pkgDir, '**/*.*'), {
    gitignore: true,
  });
}

/**
 * Get a package's name from a path to any file in the package
 * @param {string} file
 * @return {string} name of package, i.e. '@bolt/components-band'
 */
function getFilesPkgSync(file) {
  const pkgPath = findPkg.sync(file);
  let pkg = readJSONSync(pkgPath);
  // grab parent package of package.json that are used by Yeoman `generator-*`s
  if (pkg.name.startsWith('<%=')) {
    const pkgPath2 = findPkg.sync(join(pkgPath, '..'));
    pkg = readJSONSync(pkgPath2);
  }
  return pkg ? pkg.name : '';
}

/**
 * @param {Object} opt
 * @param {string} [opt.from] - git commit id to compare from (i.e. current PR branch). defaults to current commit id
 * @param {string} [opt.base='master'] - git commit id to compare to (i.e. the base branch your PR is pointed to)
 * @param {string} [opt.inDir] - directory to filter by
 * @return {string[]} list of files changed
 */
function getFilesChanged({ from = gitSha, base = 'master', inDir } = {}) {
  const cmds = ['git', 'diff', '--name-only', `${base}...${from}`];
  if (inDir) cmds.push(inDir);
  try {
    const results = execa.shellSync(cmds.join(' '), {
      cwd: repoRoot,
    });
    const files = results.stdout.split('\n');
    if (!files) return [];
    return files.map(file => join(repoRoot, file));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

/**
 * @param {Object} opt
 * @param {string} [opt.from] - git commit id to compare from (i.e. current PR branch). defaults to current commit id
 * @param {string} [opt.base='master'] - git commit id to compare to (i.e. the base branch your PR is pointed to)
 * @returns {{ name: string, absPath: string, relPath: string }[]}
 */
function getPkgsChanged({ from = gitSha, base = 'master' } = {}) {
  const filesChanged = getFilesChanged({ from, base });
  if (!filesChanged) return [];

  const foldersToExclude = ['__tests__', '__snapshots__'];
  const filesToExclude = ['CHANGELOG.md', 'package.json'];
  const pkgsToExclude = [
    'bolt', // monorepo
    '@bolt/website',
    'generator-bolt',
    '@bolt/drupal-twig-extensions',
    '@bolt/uikit-workshop',
  ];

  // will contain package names and keep them unique
  const pkgs = new Set();

  filesChanged.forEach(filePath => {
    const { base: filename, dir } = parse(filePath);
    const dirs = dir.split('/');
    // exclude if in foldersToExclude
    if (dirs.some(d => foldersToExclude.includes(d))) {
      return;
    }

    // exclude if in filesToExclude
    if (filesToExclude.includes(filename)) {
      return;
    }

    const pkgName = getFilesPkgSync(filePath);

    // exclude if in pkgsToExclude
    if (pkgsToExclude.includes(pkgName)) {
      return;
    }
    pkgs.add(pkgName);
  });

  return [...pkgs].map(name => {
    const absPath = getPkgPathFromName(name);
    return {
      name,
      absPath,
      relPath: relative(repoRoot, absPath),
    };
  });
}

module.exports = {
  getPkgPathFromName,
  getPkgDependents,
  getPkgDependencies,
  getPkgList,
  getPkgFiles,
  getFilesPkgSync,
  getFilesChanged,
  getPkgsChanged,
  gitSha,
};
