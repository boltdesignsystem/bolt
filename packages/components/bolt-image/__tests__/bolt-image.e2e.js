let currentBrowser;

module.exports = {
  tags: ['component', 'image'],
  'Bolt Image image is showed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + typeof browser.currentEnv !== 'undefined' ? browser.currentEnv : 'chrome';
    let testName = 'bolt-image-showed';

    console.log('B:', browser.currentEnv);
    console.log('CB:', currentBrowser);

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-image-05-image/02-components-image-05-image.html`,
      )
      .waitForElementVisible('.c-bolt-image__image', 1000)
      .saveScreenshot(
        `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
      )
      .end();
  },

  'Bolt Image zoom': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + typeof browser.currentEnv !== 'undefined' ? browser.currentEnv : 'chrome';
    let testName = 'bolt-image-zoom';

    console.log('B:', browser.currentEnv);
    console.log('CB:', currentBrowser);

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-image-30-image-zoom-variation/02-components-image-30-image-zoom-variation.html`,
      )
      .waitForElementVisible('bolt-device-viewer', 1000)
      .moveToElement('bolt-image-zoom', 10, 10)
      .assert.cssClassPresent('bolt-image-zoom', 'is-mouse-entering')
      .saveScreenshot(
        `screenshots/bolt-image/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
