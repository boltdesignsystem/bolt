let currentBrowser;

module.exports = {
  tags: ['component', 'tabs', 'web component'],
  'Bolt Tabs': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-tabs';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-tabs-05-tabs/02-components-tabs-05-tabs.html`,
      )
      .waitForElementVisible('bolt-tabs', 1000)
      // .execute(
      //   function(data) {
      //     const tabs = document.querySelector('bolt-tabs');
      //     const secondTabItem = tabs.renderRoot.querySelectorAll(
      //       '.c-bolt-tabs__label',
      //     )[1];
      //     secondTabItem.click();
      //     return secondTabItem.getAttribute('aria-selected');
      //   },
      //   [],
      //   function(result) {
      //     browser.assert.ok(
      //       result.value === true,
      //       `verified that <bolt-tabs> rendered the tabs element, clicked on second tab and the selected section is showing.`,
      //     );
      //   },
      // )
      .saveScreenshot(
        `screenshots/bolt-tabs/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
