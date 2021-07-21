let currentBrowser;

// Dev Notes
// 1. Execute click via JS not .click() simulator which throws intermittent "element click intercepted" error (https://stackoverflow.com/questions/38831015/how-to-click-at-a-certain-location-in-div).

module.exports = {
  tags: ['component', 'trigger'],
  'Bolt Trigger Modal': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-trigger-modal';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/40-components-trigger-35-trigger-advanced-usage/40-components-trigger-35-trigger-advanced-usage.html`,
      )
      .waitForElementVisible('bolt-trigger[data-bolt-modal-target]', 1000)
      // .click('bolt-trigger[data-bolt-modal-target]') // [1]
      .execute(
        function(selector) {
          document.querySelector(selector).click();
        },
        ['bolt-trigger[data-bolt-modal-target]'],
      )
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
      .waitForElementVisible(
        'bolt-modal bolt-trigger[data-bolt-modal-target]',
        1000,
      )
      .pause(1000)
      // .click('bolt-modal bolt-trigger[data-bolt-modal-target]') // [1]
      .execute(
        function(selector) {
          document.querySelector(selector).click();
        },
        ['bolt-modal bolt-trigger[data-bolt-modal-target]'],
      )
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
