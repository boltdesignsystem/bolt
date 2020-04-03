let currentBrowser;

module.exports = {
  tags: ['component', 'tabs', 'web component'],
  'Tabs: tab selected': function (browser) {
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

  'Tabs: adaptive menu': function (browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'tabs-adaptive-menu';
    const hiddenPrimaryLabel =
      'bolt-tabs .c-bolt-tabs__nav > .c-bolt-tabs__label:nth-child(5)';
    const visibleDropdownLabel =
      'bolt-tabs .c-bolt-tabs__dropdown-list > .c-bolt-tabs__label:nth-child(5)';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-tabs--40-tabs-no-shadow/02-components-tabs--40-tabs-no-shadow.html`,
      )
      .waitForElementVisible('bolt-tabs', 1000)
      .resizeWindow(600, 400)
      .assert.elementPresent(hiddenPrimaryLabel)
      .assert.attributeEquals(hiddenPrimaryLabel, 'aria-hidden', 'true')
      .assert.elementPresent(visibleDropdownLabel)
      .assert.attributeEquals(visibleDropdownLabel, 'aria-hidden', 'false')
      .click('.c-bolt-tabs__show-button')
      .waitForElementVisible(visibleDropdownLabel, 1000)
      .click(visibleDropdownLabel)
      .assert.attributeEquals(visibleDropdownLabel, 'aria-selected', 'true')
      .saveScreenshot(
        `screenshots/bolt-tabs/${testName}--${currentBrowser}.png`,
      )
      .end();
  },

  'Tabs: loads video content in inactive tab': function (browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'tabs-adaptive-menu';
    const video = 'bolt-video';
    const videoPlayer = 'bolt-video video-js'; // click on video element not button itself

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-tabs-30-tabs-content/02-components-tabs-30-tabs-content.html`,
      )
      .waitForElementVisible('bolt-tabs', 1000)
      .assert.elementPresent(video)
      .execute(
        function (data) {
          // Get initial selected tab
          return document.querySelector('bolt-tabs').selectedTab;
        },
        [],
        function (result) {
          browser.assert.ok(
            result.value === 1,
            `On load the first tab is open and Video is hidden`,
          );
        },
      )
      .execute(function (data) {
        // Opens video tab
        document.querySelector('bolt-tabs').setAttribute('selected-tab', 4);
      })
      .click(videoPlayer)
      .pause(4000)
      .assert.cssClassPresent(videoPlayer, ['vjs-has-started', 'vjs-playing'])
      .click(videoPlayer)
      .pause(1000)
      .assert.cssClassPresent(videoPlayer, ['vjs-paused'])
      .execute(
        function (data) {
          return document.querySelector('bolt-video').player.currentTime();
        },
        [],
        function (result) {
          browser.assert.ok(
            result.value > 1,
            `<bolt-video> starts playing when <bolt-button> is clicked -- verified since the current video's play time is ${result.value} seconds`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-tabs/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
