const chalk = require('chalk');
const { readYamlFileSync } = require('../utils/yaml');
const sh = require('../utils/sh');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const events = require('../utils/events');
const chokidar = require('chokidar');
const del = require('del');
const debounce = require('lodash.debounce');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');
const ora = require('ora');
const manifest = require('../utils/manifest');

const config = Object.assign({
  plConfigFile: 'config/config.yml',
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md',
    'png',
    'php',
  ],
  debounceRate: 1000,
}, getConfig());

const plConfig = readYamlFileSync(config.plConfigFile);
const plRoot = path.join(config.plConfigFile, '../..');
const plSource = path.join(plRoot, plConfig.sourceDir);
const plPublic = path.join(plRoot, plConfig.publicDir);
const consolePath = path.join(plRoot, 'core/console');
const timer = require('../utils/timer');

let initialBuild = true;

function plBuild(errorShouldExit) {
  return new Promise((resolve, reject) => {

    const plSpinner = initialBuild ?
      ora(chalk.blue('Building Pattern Lab for the first time...')).start() :
      ora(chalk.blue('Recompiling Pattern Lab...')).start();

    const startTime = timer.start();
    // log.taskStart('build: pattern lab');
    events.emit('pattern-lab:precompile');
    sh(`php -d memory_limit=4048M ${consolePath} --generate`, errorShouldExit, false)
      .then((output) => {

        initialBuild ?
          plSpinner.succeed(chalk.green(`Built Pattern Lab in ${timer.end(startTime)}`)) :
          plSpinner.succeed(chalk.green(`Rebuilt Pattern Lab in ${timer.end(startTime)}`));

        if (config.verbosity > 2) {
          console.log('---');
          console.log(output);
          console.log('===\n');
        }

        events.emit('reload');

        if (initialBuild){
          initialBuild = false;
        }

        resolve(output);
      })
      .catch((error) => {
        initialBuild ?
          plSpinner.fail(chalk.red('Initial build of Pattern Lab failed.')) :
          plSpinner.fail(chalk.red('Rebuild of Pattern Lab failed.'));
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
  const globPattern = `**/*.{${config.watchedExtensions.join(',')}}`;
  const watchedFiles = [
    ...manifest.getAllDirs(process.cwd()).map(dir => path.join(dir, globPattern)),
    path.join(plSource, globPattern),
    path.join(config.dataDir, '*.*'),
  ];

  // @todo show this when spinners are disabled at this high of verbosity
  // if (config.verbosity > 4) {
  //   log.info('Pattern Lab is Watching:');
  //   console.log(watchedFiles);
  // }

  // The watch event ~ same engine gulp uses https://www.npmjs.com/package/chokidar
  const watcher = chokidar.watch(watchedFiles, {
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

module.exports = {
  compile,
  watch,
};
