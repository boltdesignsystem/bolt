// IMPORTANT: NO ASYNC
// Only synchronous functions. Tests runners don't take well to waiting, or `await`-ing :) Jest needs to know the name of every test at bootstrap and you can't run any async at beginning (i.e. before a global `beforeAll()` than can be async). CLI tools can miss the `stdout` sometimes if async isn't done totally right. It all makes it way more resiliant to just synchronous.
const execa = require('execa');
const { join, dirname, relative } = require('path');
const { readFileSync, readJSONSync } = require('fs-extra');
const globby = require('globby');
const findPkg = require('find-pkg');
const { gitSha } = require('../utils');

const repoRoot = join(__dirname, '../..');
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
 * Get all Bolt packages known by Lerna
 * @param {Object} opt
 * @param {boolean} [opt.includePrivatePkgs=false] - include any packages with `"private": true` in their `package.json`
 * @returns {{ name: string, version: string, location: string, private: boolean }[]} - boltPkgs
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
 * Get a package's name from a path to it's directory
 * @param {string} pkgPath - path to folder of package with 'package.json' in it
 * @returns {string} name of package, i.e. '@bolt/components-band'
 * @deprecated use `getFilesPkg`
 */
function getPkgNameFromPath(pkgPath) {
  try {
    const pkgJsonPath = join(pkgPath, 'package.json');
    const pkg = readJSONSync(pkgJsonPath);
    return pkg.name;
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
function getFilesPkg(file) {
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
 * @param {string} [opt.to='master'] - git commit id to compare to (i.e. the base branch your PR is pointed to)
 * @param {string} [opt.inDir] - directory to filter by
 * @return {string[]} list of files changed
 */
function getFilesChanged({ from = gitSha, to = 'master', inDir } = {}) {
  const cmds = ['git', 'diff', '--name-only', `${to}...${from}`];
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
 * @returns {string[]}
 * @todo extract out all exclude functions into testable single functions
 */
function getPkgsChanged({ from = gitSha, to = 'master' }) {
  const filesChanged = getFilesChanged({ from, to });
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
    // @todo exclude if in foldersToExclude
    // if (isInBadFolder) {
    //   console.log(filePath);
    //   return;
    // }

    // @todo exclude if in filesToExclude
    // if (isBadFile) {
    //   console.log(filePath);
    //   return;
    // }

    const pkgName = getFilesPkg(filePath);
    pkgs.add(pkgName);
  });

  const pkgsChanged = [...pkgs].filter(p => !pkgsToExclude.includes(p));

  return pkgsChanged.map(name => {
    const absPath = getPkgPathFromName(name);
    return {
      name,
      absPath,
      relPath: relative(process.cwd(), absPath),
    };
  });
}

module.exports = {
  getPkgDependencies,
  getPkgNameFromPath,
  getPkgPathFromName,
  getPkgDependents,
  getPkgDependencies,
  getPkgList,
  getPkgFiles,
  getFilesPkg,
  getFilesChanged,
};
