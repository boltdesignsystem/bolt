const globby = require('globby');
const SauceLabs = require('saucelabs');
const { getGitSha } = require('ci-utils');
const fetch = require('node-fetch');
const path = require('path');

const {
  NOW_URL,
  SAUCE_USERNAME,
  SAUCE_ACCESS_KEY,
  // for push builds, or builds not triggered by a pull request, this is the name of the branch.
  // for builds triggered by a pull request this is the name of the branch targeted by the pull request.
  // for builds triggered by a tag, this is the same as the name of the tag(TRAVIS_TAG).
  TRAVIS_BRANCH,
  // if the current job is a pull request, the name of the branch from which the PR originated
  // if the current job is a push build, this variable is empty("").
  TRAVIS_PULL_REQUEST_BRANCH,
  // The pull request number if the current job is a pull request, "false" if it’s not a pull request.
  TRAVIS_PULL_REQUEST,
  // The slug (in form: owner_name/repo_name) of the repository currently being built.
  TRAVIS_REPO_SLUG,
  // If the current build is for a git tag, this variable is set to the tag’s name
  TRAVIS_TAG,
  TRAVIS_BUILD_WEB_URL,
  TRAVIS_JOB_NUMBER,
} = process.env;

const saucelabs = new SauceLabs({
  username: SAUCE_USERNAME,
  password: SAUCE_ACCESS_KEY,
});

const gitSha = getGitSha(true);
const gitShaLong = getGitSha();

const testingUrl = NOW_URL ? NOW_URL : 'https://boltdesignsystem.com';
// const testingUrl = 'https://boltdesignsystem.com';
console.log(`Nightwatch testingUrl is ${testingUrl}`);

const auth = Buffer.from(`${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}`).toString(
  'base64',
);

let srcFolders = globby.sync([
  'docs-site/**/*.e2e.js',
  'packages/**/*.e2e.js',
  'apps/**/*.e2e.js',
  'test/*/*.e2e.js',
]);

srcFolders = srcFolders.map(function(folder) {
  return path.dirname(folder);
});

/**
 * @param {Object} client - Nightwatch instance @todo add link to API docs
 * @param {function} callback
 * @returns {void}
 */
async function handleNightwatchResults(client, callback) {
  const currentTest = client.currentTest;
  const sessionId = client.capabilities['webdriver.remote.sessionid'];
  const { username, accessKey } = client.options;
  const {
    /** @type {string} - Name of test */
    name,
    /** @type {string} - Name of test file, ie `__tests__/bolt-video.e2e` */
    module: testFileName,
    /** @type {string} */
    group,
    /** @type {{ time: string, assertions: array, passed: number, errors: number, failed: number, skipped: number, tests: number, steps: array, timeMs: number}} */
    results,
  } = currentTest;

  if (!client.launch_url.match(/saucelabs/)) {
    console.log('Not saucelabs ...');
    callback();
    return;
  }

  if (!username || !accessKey || !sessionId) {
    console.log('No username, accessKey or sessionId');
    callback();
    return;
  }

  const passed = results.passed === results.tests - results.skipped;
  console.log(`Passed: ${passed ? 'Yes' : 'No'} - ${name}`);

  try {
    const res = await fetch(
      // https://wiki.saucelabs.com/display/DOCS/Job+Methods
      `https://saucelabs.com/rest/v1/${SAUCE_USERNAME}/jobs/${sessionId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passed,
          build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
          tags: ['CI'],
          'custom-data': {
            TRAVIS_JOB_NUMBER,
            TRAVIS_BRANCH,
            TRAVIS_PULL_REQUEST_BRANCH,
            TRAVIS_PULL_REQUEST,
            TRAVIS_REPO_SLUG,
            TRAVIS_TAG,
            TRAVIS_BUILD_WEB_URL,
            gitSha,
            gitShaLong,
          },
        }),
      },
    );

    if (res.ok) {
      console.log(`Set SauceLabs details ok`);
    } else {
      console.log(`Set SauceLabs details not ok`);
      throw new Error(`Set SauceLabs details not ok ${res.statusText}`);
    }

    saucelabs.updateJob(
      sessionId,
      {
        name,
        passed,
      },
      callback,
    );

    const results = await res.json();
    return results;
  } catch (err) {
    console.log(`Error setting SauceLabs details`, err);
    process.exit(1);
  }
}

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
      console.log('global reporter called');
      console.log(results);
      console.log(results.modules);
      cb();
    },
  },
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
        //         chromeOptions: {
        //           args: ['headless'],
        //         },
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
