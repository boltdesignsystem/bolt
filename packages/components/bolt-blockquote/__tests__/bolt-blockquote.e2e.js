let currentBrowser;

module.exports = {
  tags: ['component', 'blockquote', 'web component'],
  'Bolt Blockquote': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-blockquote';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-blockquote-10-blockquote-alignItems-variation/02-components-blockquote-10-blockquote-alignItems-variation.html`,
      )
      .waitForElementVisible('bolt-blockquote', 1000)
      .assert.elementPresent('img[slot="logo"]')
      .execute(
        function(data) {
          return document.querySelector('bolt-blockquote cite[slot="author-name"]').textContent;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === 'Michelangelo di Lodovico Buonarroti Simoni',
            `verified that <bolt-blockquote> rendered author text.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-blockquote/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
