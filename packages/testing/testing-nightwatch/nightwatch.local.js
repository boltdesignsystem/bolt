const globby = require('globby');
const path = require('path');
const seleniumServer = require('selenium-server');
const chromeDriver = require('chromedriver');
// const geckoDriver = require('geckodriver'); // temporarily disabling FF testing till self-signed cert issue (when installing geckodriver) is debugged
const uuidv1 = require('uuid/v1');
const { NOW_URL } = process.env;

const testingUrl = NOW_URL ? NOW_URL : 'http://localhost:3000';

console.log(`Nightwatch testingUrl is ${testingUrl}`);

let srcFolders = globby.sync([
  'docs-site/**/*.e2e.js',
  'packages/**/*.e2e.js',
  'apps/**/*.e2e.js',
  'test/*/*.e2e.js',
]);

srcFolders = srcFolders.map(function(folder) {
  return path.dirname(folder);
});

module.exports = {
  globals: {
    waitForConditionTimeout: 5000,
    testingUrl,
    applitoolsBatchId: process.env.TRAVIS_JOB_ID || "1-2-3-4-local-id", // @todo figure out how to set a uuid that persists across multiple tests. Nightwatch reboots per .e2e.js file
  },
  src_folders: srcFolders,
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    port: 4444, // Standard selenium port
    cli_args: {
      'webdriver.chrome.driver': chromeDriver.path,
      // 'webdriver.gecko.driver': geckoDriver.path, // temporarily disabling FF testing till self-signed cert issue (when installing geckodriver) is debugged
    },
  },
  test_workers: {
    enabled: true,
    workers: 'auto',
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'reports/screenshots/',
      },
      filter: '**/*.e2e.js',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless'],
        },
        javascriptEnabled: true,
        acceptSslCerts: true,
        nativeEvents: true,
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless'],
        },
        javascriptEnabled: true,
        acceptSslCerts: true,
        nativeEvents: true,
      },
    },
    // temporarily disabling FF testing till self-signed cert issue (when installing geckodriver) is debugged
    // firefox: {
    //   desiredCapabilities: {
    //     browserName: 'firefox',
    //     javascriptEnabled: true,
    //     acceptSslCerts: true,
    //     nativeEvents: true,
    //   },
    // },
    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        javascriptEnabled: true,
        acceptSslCerts: true,
        nativeEvents: true,
      },
    },
  },
};
