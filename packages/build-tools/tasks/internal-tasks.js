const log = require('../utils/log');
const {promisify} = require('util');
const mkdirp = promisify(require('mkdirp'));
const ora = require('ora');
const chalk = require('chalk');
const timer = require('../utils/timer');
const del = require('del');
const config = require('../utils/config-store').getConfig();

/**
 * Makes all directories in config
 * @async
 * @returns {Promise}
 */
async function mkDirs() {
  try {
    return Promise.all([
      config.wwwDir ? mkdirp(config.wwwDir) : null,
      config.dataDir ? mkdirp(config.dataDir) : null,
      config.buildDir ? mkdirp(config.buildDir) : null,
    ]);
  } catch (error) {
    log.errorAndExit('Could not make all directories necessary.', error);
  }
}

async function clean(dirs) {
  const spinner = ora(chalk.blue('Cleaning files...')).start();
  const startTime = timer.start();
  await del(dirs, {
    force: true, // needed if you want to delete directories outside CWD
  });
  spinner.succeed(chalk.green(`Cleaned files in ${timer.end(startTime)}`));
  return true;
}

module.exports = {
  mkDirs,
  clean,
};
