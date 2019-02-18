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
        `${testingUrl}/pattern-lab/patterns/02-components-video-35-video-with-inline-script-and-external-controls/02-components-video-35-video-with-inline-script-and-external-controls.html`,
      )
      .waitForElementVisible('.video-js', 1000)
      .click('.vjs-big-play-button')
      .pause(250)
      .assert.elementPresent('button.vjs-playback-rate')
      .click('button.vjs-playback-rate', function() {
        browser.assert.containsText('.vjs-playback-rate-value', '1.3x');
      })
      // .assert.containsText('.vjs-playback-rate-value', '1.3x')
      .saveScreenshot(
        `screenshots/bolt-video/${testName}--playback-at-1.3x--${currentBrowser}.png`,
      )
      .execute(
        function(data) {
          return document.querySelector('bolt-video').player.playbackRate(2);
        },
        [],
        function(result) {
          browser.assert.containsText('.vjs-playback-rate-value', '2x');
        },
      )
      .saveScreenshot(
        `screenshots/bolt-video/${testName}--playback-at-2x--${currentBrowser}.png`,
      )
      .end();
  },

  '<bolt-video> plays via <bolt-button> on-click hook': function(browser) {
    const { testingUrl } = browser.globals;
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-video-external-controls';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-video-25-video-with-external-controls/02-components-video-25-video-with-external-controls.html`,
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
};
