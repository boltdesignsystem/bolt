const { setup: setupDevServer } = require('jest-dev-server');
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

const { buildPrep } = require('./packages/build-tools/tasks/task-collections');
const imageTasks = require('./packages/build-tools/tasks/image-tasks');
const { getConfig } = require('./packages/build-tools/utils/config-store');
const teardown = require('./jest-global-teardown.js');

module.exports = async function globalSetup() {
  const config = await getConfig();
  await buildPrep({ cleanAll: true }); // clear out all folders before running
  await imageTasks.processImages(); // process image fixtures used by any tests

  await setupDevServer({
    command: `node packages/servers/testing-server`,
    launchTimeout: 50000,
    port: 4444,
  });

  const browser = await puppeteer.launch();
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;

  global.navigator = {
    userAgent: 'node.js',
  };

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
