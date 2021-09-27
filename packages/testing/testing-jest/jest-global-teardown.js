const os = require('os');
const rimraf = require('rimraf');
const path = require('path');
const internalTasks = require('@bolt/build-tools/tasks/internal-tasks');

const { teardown: teardownDevServer } = require('jest-dev-server');
const { getConfig } = require('@bolt/build-tools/utils/config-store');
const iconTasks = require('@bolt/build-tools/tasks/icon-tasks');
const { buildPrep } = require('@bolt/build-tools/tasks/task-collections.js');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  // close the browser instance if it exists. workaround to ensure any webpack-dev-servers running are closed first before starting to run any tests
  if (global.__BROWSER_GLOBAL__) {
    await global.__BROWSER_GLOBAL__.close();
  }

  const config = await getConfig();

  config.iconDir = config.iconDir.filter(
    item => !item.includes('__tests__/fixtures'),
  );

  await internalTasks.clean([
    'packages/generators/bolt-generator/__tests__/component/_tmp',
    'packages/generators/bolt-generator/__tests__/element/_tmp',
  ]); // cleaning bolt-generator temp files after error
  await iconTasks.build(); // cleaning icons after all tests
  await teardownDevServer();
  await buildPrep(true); // clear out all built www folders when complete

  // clean-up the wsEndpoint file
  rimraf.sync(DIR);
};
