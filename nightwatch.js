// nightwatch.js
const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;

const { SAUCE_ACCESS_KEY, SAUCE_USERNAME } = process.env;

module.exports = {
  "test_settings" : {
    default : {
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: SAUCE_USERNAME,
      access_key: SAUCE_ACCESS_KEY,
      screenshots: {
        enabled: true,
        path: '',
      },
      globals: {
      },
      desiredCapabilities: {
        build: `build-${TRAVIS_JOB_NUMBER}`,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        // extendedDebugging: true
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'OS X 10.11',
        version: '47',
      },
    },
    ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11.0',
      },
    },
  },
  src_folders: ['tests/e2e'],
}
