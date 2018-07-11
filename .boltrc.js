/**
 * Demo for testing out Bolt config updates that fall back to
 * using https://github.com/davidtheclark/cosmiconfig if a .boltrc
 * config file isn't already specified or initialized.
 *
 * This means that a .boltrc config in a parent folder would
 * automatically get used if a more local one can't be found --
 *
 * For example, we can now use Webpack's vanilla CLI as-is!
 *
 * ```bash
 *   cd packages/build-tools
 *   npx webpack-cli --config="create-webpack-config.js" --progress
 * ```
 */

const config = require('./apps/pattern-lab/.boltrc');

module.exports = config;
