const os = require('os');
const rimraf = require('rimraf');
const path = require('path');

const { teardown: teardownDevServer } = require('jest-dev-server');
const { getConfig } = require('@bolt/build-tools/utils/config-store');
const iconTasks = require('@bolt/build-tools/tasks/icon-tasks');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  // close the browser instance if it exists. workaround to ensure any webpack-dev-servers running are closed first before starting to run any tests
  if (global.__BROWSER_GLOBAL__) {
    await global.__BROWSER_GLOBAL__.close();
  }

  const config = await getConfig();

  config.iconDir = config.iconDir.filter(
    item => !item.includes('test/jest-test-svgs'),
  );

  await iconTasks.build(); // cleaning icons after all tests
  await teardownDevServer();

  // clean-up the wsEndpoint file
  rimraf.sync(DIR);
};
