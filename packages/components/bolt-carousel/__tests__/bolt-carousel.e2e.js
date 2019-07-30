const applitools = require('@bolt/nightwatch-config/applitools');

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
  Applitool(browser) {
    applitools.vrtTest({
      browser,
      testName: 'bolt-carousel',
      testingPath:
        '/pattern-lab/patterns/02-components-carousel-30-carousel-advanced-variations/02-components-carousel-30-carousel-advanced-variations.html',
    });
  },
};
