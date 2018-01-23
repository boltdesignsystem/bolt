const log = require('../utils/log');
const {promisify} = require('util');
const mkdirp = promisify(require('mkdirp'));
const config = require('../utils/config-store').getConfig();

/**
 * Makes all directories in config
 * @async
 * @returns {Promise}
 */
async function mkDirs() {
  try {
    return Promise.all([
      mkdirp(config.wwwDir),
      mkdirp(config.dataDir),
      mkdirp(config.buildDir),
    ]);
  } catch (error) {
    log.errorAndExit('Could not make all directories necessary.', error);
  }
}

module.exports = {
  mkDirs,
};
