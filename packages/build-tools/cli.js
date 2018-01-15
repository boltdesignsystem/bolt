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

// `bolt build`
program
  .command('build')
  .description('Build it')
  .option('-W, --watch', 'Watch and rebuild')
  .option('-P, --parallel', 'Run build in parallel instead of a series. Faster, but some assets might not be ready in time.')
  .action((options) => {
    log.info(`Starting build (${options.parallel ? 'parallel' : 'serial'})`);

    configStore.updateConfig((config) => {
      config.verbosity = typeof program.verbosity === 'undefined'
        ? config.verbosity
        : program.verbosity;
      return config;
    });

    const build = require('./commands/build');
    build({
      watch: options.watch,
      parallel: options.parallel,
    });
  });

program
  .command('serve')
  .description('Spin up local server')
  .option('-O, --open', 'Open browser at start.')
  .action((options) => {
    log.info('Starting server...');

    configStore.updateConfig((config) => {
      config.openServerAtStart = typeof options.open === 'undefined'
        ? config.openServerAtStart
        : options.open;
      return config;
    });

    const serverTasks = require('./tasks/server-tasks');
    serverTasks.serve();
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
