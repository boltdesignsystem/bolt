// const sauce = require('../../../../scripts/nightwatch-sauce');
// const { getLatestDeploy } = require('../../../../scripts/utils');

// let testingUrl = 'https://boltdesignsystem.com';
let currentBrowser;

module.exports = {
  tags: ['component', 'video'],
  'Bolt Video Playback Rate': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-video-playback-rate';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-video-40-video-w-inline-script-and-email-share/02-components-video-40-video-w-inline-script-and-email-share.html`,
      )
      .waitForElementVisible('.video-js', 1000)
      .click('.vjs-big-play-button')
      .assert.elementPresent('.vjs-playback-rate')
      .execute(
        function(data) {
          return document.querySelector('button.vjs-playback-rate').click();
        },
        [],
        function(result) {
          // browser.assert.ok(
          //   result.value === 1.3,
          //   `verified that <bolt-video> play rate has sped up to ${
          //     result.value
          //   }`,
          // );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-video/${testName}--${currentBrowser}.png`,
      )
      .execute(
        function(data) {
          return document.querySelector('bolt-video').player.playbackRate();
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === 1.3,
            `verified that <bolt-video> play rate has sped up to ${
              result.value
            }`,
          );
        },
      )
      .execute(
        function(data) {
          return document.querySelector('.vjs-playback-rate-value').textContent;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === '1.3x',
            `verified that <bolt-video> play rate text reads 1.3x.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-video/${testName}--playback-at-1.3x--${currentBrowser}.png`,
      )
      .end();
  },

  '<bolt-video> plays via <bolt-button> on-click hook': function(browser) {
    const { testingUrl } = browser.globals;
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-video-external-controls';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-video-25-video-w-external-controls/02-components-video-25-video-w-external-controls.html`,
      )
      .waitForElementVisible('bolt-button', 1000)
      .click('bolt-button')
      .pause(1000)
      .execute(
        function(data) {
          return document.querySelector('bolt-video').player.hasStarted_;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified the <bolt-video> has started playing via the "hasStarted" property.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-video/${testName}--has-started-playing--${currentBrowser}.png`,
      )
      .pause(4000)
      .execute(
        function(data) {
          return document.querySelector('bolt-video').player.currentTime();
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value > 1,
            `<bolt-video> starts playing when <bolt-button> is clicked -- verified since the current video's play time is ${
              result.value
            } seconds`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-video/${testName}--has-finished--${currentBrowser}.png`,
      )
      .end();
  },

  // afterEach: sauce,
};
