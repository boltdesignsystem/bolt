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
      .assert.elementPresent('bolt-logo[slot="logo"]')
      .execute(
        function(data) {
          const blockquote = document.querySelector('bolt-blockquote');
          return blockquote.renderRoot
            .querySelector('blockquote')
            .classList.contains('c-bolt-blockquote');
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified that <bolt-blockquote> rendered the blockquote element with a class of  c-bolt-blockquote.`,
          );
        },
      )
      .execute(
        function(data) {
          return document.querySelector(
            'bolt-blockquote cite[slot="author-name"]',
          ).textContent;
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
