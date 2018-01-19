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
 * @param {string} pkgName - Machine name of a component i.e. `@bolt/button`
 * @returns {{name, basicName: string | * | void}} - Asset info
 */
function getPkgInfo(pkgName) {
  const pkgJsonPath = require.resolve(`${pkgName}/package.json`);
  const pkgPath = path.dirname(pkgJsonPath);
  const pkg = require(pkgJsonPath);
  const info = {
    name: pkg.name,
    basicName: pkg.name.replace('@bolt/', 'bolt-'),
    assets: {},
  };
  if (pkg.style) {
    info.assets.style = path.join(pkgPath, pkg.style);
    ensureFileExists(info.assets.style);
  }
  if (pkg.main) {
    info.assets.main = path.join(pkgPath, pkg.main);
    ensureFileExists(info.assets.main);
  }
  if (pkg.twig) {// can be a string or an array of strings
    const twigs = typeof pkg.twig === 'string' ? [pkg.twig] : pkg.twig;
    info.assets.twig = twigs.map(twig => path.join(pkgPath, twig));
    info.assets.twig.forEach(ensureFileExists);
  }
  if (Object.keys(info.assets).length === 0) {
    log.errorAndExit(`${pkgName} has not declared any assets in package.json in the keys "style", "main", or "twig", please correct or remove this package`);
  }
  // @todo Allow verbosity settings
  // console.log(assets);
  return info;
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
