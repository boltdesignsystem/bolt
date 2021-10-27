const { setup: setupDevServer } = require('jest-dev-server');
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

const { buildPrep } = require('@bolt/build-tools/tasks/task-collections.js');
const imageTasks = require('@bolt/build-tools/tasks/image-tasks');
const iconComponentTasks = require('@bolt/build-tools/tasks/icon-component-tasks');
const iconTasks = require('@bolt/build-tools/tasks/icon-tasks');
const { getConfig } = require('@bolt/build-tools/utils/config-store');

module.exports = async function globalSetup() {
  let config = await getConfig();
  const existingIconsDir =
    typeof config.iconDir !== 'undefined' ? config.iconDir : [];

  config.iconDir = [
    ...existingIconsDir,
    path.join(__dirname, '../../../__tests__/fixtures'),
  ];

  await buildPrep(true); // clear out all folders before running
  await imageTasks.processImages(true); // process image fixtures used by any tests, but don't optimize
  await iconComponentTasks.build(); // Deprecated: remove with Icon component
  await iconTasks.build(); // process icons used by any tests

  await setupDevServer({
    command: `node packages/servers/testing-server`,
    launchTimeout: 300000,
    port: 4444,
    usedPortAction: 'kill',
    debug: true,
  });

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
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
