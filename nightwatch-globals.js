const { outputBanner } = require('ci-utils');
const { tmpdir } = require('os');
const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const sauce = require('./scripts/nightwatch-sauce');

const dataFilePath = join(tmpdir, 'nightwatch-results.json');
const read = () => JSON.parse(readFileSync(dataFilePath, 'utf8'));
const write = data => writeFileSync(dataFilePath, JSON.stringify(data), 'utf8');

console.log({ dataFilePath });

write({
  testCount: 0,
  results: [],
});

const theGlobals = {
  testingUrl: 'https://boltdesignsystem.com',
  results: [],
  testCount: 0,

  afterEach(browser, cb) {
    const data = read();
    data.testCount += 1;
    write(data);
    // theGlobals.testCount += 1;
    outputBanner(`global afterEach called, testCount at ${data.testCount}`);
    sauce(browser, cb);
  },

  reporter(results, cb) {
    // totalReports += 1;
    const data = read();
    data.results.push(results);
    write(data);
    console.log(`global reporter called; have total of ${data.results.length}`);
    console.log(results);
    cb();
  },
};

module.exports = theGlobals;
