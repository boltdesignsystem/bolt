const path = require('path');
const program = require('commander');
const packageJson = require('./package.json');
const configStore = require('./utils/config-store');
const { readYamlFileSync } = require('./utils/yaml');
const configSchema = readYamlFileSync(path.join(__dirname, './utils/config.schema.yml'));

// global `bolt` cli options & meta
program
  .version(packageJson.version)
  .option('-C, --config-file <path>', 'Pass in a specific config file instead of default of ".boltrc.js/json".')
  .option('-v, --verbosity <amount>', configSchema.properties.verbosity.description, parseInt);

// We need to initialize config as early as possible
const configFilePath = path.resolve(process.cwd(), program.configFile || '.boltrc');
const config = configStore.init(require(configFilePath));
// Now that config is initilized, we can start requiring other things

const { buildBoltManifest } = require('./utils/manifest');
const log = require('./utils/log');

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
  if (config.verbosity > 2){
    log.dim(`Opening browser: ${config.openServerAtStart}`);
    log.dim(`Quick mode: ${config.quick}`);
    log.dim(`buildDir: ${config.buildDir}`);
    log.dim(`dataDir: ${config.dataDir}`);
    log.dim(`wwwDir: ${config.wwwDir}`);
  }

  // Basically at this point, the cli is bootstrapped and ready to go.
  // Let's build the core bolt manifest
  buildBoltManifest();
  return config;
}

log.intro();

// `bolt build`
program
  .command('build')
  .description('Build it')
  .option('-W, --watch', 'Watch and rebuild')
  .option('-P, --parallel', 'Run build in parallel instead of a series. Faster, but some assets might not be ready in time.')
  .option('-Q, --quick', configSchema.properties.quick.description)
  .action((options) => {
    log.info(`Starting build (${options.parallel ? 'parallel' : 'serial'})`);
    updateConfig(options, program);
    require('./tasks/task-collections').build();
  });

program
  .command('serve')
  .description('Spin up local server')
  .option('-O, --open', configSchema.properties.openServerAtStart.description)
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
  .command('clean')
  .action((options) => {
    updateConfig(options, program);
    require('./tasks/task-collections').clean();
  });

program
  .command('start')
  .option('-O, --open', configSchema.properties.openServerAtStart.description)
  .option('-Q, --quick', configSchema.properties.quick.description)
  .action((options) => {
    updateConfig(options, program);
    require('./tasks/task-collections').start();
  });

// `bolt lint`
program
  .command('lint')
  .description('A linter... that doesn\'t work!')
  .action((options) => {
    updateConfig(options, program);
  });

program
  .command('img')
  .description('Image process')
  .action((options) => {
    updateConfig(options, program);
    require('./tasks/task-collections').images();
  });


program
  .command('webpack')
  .alias('wp')
  .description('WebPack Compile')
  .action(async (options) => {
    updateConfig(options, program);
    try {
      await require('./tasks/webpack-tasks').compile();
    } catch (error) {
      log.errorAndExit('WebPack failed', error);
    }
  });

if (config.env === 'pl'){
  program
    .command('pattern-lab')
    .alias('pl')
    .description('Pattern Lab Compile')
    .action(async (options) => {
      updateConfig(options, program);
      try {
        await require('./tasks/pattern-lab-tasks').compile();
      } catch (error) {
        log.errorAndExit('Pattern Lab failed', error);
      }
    });
}

// This will tell you all that got `require()`-ed
// We want to only load what we need - that's why not all `require` statements are at top
// log.info('All that got `require()`-ed');
// console.log(Object.keys(require.cache).filter(x => !x.includes('node_modules')));
// log.info('END: All that got `require()`-ed');

// cli init ~ must go at bottom
program.parse(process.argv);
