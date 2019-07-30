const applitools = require('@bolt/nightwatch-config/applitools');

let currentBrowser;

module.exports = {
  tags: ['component', 'accordion', 'web component'],
  'Bolt Accordion': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-accordion';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-accordion-40-accordion-content-variations/02-components-accordion-40-accordion-content-variations.html`,
      )
      .waitForElementVisible('bolt-accordion', 1000)
      .click(
        'bolt-accordion:first-of-type bolt-accordion-item:first-of-type div[slot="trigger"]',
      )
      .pause(1000)
      .execute(
        function(data) {
          const accordionItem = document.querySelector('bolt-accordion-item');
          return accordionItem.renderRoot
            .querySelector('.c-bolt-accordion-item__trigger')
            .classList.contains('handorgel__header--opened');
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `verified that <bolt-accordion> rendered the accordion element, opened it and the active section has a class of handorgel__header--opened.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-accordion/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
  Applitool(browser) {
    applitools.vrtTest({
      browser,
      testName: 'bolt-accordion',
      testingPath:
        '/pattern-lab/patterns/02-components-accordion-40-accordion-content-variations/02-components-accordion-40-accordion-content-variations.html',
    });
  },
};
