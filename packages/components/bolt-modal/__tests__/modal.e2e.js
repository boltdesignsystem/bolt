let currentBrowser;

module.exports = {
  tags: ['component', 'modal', 'web component'],
  'Bolt Modal': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-modal';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-modal-05-modal/02-components-modal-05-modal.html`,
      )
      .waitForElementVisible('bolt-button', 1000)
      .click('bolt-button')
      .pause(1000)
      .execute(
        function(data) {
          const modal = document.querySelector('bolt-modal');
          return modal.renderRoot
            .querySelector('.c-bolt-modal')
            .classList.contains('is-open');
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified that clicking <bolt-button> opened <bolt-modal> and added the class "is-open".`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-modal/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
