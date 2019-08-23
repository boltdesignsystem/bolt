#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig('bolt');
const configStore = require('@bolt/build-utils/config-store');
const log = require('@bolt/build-utils/log');
const { readYamlFileSync } = require('@bolt/build-utils/yaml');
const { getPort } = require('@bolt/build-utils/get-port');
const configSchema = readYamlFileSync(
  path.join(__dirname, './utils/config.schema.yml'),
);
const packageJson = require('./package.json');

let userConfig;

const parseIntWithRadix = string => parseInt(string, 10);

// global `bolt` cli options & meta
program
  .version(packageJson.version)
  .option(
    '-C, --config-file <path>',
    'Pass in a specific config file instead of default of ".boltrc.js/json".',
  )
  .option('--prod', configSchema.properties.prod.description)
  .option(
    '-v, --verbosity <amount>',
    configSchema.properties.verbosity.description,
    parseIntWithRadix,
  )
  .parse(process.argv);

if (program.configFile) {
  const configFilePath = path.join(process.cwd(), program.configFile);
  if (!fs.existsSync(configFilePath)) {
    console.error(`Error, config file does not exist: ${configFilePath}`);
    process.exit(1);
  }
  const configFile = require(configFilePath);
  userConfig = {
    ...configFile,
    configFileUsed: configFilePath,
  };
} else {
  try {
    const searchedFor = explorer.searchSync();
    userConfig = {
      ...searchedFor.config,
      configFileUsed: searchedFor.filepath,
    };
  } catch (error) {
    log.errorAndExit('Could not find config in a .boltrc file', error);
  }
}

