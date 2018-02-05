const fs = require('fs');
const path = require('path');
const log = require('./log');
const config = require('./config-store').getConfig();

/**
 * Ensure a file exists
 * We don't want to do anything with the file now, we just want to provide an early error if a path is wrong.
 * This is called async and by the time an error is thrown, we may be several steps ahead with WebPack probably already trying to start - that's ok, we don't want to hold up the process everytime things are correct.
 * @param filePath {string} - Path to file to ensure exists
 */
function ensureFileExists(filePath) {
  fs.access(filePath, (err) => {
    if (err) {
      log.errorAndExit(`This file ^^^ does not exist and it was referenced in package.json for that component, please make sure the file path is correct.`, filePath);
    }
  });
}

/**
 * Get information about a components assets
 * @param {string} pkgName - Machine name of a component i.e. `@bolt/button` OR path to an entry file i.e. `./src/style.scss`
 * @returns {{name, basicName: string | * | void}} - Asset info
 */
function getPkgInfo(pkgName) {
  if (pkgName.endsWith('.scss') || pkgName.endsWith('.js')) {
    const pathInfo = path.parse(pkgName);
    const name = pathInfo.name + pathInfo.ext.replace('.', '-');
    const info = {
      name,
      basicName: name,
      dir: path.dirname(pkgName),
      assets: {},
    };
    if (pkgName.endsWith('.scss')) {
      info.assets.style = pkgName;
    }
    if (pkgName.endsWith('.js')) {
      info.assets.main = pkgName;
    }
    ensureFileExists(pkgName);
    return info;
  } else {// package name
    const pkgJsonPath = require.resolve(`${pkgName}/package.json`);
    const dir = path.dirname(pkgJsonPath);
    const pkg = require(pkgJsonPath);
    const info = {
      name: pkg.name,
      basicName: pkg.name.replace('@bolt/', 'bolt-'),
      dir,
      assets: {},
    };
    if (pkg.style) {
      info.assets.style = path.join(dir, pkg.style);
      ensureFileExists(info.assets.style);
    }
    if (pkg.main) {
      info.assets.main = path.join(dir, pkg.main);
      ensureFileExists(info.assets.main);
    }
    // @todo Allow verbosity settings
    // console.log(assets);
    return info;
  }
}

/**
 * Build WebPack config's `entry` object
 * @link https://webpack.js.org/configuration/entry-context/#entry
 * @param {object} components
 * @prop {string[]} components.global - Array of strings that are package names - all go into the global bundle
 * @prop {string[]} components.individual - Array of strings that are package names - each go into own bundle
 * @returns {object} entry - WebPack config `entry`
 */
function buildWebpackEntry(components) {
  const entry = {};
  if (components.global) {
    entry['bolt-global'] = [];
    components.global.forEach((component) => {
      const pkgInfo = getPkgInfo(component);
      if (pkgInfo.assets.style) entry['bolt-global'].push(pkgInfo.assets.style);
      if (pkgInfo.assets.main) entry['bolt-global'].push(pkgInfo.assets.main);
    });
  }
  if (components.individual) {
    components.individual.forEach((component) => {
      const pkgInfo = getPkgInfo(component);
      const files = [];
      if (pkgInfo.assets.style) files.push(pkgInfo.assets.style);
      if (pkgInfo.assets.main) files.push(pkgInfo.assets.main);
      if (files) {
        entry[pkgInfo.basicName] = files;
      }
    });
  }
  if (config.verbosity > 4) {
    log.info('WebPack `entry`:');
    console.log(entry);
  }
  return entry;
}

module.exports = {
  getPkgInfo,
  buildWebpackEntry,
};
