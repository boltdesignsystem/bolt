const { handleNightwatchResults } = require('./scripts/nightwatch-sauce');

const testingUrl = process.env.NOW_URL || 'https://boltdesignsystem.com';
console.log(`Nightwatch testingUrl is ${testingUrl}`);

// Global afterEach and reporter for all nightwatch tests
const theGlobals = {
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
};

module.exports = theGlobals;
