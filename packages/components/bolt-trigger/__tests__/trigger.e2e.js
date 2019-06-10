let currentBrowser;

module.exports = {
  tags: ['component', 'trigger'],
  'Bolt Trigger Modal': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-trigger-modal';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-trigger-30-trigger-advanced-usage/02-components-trigger-30-trigger-advanced-usage.html`,
      )
      .waitForElementVisible('bolt-trigger[on-click="show"]', 1000)
      .click('bolt-trigger[on-click="show"]')
      .pause(1000)
      .execute(
        function(data) {
          return document.querySelector('bolt-modal').open;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified <bolt-trigger> opened the modal.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-trigger/${testName}--has-opened-modal--${currentBrowser}.png`,
      )
      .click('bolt-modal > bolt-trigger')
      .pause(1000)
      .execute(
        function(data) {
          return document.querySelector('bolt-modal').open;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === false,
            `verified <bolt-trigger> closed the modal.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-trigger/${testName}--has-closed-modal--${currentBrowser}.png`,
      )
      .end();
  },
};
