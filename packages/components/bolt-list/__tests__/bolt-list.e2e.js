let currentBrowser;

module.exports = {
  tags: ['component', 'list'],

  // This test would typically be more appropriate as a Jest test since it only
  // requires simple rendering and testing the output, but Jest doesn't have an
  // obvious way to pass along a twig object from javascript as a parameter to
  // a twig template.
  'Bolt List: items accept renderable objects as content': function(browser) {
    const { testingUrl } = browser.globals;
    currentBrowser = '--' + browser.currentEnv || 'chrome';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-list-__tests__--list-with-object-in-item/02-components-list-__tests__--list-with-object-in-item.html`,
      )
      .waitForElementVisible('bolt-list', 1000)
      .assert.containsText('bolt-list', 'test-attr="test-value"')
      .end();
  },
};
