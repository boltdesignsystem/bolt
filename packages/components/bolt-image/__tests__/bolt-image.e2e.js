const applitools = require('@bolt/nightwatch-config/applitools');

let currentBrowser;

module.exports = {
  tags: ['component', 'image'],
  'Bolt Image image is showed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-image-showed';
    let bodyWidth = 0;

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-image-05-image/02-components-image-05-image.html`,
      )
      .waitForElementVisible('body', 1000)
      .getElementSize('body', function(result) {
        bodyWidth = result.value.width;
      })
      .getElementSize('bolt-image', function(result) {
        const imageHeight = Math.round(bodyWidth / 1.3333333333);

        this.assert.equal(result.value.width, bodyWidth);
        this.assert.equal(result.value.height, imageHeight);
      })
      .execute(
        function(data) {
          return document.querySelector('bolt-image')._wasInitiallyRendered;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified the <bolt-image> was rendered via the "_wasInitiallyRendered" property.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
      )
      .end();
  },

  'Bolt Image zoom': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-image-zoom';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-image-30-image-zoom-variation/02-components-image-30-image-zoom-variation.html`,
      )
      .waitForElementVisible('.c-bolt-image-zoom__overlay-icon', 1000)
      .saveScreenshot(
        `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
      )
      .end();
  },

  Applitool(browser) {
    applitools.vrtTest({
      browser,
      testName: 'bolt-image',
      testingPath:
        '/pattern-lab/patterns/02-components-image-05-image/02-components-image-05-image.html',
    });
  },
};
