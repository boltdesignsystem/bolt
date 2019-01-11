// Global afterEach and reporter for all nightwatch tests
// Commented out code provides the ability to collect all nightwatch results to one json file
// Commented out code to be used if nightwatch results reporting needs to be consolidated in Github Checks

// const { outputBanner } = require('ci-utils');
// const { tmpdir } = require('os');
// const { join } = require('path');
// const { readFileSync, writeFileSync } = require('fs');
const { handleNightwatchResults } = require('./scripts/nightwatch-sauce');

// const dataFilePath = join(tmpdir(), 'nightwatch-results.json');

// const read = () => JSON.parse(readFileSync(dataFilePath, 'utf8'));
// const write = data => writeFileSync(dataFilePath, JSON.stringify(data), 'utf8');

// console.log({ dataFilePath });

// write({
//   testCount: 0,
//   results: [],
// });

const theGlobals = {
  testingUrl: 'https://boltdesignsystem.com',
  results: [],
  testCount: 0,

  afterEach(browser, cb) {
    // const data = read();
    // data.testCount += 1;
    // write(data);
    // // theGlobals.testCount += 1;
    // outputBanner(`global afterEach called, testCount at ${data.testCount}`);
    handleNightwatchResults(browser, cb);
  },

  reporter(results, cb) {
    // totalReports += 1;
    // const data = read();
    // data.results.push(results);
    // write(data);
    console.log('global reporter called');
    console.log(results);
    cb();
  },
};

module.exports = theGlobals;
