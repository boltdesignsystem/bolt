const sauce = require('./scripts/nightwatch-sauce');

module.exports = {
  testingUrl: 'https://boltdesignsystem.com',
  afterEach(browser, cb) {
    console.log('global afterEach called');
    sauce(browser, cb);
  },
  reporter(results, cb) {
    console.log('global reporter called');
    console.log(results);
    cb();
  },
};
