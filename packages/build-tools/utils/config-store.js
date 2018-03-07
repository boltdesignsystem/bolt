const chalk = require('chalk');
const path = require('path');
const { readYamlFileSync } = require('./yaml');
const { validateSchema } = require('./schemas');
const configSchema = readYamlFileSync(path.join(__dirname, './config.schema.yml'));
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

const defaultConfig = {
  verbosity: configSchema.properties.verbosity.default,
  openServerAtStart: configSchema.properties.openServerAtStart.default,
  quick: configSchema.properties.quick.default,
  webpackDevServer: configSchema.properties.webpackDevServer.default,
  prod: process.env.NODE_ENV === 'production',
  startPath: configSchema.properties.startPath.default
};

function getEnvVarsConfig() {
  const envVars = {};
  Object.keys(process.env).forEach((envVar) => {
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
        if (!isNaN(numberAttempt)) {
          value = numberAttempt;
        }
      }

      const parts = envVar.split('bolt_');
      envVars[parts[1]] = value;
    }
  });
  return envVars;
}

function isReady() {
  if (!isInitialized) {
    console.log(chalk.red('Must initialize config before trying to get or update it.'));
    console.log('Check to make sure you are running `init()` from `config-store.js` before `getConfig()` or `updateConfig()` ');
    process.exit(1);
  }
}

function init(userConfig) {
  // Setting default config that requires userConfig
  defaultConfig.dataDir = path.join(userConfig.buildDir, 'data');
  // End setting programatic defaults

  config = Object.assign({}, defaultConfig, userConfig, getEnvVarsConfig());
  validateSchema(configSchema, config);
  isInitialized = true;
  return config;
}

/**
 * Get current config
 * @returns {object} config
 */
function getConfig() {
  isReady();
  return config;
}

/**
 * Update config
 * @param {function} updater - This function is passed in current config and it returns new config.
 */
function updateConfig(updater) {
  isReady();
  const newConfig = updater(config);
  validateSchema(configSchema, newConfig);
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
