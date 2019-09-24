let currentBrowser;

module.exports = {
  tags: ['component', 'tabs', 'web component'],
  'Tabs: tab selected': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'tabs-tab-selected';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-tabs-05-tabs/02-components-tabs-05-tabs.html`,
      )
      .waitForElementVisible('bolt-tabs', 1000)
      .execute(function(data) {
        return document
          .querySelector('bolt-tabs')
          .renderRoot.querySelectorAll('.c-bolt-tabs__label')[1]
          .click();
      })
      .saveScreenshot(
        `screenshots/bolt-tabs/${testName}--${currentBrowser}.png`,
      )
      .execute(
        function(data) {
          const tabs = document.querySelector('bolt-tabs');
          const selectedTab = tabs.renderRoot.querySelectorAll(
            '.c-bolt-tabs__label',
          )[1];
          const selectedPanel = tabs.querySelectorAll('bolt-tab-panel')[1];
          const tabIsSelected =
            selectedTab.getAttribute('aria-selected') === 'true';
          const panelIsSelected = selectedPanel.hasAttribute('selected');

          return { tabIsSelected, panelIsSelected };
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value.tabIsSelected === true,
            `Clicked on second tab and verified the second tab label has the attribute 'aria-selected="true"'`,
          );
          browser.assert.ok(
            result.value.panelIsSelected === true,
            `Clicked on second tab and verified the second tab panel has the attribute 'selected'`,
          );
        },
      )
      .end();
  },
};
