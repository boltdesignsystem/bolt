const globby = require('globby');
const path = require('path');
const seleniumServer = require('selenium-server');
const chromeDriver = require('chromedriver');
const geckoDriver = require('geckodriver');
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
  },
  src_folders: srcFolders,
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    port: 4444, // Standard selenium port
    cli_args: {
      'webdriver.chrome.driver': chromeDriver.path,
      'webdriver.gecko.driver': geckoDriver.path,
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
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        nativeEvents: true,
      },
    },
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
