const chalk = require('chalk');
const { readYamlFileSync } = require('../utils/yaml');
const sh = require('../utils/sh');
const path = require('path');
const events = require('../utils/events');
const chokidar = require('chokidar');
const del = require('del');
const debounce = require('lodash.debounce');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');
const ora = require('ora');

const config = Object.assign({
  plConfigFile: 'config/config.yml',
  watchedPkgExtensions: [
    'twig',
    'data.*',
    'schema.*',
  ],
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md',
    'png',
    'php',
  ],
  extraWatches: [],
  debounceRate: 1000,
}, getConfig());

const plConfig = readYamlFileSync(config.plConfigFile);
const plRoot = path.join(config.plConfigFile, '../..');
const plSource = path.join(plRoot, plConfig.sourceDir);
const plPublic = path.join(plRoot, plConfig.publicDir);
const consolePath = path.join(plRoot, 'core/console');
const timer = require('../utils/timer');

function plBuild(errorShouldExit) {
  return new Promise((resolve, reject) => {
    const plSpinner = ora(chalk.blue('Building Pattern Lab...')).start();
    const startTime = timer.start();
    // log.taskStart('build: pattern lab');
    events.emit('pattern-lab:precompile');
    sh(`php -d memory_limit=4048M ${consolePath} --generate`, errorShouldExit, false)
      .then((output) => {

        plSpinner.succeed(chalk.green(`Built Pattern Lab in ${timer.end(startTime)}`));

        if (config.verbosity > 2) {
          console.log('---');
          console.log(output);
          console.log('===\n');
        }
        // events.emit('reload'); // Temporarily disable - still testing out HMR reload approach

        resolve(output);
      })
      .catch((error) => {
        plSpinner.fail(chalk.red('Building Pattern Lab Failed'));
        console.log(error);
        // reject(error);
      });
  });
}

function compile() {
  return plBuild(true);
}

compile.description = 'Compile Pattern Lab';
compile.displayName = 'pattern-lab:compile';

function compileWithNoExit() {
  return plBuild(false);
}

compileWithNoExit.displayName = 'pattern-lab:compile';

// Used by watches
const debouncedCompile = debounce(compileWithNoExit, config.debounceRate);

function watch() {
  const watchedExtensions = config.watchedExtensions.join(',');
  const watchedPkgExtensions = config.watchedPkgExtensions.join(',');
  const plGlob = [
    path.normalize(`${plSource}/**/*.{${watchedExtensions}}`),
    path.normalize(`${config.wwwDir}/${config.buildDir}/**/*.data.*`), // Watch for data files being output to the data folder

    // Component twig files + configs
    path.normalize(`../../packages/components/**/*.{${watchedPkgExtensions}}`),

    // Object twig files
    path.normalize(`../../packages/global/**/*.{${watchedPkgExtensions}}`),
  ];
  const src = config.extraWatches
    ? [].concat(plGlob, config.extraWatches)
    : plGlob;

  // The watch event ~ same engine gulp uses https://www.npmjs.com/package/chokidar
  const watcher = chokidar.watch(src, {
    ignoreInitial: true,
    cwd: process.cwd(),
    ignore: [
      '**/node_modules/**',
      '**/vendor/**',
    ],
  });

  // list of all events: https://www.npmjs.com/package/chokidar#methods--events
  watcher.on('all', (event, path) => {
    if (config.verbosity > 3) {
      console.log('Pattern Lab watch event: ', event, path);
    }
    debouncedCompile();
  });

}

watch.description = 'Watch and rebuild Pattern Lab';
watch.displayName = 'pattern-lab:watch';

async function clean() {
  const spinner = ora(chalk.blue('Cleaning Pattern Lab files...')).start();
  const startTime = timer.start();
  await del([
    plPublic,
  ]);
  spinner.succeed(chalk.green(`Cleaned Pattern Lab files in ${timer.end(startTime)}`));
  return true;
}

module.exports = {
  compile,
  watch,
  clean,
};