(async () => {
  await configStore.init(userConfig).then(async () => {
    // Now that config is initilized, we can start requiring other things
    const { buildBoltManifest } = require('@bolt/build-utils/manifest');
    const log = require('@bolt/build-utils/log');

    // store a copy of the original config before modifying with defaults + auto values. This allows us to point out if a config option was manually vs automatically set.
    let originalConfig;
    /**
     * Update config with all options flags
     * @param {Object} options
     * @param programInstance - The commander `program`
     * @returns {Object} config - Final updated config
     */
    async function updateConfig(options, programInstance) {
      await configStore.updateConfig(async config => {
        originalConfig = config;

        config.verbosity =
          typeof program.verbosity === 'undefined'
            ? config.verbosity
            : parseInt(program.verbosity, 10);

        config.openServerAtStart =
          typeof options.open === 'undefined'
            ? config.openServerAtStart
            : options.open;

        config.renderingService =
          typeof options.renderingService === 'undefined'
            ? process.env.TRAVIS
              ? false
              : config.renderingService
            : options.renderingService;

        config.env = process.env.NODE_ENV
          ? process.env.NODE_ENV
          : typeof options.env === 'undefined'
          ? config.env
          : options.env;

        //check port not only when setting defaults but in boltrc.js too
        config.port = await getPort(config.port);

        config.webpackStats =
          typeof options.webpackStats === 'undefined'
            ? config.webpackStats
            : options.webpackStats;

        config.webpackDevServer =
          typeof options.webpackDevServer === 'undefined'
            ? config.webpackDevServer
            : options.webpackDevServer;

        config.mode =
          typeof options.mode === 'undefined' ? config.mode : options.mode;

        config.quick =
          typeof options.quick === 'undefined' ? config.quick : options.quick;

        config.watch =
          typeof options.watch === 'undefined' ? config.watch : options.watch;

        config.prod =
          typeof program.prod === 'undefined' ? config.prod : program.prod;

        // automatically set enableSSR to true in prod mode and false in dev mode, unless manually set.
        config.enableSSR = false;

        config.i18n =
          typeof options.i18n === 'undefined' ? !config.prod : options.i18n;

        // If i18n is disabled, ignore and remove lang config settings
        if (config.lang && config.i18n === false) {
          // Remove any lang-specific settings for local dev to speed things up.
          delete config['lang'];
        }

        return config;
      });

      const config = await configStore.getConfig();

      log.dim(`Verbosity: ${config.verbosity}`);
      log.dim(`Prod: ${config.prod}`);
      log.dim(`i18n: ${config.i18n}`);
      log.dim(
        `enableSSR: ${config.enableSSR} ${
          originalConfig.enableSSR ? '(manually set)' : '(auto set)'
        }`,
      );
      log.dim(`Rendering Mode: ${config.mode}`);
      if (config.verbosity > 2) {
        log.dim(`Opening browser: ${config.openServerAtStart}`);
        log.dim(`Quick mode: ${config.quick}`);
        log.dim(`buildDir: ${config.buildDir}`);
        log.dim(`dataDir: ${config.dataDir}`);
        log.dim(`wwwDir: ${config.wwwDir}`);
      }

      // Basically at this point, the cli is bootstrapped and ready to go.
      // Let's build the core bolt manifest
      await buildBoltManifest();
      return config;
    }

    await log.intro();

    program
      .option(
        '--no-ssr',
        'Manually disables server side rendering (vs auto enable in prod mode)',
      )
      .option(
        '--ssr',
        'Manually enabless server side rendering in all enviornments (vs by default only enabling automatically in prod mode)',
      );

    // `bolt build`
    program
      .command('build')
      .description('Build it')
      .option(
        '--webpack-stats',
        configSchema.properties.webpackStats.description,
      )
      .option('-I, --i18n', configSchema.properties.i18n.description)
      .option('-Q, --quick', configSchema.properties.quick.description)
      .action(async options => {
        log.info(
          `Starting build (${options.parallel ? 'parallel' : 'serial'})`,
        );
        await updateConfig(options, program);
        require('./tasks/task-collections').build();
      });

    // `bolt prep`
    program
      .command('prep')
      .description('Prepwork before building')
      .action(async options => {
        log.info('Starting prep work.');
        await updateConfig(options, program);
        require('./tasks/task-collections').buildPrep();
      });

    // `bolt prep`
    program
      .command('criticalcss')
      .description('Generate Critical CSS')
      .action(async options => {
        log.info('Starting critical CSS');
        await updateConfig(options, program);
        require('./tasks/task-collections').criticalcss();
      });

    program
      .command('serve')
      .description('Spin up local server')
      .option(
        '-O, --open',
        configSchema.properties.openServerAtStart.description,
      )
      .option(
        '--webpack-dev-server',
        configSchema.properties.webpackDevServer.description,
      )
      .option('--watch', configSchema.properties.watch.description)
      .action(async options => {
        if (options.watch === undefined) {
          options.watch = true;
        }
        await updateConfig(options, program);
        require('./tasks/task-collections').serve();
      });

    program.command('watch').action(async options => {
      options.watch = true;
      await updateConfig(options, program);
      require('./tasks/task-collections').watch();
    });

    program.command('clean').action(async options => {
      await updateConfig(options, program);
      require('./tasks/task-collections').clean();
    });

    program
      .command('start')
      .option(
        '-O, --open',
        configSchema.properties.openServerAtStart.description,
      )
      .option('-I, --i18n', configSchema.properties.i18n.description)
      .option('-Q, --quick', configSchema.properties.quick.description)
      .option(
        '--webpack-dev-server',
        configSchema.properties.webpackDevServer.description,
      )
      .option('--watch', configSchema.properties.watch.description)
      .action(async options => {
        if (options.watch === undefined) {
          options.watch = true;
        }
        await updateConfig(options, program);
        require('./tasks/task-collections').start();
      });

    // `bolt lint`
    program
      .command('lint')
      .description("A linter... that doesn't work!")
      .action(async options => {
        await updateConfig(options, program);
      });

    program
      .command('img')
      .alias('images')
      .description('Image process')
      .action(async options => {
        await updateConfig(options, program);
        require('./tasks/task-collections').images();
      });

    program
      .command('webpack')
      .alias('wp')
      .description('WebPack Compile')
      .option(
        '--webpack-stats',
        configSchema.properties.webpackStats.description,
      )
      .action(async options => {
        await updateConfig(options, program);
        try {
          await require('./tasks/webpack-tasks').compile();
        } catch (error) {
          log.errorAndExit('WebPack failed', error);
        }
      });

    program
      .command('pattern-lab')
      .alias('pl')
      .description('Pattern Lab Compile')
      .action(async options => {
        await updateConfig(options, program);
        try {
          await require('./tasks/pattern-lab-tasks').compile();
        } catch (error) {
          log.errorAndExit('Pattern Lab failed', error);
        }
      });

    program
      .command('static')
      .description('Static Site Compile')
      .action(async options => {
        await updateConfig(options, program);
        try {
          await require('./tasks/task-collections').buildPrep();
          await require('./tasks/static-tasks').compile();
        } catch (error) {
          log.errorAndExit('Static Site Generation failed', error);
        }
      });

    // This will tell you all that got `require()`-ed
    // We want to only load what we need - that's why not all `require` statements are at top
    // log.info('All that got `require()`-ed');
    // console.log(Object.keys(require.cache).filter(x => !x.includes('node_modules')));
    // log.info('END: All that got `require()`-ed');

    // cli init ~ must go at bottom
    program.parse(process.argv);
  });
})().catch(err => {
  console.error(err);
});
