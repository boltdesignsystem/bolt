let currentBrowser;

module.exports = {
  tags: ['component', 'tabs', 'web component'],
  'Tabs: tab selected': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'tabs-tab-selected';
    const secondTabSelector = 'bolt-tabs .c-bolt-tabs__label:nth-child(2)';
    const secondPanelSelector = 'bolt-tabs bolt-tab-panel:nth-child(2)';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-tabs--40-tabs-no-shadow/02-components-tabs--40-tabs-no-shadow.html`,
      )
      .waitForElementVisible('bolt-tabs', 1000)
      .assert.elementPresent(secondTabSelector)
      .assert.attributeEquals(secondTabSelector, 'aria-selected', 'false')
      .assert.elementPresent(secondPanelSelector)
      .click(secondTabSelector)
      .assert.attributeEquals(secondTabSelector, 'aria-selected', 'true')
      .assert.attributeEquals(secondPanelSelector, 'selected', 'true')
      .saveScreenshot(
        `screenshots/bolt-tabs/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
