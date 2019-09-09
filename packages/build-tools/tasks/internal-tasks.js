const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp'));
const ora = require('ora');
const chalk = require('chalk');
const del = require('del');
const timer = require('@bolt/build-utils/timer');
const log = require('@bolt/build-utils/log');
const { getConfig } = require('@bolt/build-utils/config-store');
let config;

/**
 * Makes all directories in config
 * @async
 * @returns {Promise}
 */
async function mkDirs() {
  config = config || (await getConfig());

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
  config = config || (await getConfig());

  const spinner = ora(chalk.blue('Cleaning files...')).start();
  const startTime = timer.start();

  await del(dirs, {
    // dryRun: true, // debug what's flagged for being deleted
    force: true, // needed if you want to delete directories outside CWD
  }).then(paths => {
    // console.log('Files and folders that would be deleted:\n', paths.join('\n'));
  });

  spinner.succeed(chalk.green(`Cleaned files in ${timer.end(startTime)}`));
  if (config.verbosity > 2) {
    console.log(dirs);
  }
  return true;
}

module.exports = {
  mkDirs,
  clean,
};
