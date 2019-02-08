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
      .getElementSize('.c-bolt-image__image', function(result) {
        const imageHeight = Math.round(bodyWidth / 1.3333333333);
        this.assert.equal(typeof result, 'object');
        this.assert.equal(result.status, 0);
        this.assert.equal(result.value.width, bodyWidth);
        this.assert.equal(result.value.height, imageHeight);
      })
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
      .waitForElementVisible('bolt-device-viewer', 1000)
      .moveToElement('bolt-image-zoom', 50, 50)
      .assert.cssClassPresent('bolt-image-zoom', 'is-mouse-entering')
      .saveScreenshot(
        `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
