module.exports = {
  "Bolt Site: verify boltdesignsystem.com's homepage compiled + deployed": function (
    browser,
  ) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}`)
      .waitForElementVisible('.c-bds-layout', 3000)
      .assert.containsText('.c-bolt-navbar__title-text', 'Bolt')
      .end();
  },

  "Bolt Site: verify boltdesignsystem.com's getting started page compiled + deployed": function (
    browser,
  ) {
    const { testingUrl } = browser.globals;
    browser
      .url(`${testingUrl}/docs/getting-started/index.html`)
      .waitForElementVisible('.c-bds-layout__content--has-sidebar', 3000)
      .assert.containsText('h2', 'Getting Started')
      .end();
  },
};
