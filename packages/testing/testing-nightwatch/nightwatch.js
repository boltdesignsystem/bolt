const globby = require('globby');
const path = require('path');
const { handleNightwatchResults } = require('./nightwatch.handle-results');
const { NOW_URL } = process.env;

const testingUrl = NOW_URL ? NOW_URL : 'https://boltdesignsystem.com';

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
    asyncHookTimeout: 30000, // increasing timeout to prevent errors in Sauce Labs
    testingUrl,
    results: [],
    testCount: 0,

    afterEach(browser, cb) {
      handleNightwatchResults(browser, cb);
    },

    reporter(results, cb) {
      // Might be used if nightwatch results reporting needs to be consolidated in Github Checks
      // console.log('global reporter called');
      if (results.failed > 0) {
        console.log(results);
      }
      // console.log(results.modules);
      cb();
    },
  },
  persist_globals: true,
  live_output: false, // set to `true` to see output as it happens; make appear interlaced if ran in parallel
  test_workers: {
    enabled: true,
    workers: 'auto',
  },
  test_settings: {
    compatible_testcase_support: true,
    default: {
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'reports/screenshots/',
      },
      filter: '**/*.e2e.js',
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
    },
    local: {
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'reports/screenshots/',
      },
      filter: '**/*.e2e.js',
      selenium_port: 9515,
      selenium_host: 'localhost',
      default_path_prefix: '',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['headless'],
          w3c: false,
        },
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'macOS 10.14',
        version: '80',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          // args: ['headless'],
          w3c: false,
        },
      },
      build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
      'tunnel-identifier': `${process.env.TRAVIS_JOB_NUMBER || ''}`,
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        platform: 'macOS 10.14',
        version: '68',
      },
      build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
      'tunnel-identifier': `${process.env.TRAVIS_JOB_NUMBER || ''}`,
    },
  },
  src_folders: srcFolders,
};
