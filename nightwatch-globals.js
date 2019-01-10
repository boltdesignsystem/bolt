const sauce = require('./scripts/nightwatch-sauce');

let totalReports = 0;
module.exports = {
  testingUrl: 'https://boltdesignsystem.com',
  afterEach(browser, cb) {
    console.log('global afterEach called');
    sauce(browser, cb);
  },
  reporter(results, cb) {
    totalReports += 1;
    console.log(`global reporter called ${totalReports}`);
    console.log(results);
    cb();
  },
};
