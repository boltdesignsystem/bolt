const yaml = require('../utils/yaml');
const sh = require('../utils/sh');
const path = require('path');
const events = require('../utils/events');
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');

module.exports = async () => {
  const config = Object.assign({
    plConfigFile: 'config/config.yml',

    // Try to limit the number of things being watched in the packages folder -- limiting to twig files + data and schema configs. Anything else?
    watchedPkgExtensions: [
      'twig',
      'data.*',
      'schema.*'
    ],
    watchedExtensions: [
      'twig',
      'json',
      'yaml',
      'yml',
      'md',
      'png',
      'php',
      'data.*'
    ],
    extraWatches: [],
    debounceRate: 1000,
  }, getConfig());

  const plConfig = await yaml.readYamlFile(config.plConfigFile);
  const plRoot = path.join(config.plConfigFile, '../..');
  const plSource = path.join(plRoot, plConfig.sourceDir);
  // const plPublic = path.join(plRoot, plConfig.publicDir);
  const consolePath = path.join(plRoot, 'core/console');

  function plBuild(errorShouldExit) {
    return new Promise((resolve, reject) => {
      log.taskStart('build: pattern lab');
      events.emit('pattern-lab:precompile');
      sh(`php -d memory_limit=4048M ${consolePath} --generate`, errorShouldExit)
        .then(() => {
          // events.emit('reload');
          log.taskDone('build: pattern lab');
          resolve();
        })
        .catch(reject);
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

    console.log(path.normalize(`${config.wwwDir}/${config.buildDir}/**/*.data.*`));

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

    log.taskStart('watch: pattern lab');
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
      if (config.verbosity > 1) {
        console.log(event, path);
      }
      debouncedCompile();
    });

  }

  watch.description = 'Watch and rebuild Pattern Lab';
  watch.displayName = 'pattern-lab:watch';

  return {
    compile,
    watch,
  };
};
