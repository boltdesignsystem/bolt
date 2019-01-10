const { outputBanner } = require('ci-utils');
const sauce = require('./scripts/nightwatch-sauce');

const theGlobals = {
  testingUrl: 'https://boltdesignsystem.com',
  results: [],
  testCount: 0,

  afterEach(browser, cb) {
    theGlobals.testCount += 1;
    outputBanner(`global afterEach called, testCount at ${theGlobals.testCount}`);
    sauce(browser, cb);
  },

  reporter(results, cb) {
    // totalReports += 1;
    console.log(`global reporter called`);
    console.log(results);
    cb();
  },
};

module.exports = theGlobals;
