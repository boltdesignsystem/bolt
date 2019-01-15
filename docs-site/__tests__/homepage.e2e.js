module.exports = {
  'Bolt Docs: Verify Docs Site Compiled + Deployed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}`)
      .waitForElementVisible('.c-bolt-site', 1000)
      .assert.containsText('.c-bolt-navbar__title-text', 'Bolt')
      .end();
  },
};
