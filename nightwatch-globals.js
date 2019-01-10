const { outputBanner } = require('ci-utils');
const sauce = require('./scripts/nightwatch-sauce');

module.exports = {
  testingUrl: 'https://boltdesignsystem.com',
  results: [],
  testCount: 0,

  afterEach(browser, cb) {
    browser.globals.testCount += 1;
    outputBanner(`global afterEach called, testCount at ${testCount}`);
    sauce(browser, cb);
  },

  reporter(results, cb) {
    // totalReports += 1;
    console.log(`global reporter called`);
    console.log(results);
    cb();
  },
};
