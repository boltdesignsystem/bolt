let currentBrowser;

module.exports = {
  tags: ['component', 'carousel'],
  'Bolt Carousel E2E': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-carousel-basic';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-carousel-01-carousel/02-components-carousel-01-carousel.html`,
      )
      .waitForElementVisible('bolt-carousel', 1000)
      // .click('.vjs-big-play-button')
      .assert.elementPresent('.c-bolt-carousel__wrapper')
      // .execute(function(data) {
      //   return document.querySelector('button.vjs-playback-rate').click();
      // })
      .saveScreenshot(
        `screenshots/bolt-carousel/${testName}--${currentBrowser}.png`,
      )
      // .execute(
      //   function(data) {
      //     return document.querySelector('bolt-video').player.playbackRate();
      //   },
      //   [],
      //   function(result) {
      //     browser.assert.ok(
      //       result.value === 1.3,
      //       `verified that <bolt-video> play rate has sped up to ${
      //         result.value
      //       }`,
      //     );
      //   },
      // )
      // .execute(
      //   function(data) {
      //     return document.querySelector('.vjs-playback-rate-value').textContent;
      //   },
      //   [],
      //   function(result) {
      //     browser.assert.ok(
      //       result.value === '1.3x',
      //       `verified that <bolt-video> play rate text reads 1.3x.`,
      //     );
      //   },
      // )
      // .saveScreenshot(
      //   `screenshots/bolt-video/${testName}--playback-at-1.3x--${currentBrowser}.png`,
      // )
      .end();
  },
};
