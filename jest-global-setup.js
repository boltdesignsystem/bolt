const { setup: setupDevServer } = require('jest-dev-server');
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

const { buildPrep } = require('./packages/build-tools/tasks/task-collections');
const imageTasks = require('./packages/build-tools/tasks/image-tasks');
const iconTasks = require('./packages/build-tools/tasks/icon-tasks');
const { getConfig } = require('./packages/build-tools/utils/config-store');

module.exports = async function globalSetup() {
  let config = await getConfig();

  const existingIconsDir =
    typeof config.iconDir !== 'undefined' ? config.iconDir : [];

  config.iconDir = [...existingIconsDir, path.join(__dirname, './test/svg')];

  await buildPrep(); // Generate folders, manifest data, etc needed for Twig renderer
  await imageTasks.processImages(); // process image fixtures used by any tests
  await iconTasks.build(); // process icons used by any task

  await setupDevServer({
    command: `node server/testing-server`,
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
