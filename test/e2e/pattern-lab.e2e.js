const sauce = require('../../scripts/nightwatch-sauce');
const { getLatestDeploy } = require('../../scripts/utils');
let testingUrl = 'https://boltdesignsystem.com';

module.exports = {
  beforeEach(client, done) {
    getLatestDeploy()
      .then(url => {
        testingUrl = url;
        done();
      })
      .catch(err => {
        console.log('error getLatestDeploy before a Nightwatch test', err);
        process.exit(1);
      });
  },

  'Pattern Lab: Confirm Successful Now.sh Deploy + Pattern Lab Compiled': function(
    browser,
  ) {
    console.log(`testingUrl: ${testingUrl}`);
    browser
      .url(`${testingUrl}/pattern-lab/index.html`)
      .waitForElementVisible('.pl-c-body', 1000)
      .verify.title('Pattern Lab - components-overview')
      .end();
  },

  afterEach: sauce,
};
