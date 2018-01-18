const path = require('path');
const program = require('commander');
const packageJson = require('./package.json');
const configStore = require('./utils/config-store');
const log = require('./utils/log');

log.intro();

// global `bolt` cli options & meta
program
  .version(packageJson.version)
  .option('-C, --config-file <path>', 'Pass in a specific config file instead of default of ".boltrc.js/json".')
  .option('-v, --verbosity <amount>', 'How much output do you want? 0-5', parseInt);


// defaults to `.boltrc` so either `.boltrc.js` or `.boltrc.json` works
const configFilePath = path.resolve(process.cwd(), program.configFile || '.boltrc');
configStore.init(require(configFilePath));

/**
 * Update config with all options flags
 * @param {Object} options
 * @param programInstance - The commander `program`
 * @returns {Object} config - Final updated config
 */
function updateConfig(options, programInstance) {
  configStore.updateConfig((config) => {
    config.verbosity = typeof program.verbosity === 'undefined'
      ? config.verbosity
      : program.verbosity;

    config.openServerAtStart = typeof options.open === 'undefined'
      ? config.openServerAtStart
      : options.open;


    config.quick = typeof options.quick === 'undefined'
      ? config.quick
      : options.quick;

    return config;
  });

  const config = configStore.getConfig();
  log.dim(`Verbosity: ${config.verbosity}`);
  log.dim(`Opening browser: ${config.openServerAtStart}`);
  log.dim(`Quick mode: ${config.quick}`);
  return config;
}

// `bolt build`
program
  .command('build')
  .description('Build it')
  .option('-W, --watch', 'Watch and rebuild')
  .option('-P, --parallel', 'Run build in parallel instead of a series. Faster, but some assets might not be ready in time.')
  .option('-Q, --quick', 'Try to be quicker by skipping some steps that might not be needed if everything is recently built and in good working order.')
  .action((options) => {
    log.info(`Starting build (${options.parallel ? 'parallel' : 'serial'})`);
    updateConfig(options, program);
    require('./tasks/task-collections').build();
  });

program
  .command('serve')
  .description('Spin up local server')
  .option('-O, --open', 'Open browser at start.')
  .action((options) => {
    updateConfig(options, program);
    require('./tasks/task-collections').serve();
  });

program
  .command('watch')
  .action((options) => {
    updateConfig(options, program);
    require('./tasks/task-collections').watch();
  });

program
  .command('start')
  .option('-O, --open', 'Open browser at start.')
  .option('-Q, --quick', 'Try to be quicker by skipping some steps that might not be needed if everything is recently built and in good working order.')
  .action((options) => {
    updateConfig(options, program);
    require('./tasks/task-collections').start();
  });

// `bolt lint`
program
  .command('lint')
  .description('A linter... that doesn\'t work!')
  .action(() => {
    log.taskStart('lint');
    console.log('Im linting... ');
    console.log('Looks good to me 👍');
    log.taskDone('lint');
  });

// This will tell you all that got `require()`-ed
// We want to only load what we need - that's why not all `require` statements are at top
// log.info('All that got `require()`-ed');
// console.log(Object.keys(require.cache).filter(x => !x.includes('node_modules')));
// log.info('END: All that got `require()`-ed');

// cli init ~ must go at bottom
program.parse(process.argv);
