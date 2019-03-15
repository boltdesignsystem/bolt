const os = require('os');
const rimraf = require('rimraf');
const path = require('path');

const { teardown: teardownDevServer } = require('jest-dev-server');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
module.exports = async function() {
  // close the browser instance
  await global.__BROWSER_GLOBAL__.close();

  await teardownDevServer();

  // clean-up the wsEndpoint file
  rimraf.sync(DIR);
};
