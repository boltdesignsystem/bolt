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
        `${testingUrl}/pattern-lab/patterns/02-components-carousel-05-carousel/02-components-carousel-05-carousel.html`,
      )
      .waitForElementVisible('bolt-carousel', 1000)
      .assert.elementPresent('.c-bolt-carousel__wrapper')
      .saveScreenshot(
        `screenshots/bolt-carousel/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
