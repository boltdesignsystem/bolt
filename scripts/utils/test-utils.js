#! /usr/bin/env node
const execa = require('execa');
const { join, dirname } = require('path');
const { readFileSync, readJSONSync } = require('fs-extra');
const globby = require('globby');
const findUp = require('find-up');

const repoRoot = join(__dirname, '../..');
const lernaCli = join(repoRoot, 'node_modules/.bin/lerna');

/**
 * @param {string} cmd
 * @returns {Object | Array}
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
 * @param {Object} opt
 * @param {boolean} [opt.includePrivatePkgs=false]
 * @returns {{ name: string, version: string, location: string private: boolean }[]}
 */
function getPkgList({ includePrivatePkgs = false } = {}) {
  const cmds = ['list'];
  if (includePrivatePkgs) cmds.push('--all');
  return runLernaCmd(cmds.join(' '));
}

/**
 * @param {string} pkgName - name of package, i.e. `@bolt/components-band`
 * @returns {string[]} list of local packages that are dependencies, recursively
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
 * @param {string} pkgName - name of package, i.e. `@bolt/components-band`
 * @returns {string[]} list of local packages that are dependents, recursively
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
 * @param {string} pkgName
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
 * @param {string} pkgPath - path to folder of package with `package.json` in it
 * @returns {string} name of package, i.e. `@bolt/components-band`
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
 * @param {string} file
 * @return {string} name of package, i.e. `@bolt/components-band`
 */
function getFilesPkg(file) {
  const pkgPath = findUp.sync('package.json', { cwd: dirname(file) });
  const pkg = readJSONSync(pkgPath);
  return pkg ? pkg.name : '';
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
};
