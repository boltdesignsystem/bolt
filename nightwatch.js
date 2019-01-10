const globby = require('globby');
const path = require('path');
const { setCheckRun } = require('./scripts/check-run');
const { getLatestDeploy } = require('./scripts/utils');

/* eslint-disable camelcase */

let srcFolders = globby.sync([
  'packages/**/*.e2e.js',
  'apps/**/*.e2e.js',
  'test/*/*.e2e.js',
]);

srcFolders = srcFolders.map(function(folder) {
  return path.dirname(folder);
});

process.env.NOW_URL = process.env.NOW_URL || 'https://boltdesignsystem.com';
const launch_url = process.env.NOW_URL || 'https://boltdesignsystem.com';

console.log({ launch_url });

if (process.env.TRAVIS) {
  setCheckRun({
    name: 'Nightwatch',
    status: 'in_progress',
    output: {
      title: 'Nightwatch running...',
      summary: `
      - Url used: ${process.env.NOW_URL}
      `.trim(),
      // details: '',
    },
  })
    .then(results => {
      console.log(`Check run started for Nightwatch: ${results.html_url}`);
    })
    .catch(console.log.bind(console));
}

module.exports = {
  launch_url,
  globals_path: './nightwatch-globals.js',
  persist_globals: true,
  // selenium: {
  //   start_process: true,
  //   server_path: require('selenium-server').path,
  //   log_path: './reports',
  //   host: '127.0.0.1',
  //   port: 4444,
  //   cli_args: {
  //     'webdriver.chrome.driver': './node_modules/chromedriver/bin/chromedriver',
  //   },
  // },
  live_output: false, // set to `true` to see output as it happens; make appear interlaced if ran in parallel
  test_workers: { enabled: true, workers: 'auto' },
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
        },
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'OS X 10.11',
        version: '70',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['headless'],
        },
      },
      build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
      'tunnel-identifier': `${process.env.TRAVIS_JOB_NUMBER || ''}`,
    },
    ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11.0',
      },
      build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
      'tunnel-identifier': `${process.env.TRAVIS_JOB_NUMBER || ''}`,
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        platform: 'OS X 10.11',
        version: '62',
      },
      build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
      'tunnel-identifier': `${process.env.TRAVIS_JOB_NUMBER || ''}`,
    },
  },
  src_folders: srcFolders,
};
