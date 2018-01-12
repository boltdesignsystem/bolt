const path = require('path');
const log = require('./log');

/**
 * Get information about a components assets
 * @param {string} component - Machine name of a component i.e. `@bolt/button`
 * @returns {{name, basicName: string | * | void}} - Asset info
 */
function getAssets(component) {
  // @todo Ensure package exists
  const pkgJsonPath = require.resolve(`${component}/package.json`);
  const pkgPath = path.dirname(pkgJsonPath);
  const pkg = require(pkgJsonPath);
  const assets = {
    name: pkg.name,
    basicName: pkg.name.replace('@bolt/', 'bolt-'),
  };
  // @todo Ensure asset files exist
  if (pkg.style) assets.style = path.join(pkgPath, pkg.style);
  if (pkg.main) assets.main = path.join(pkgPath, pkg.main);
  // @todo Allow verbosity settings
  // console.log(assets);
  return assets;
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
      const assets = getAssets(component);
      if (assets.style) entry['bolt-global'].push(assets.style);
      if (assets.main) entry['bolt-global'].push(assets.main);
    });
  }
  if (components.individual) {
    components.individual.forEach((component) => {
      const assets = getAssets(component);
      const files = [];
      if (assets.style) files.push(assets.style);
      if (assets.main) files.push(assets.main);
      if (files) {
        entry[assets.basicName] = files;
      } else {
        log.error(`No assets found for ${assets.name}`, assets);
      }
    });
  }
  // @todo Allow verbosity settings for seeing `entry`
  return entry;
}

module.exports = {
  getAssets,
  buildWebpackEntry,
};
