let currentBrowser;

module.exports = {
  tags: ['component', 'sticky', 'web component'],
  'Bolt Accordion': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-sticky';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-sticky--10-sticky-simple-example/02-components-sticky--10-sticky-simple-example.html`,
      )
      .waitForElementVisible('bolt-sticky', 1000)
      .moveToElement('#endOfDocument', 0, 0)
      .pause(1000)
      .execute(
        function(data) {
          const boltSticky = document.querySelector('bolt-sticky'); // Grab first sticky element in document
          const boundingBox = boltSticky.getBoundingClientRect(); // Get the sticky element's bounding box
          return boundingBox && boundingBox.top === 0; // Confirm the bounding box is set to the top of the page
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified that <bolt-sticky> sticks to the top of the page when scrolled past.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-sticky/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
