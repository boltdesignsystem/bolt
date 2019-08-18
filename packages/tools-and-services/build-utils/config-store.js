const chalk = require('chalk');
const path = require('path');
const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig('bolt');
const address = require('address');

const { readYamlFileSync } = require('./yaml');
const { validateSchema } = require('./schemas');
const configSchema = readYamlFileSync(
  path.join(__dirname, './config.schema.yml'),
);

let isInitialized = false;
let config = {};
// Welcome to the home of the config!
// Where does config come from?
// The order goes like this, as this list increases, the later override the earlier
// Order inspired by https://www.npmjs.com/package/rc#standards
// 1. `defaultConfig` just below
// 2. `userConfig` from `.boltrc.js` that's in same cwd as where `bolt` was ran, unless they use `--config-file path/to/.boltrc.js`
// 3. Env Vars with `bolt_` prefix; `bolt_verbosity=1` will override `config.verbosity` - case matters!
// 4. Certain command line options like `bolt build --verbosity 5` - not every config option is overridable this way.
// For both 3 & 4, it doesn't support deep merges, so only top level properties.
const ip = address.ip();

async function getDefaultConfig() {
  return {
    port: configSchema.properties.port.default,
    hostname: configSchema.properties.hostname.default,
    proxyHostname: configSchema.properties.proxyHostname.default,
    proxyHeader: configSchema.properties.proxyHeader.default,
    ip,
    enableSSR: configSchema.properties.enableSSR.default,
    mode: configSchema.properties.mode.default,
    env: process.env.NODE_ENV,
    enableCache: configSchema.properties.enableCache.default,
    watch: configSchema.properties.watch.default,
    sourceMaps: configSchema.properties.sourceMaps.default,
    i18n: configSchema.properties.i18n.default,
    renderingService: configSchema.properties.renderingService.default,
    namespace: configSchema.properties.namespace.default,
    templatesDir: configSchema.properties.templatesDir.default,
    verbosity: configSchema.properties.verbosity.default,
    openServerAtStart: configSchema.properties.openServerAtStart.default,
    quick: configSchema.properties.quick.default,
    webpackDevServer: configSchema.properties.webpackDevServer.default,
    prod: process.env.NODE_ENV === 'production',
    startPath: configSchema.properties.startPath.default,
    webpackStats: configSchema.properties.webpackStats.default,
    globalData: {},
    schemaErrorReporting: configSchema.properties.schemaErrorReporting.default,
  };
}

async function getEnvVarsConfig() {
  const envVars = {};
  Object.keys(process.env).forEach(envVar => {
    if (envVar.startsWith('bolt_')) {
      /** @type {string} - All env vars are strings */
      let value = process.env[envVar];

      // begin coersion, let's get that string into a proper format
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      } else {
        const numberAttempt = parseInt(value);
        if (!Number.isNaN(numberAttempt)) {
          value = numberAttempt;
        }
      }

      const parts = envVar.split('bolt_');
      envVars[parts[1]] = value;
    }
  });
  return envVars;
}

async function isReady() {
  if (!isInitialized) {
    // console.log(
    //   chalk.yellow(
    //     'Bolt config not yet setup -- trying to find a .boltconfig.rc file...',
    //   ),
    // );
    const searchedFor = explorer.searchSync();
    if (searchedFor) {
      if (searchedFor.config) {
        await init({
          ...searchedFor.config,
          configFileUsed: searchedFor.filepath,
        });
        return true;
      } else {
        console.log(
          chalk.red(
            '.boltrc config not found -- you must initialize config before trying to get or update it.',
          ),
        );
      }
    } else {
      console.log(
        chalk.red(
          '.boltrc config not found -- you must initialize config before trying to get or update it.',
        ),
      );
      console.log(
        'Check to make sure you are running `init()` from `config-store.js` before `getConfig()` or `updateConfig()` ',
      );
      process.exit(1);
    }
  } else {
    return true;
  }
}

async function init(userConfig) {
  const defaultConfig = await getDefaultConfig();

  // Setting default config that requires userConfig
  defaultConfig.dataDir = path.join(userConfig.buildDir, 'data');
  // End setting programatic defaults

  config = Object.assign({}, defaultConfig, userConfig, getEnvVarsConfig());
  validateSchema(
    configSchema,
    config,
    'Please fix the config being used in Bolt CLI.',
  );
  isInitialized = true;
  return config;
}

/**
 * Get current config
 * @returns {object} config
 */

async function getConfig() {
  await isReady();
  return config;
}

/**
 * Update config
 * @param {function} updater - This function is passed in current config and it returns new config.
 */
async function updateConfig(updater) {
  await isReady();
  const newConfig = await updater(config);
  validateSchema(
    configSchema,
    newConfig,
    'Please fix the config being used in Bolt CLI.',
  );
  // console.log('new config:');
  // console.log(newConfig);
  config = newConfig;
  if (config.prod) {
    process.env.NODE_ENV = 'production';
  }
  return config;
}

module.exports = {
  getConfig,
  updateConfig,
  init,
};
