// const sauce = require('../../scripts/nightwatch-sauce');
// const { getLatestDeploy } = require('../../scripts/utils');
// let testingUrl = 'https://boltdesignsystem.com';

module.exports = {
  // before(client, done) {
  //   getLatestDeploy()
  //     .then(url => {
  //       testingUrl = url;
  //       done();
  //     })
  //     .catch(err => {
  //       console.log('error getLatestDeploy before a Nightwatch test', err);
  //       process.exit(1);
  //     });
  // },

  'Bolt Docs: Verify Docs Site Compiled + Deployed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}`)
      .waitForElementVisible('.c-bolt-site', 1000)
      .assert.containsText('.c-bolt-navbar__title-text', 'Bolt')
      .end();
  },

  // afterEach: sauce,
};
