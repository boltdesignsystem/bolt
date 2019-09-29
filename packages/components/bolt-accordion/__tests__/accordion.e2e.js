let currentBrowser;

module.exports = {
  tags: ['component', 'accordion', 'web component'],
  'Accordion: item opened': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'accordion-item-opened';

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
            `Verified that <bolt-accordion> rendered the accordion element, opened it, and the active section has the class 'handorgel__header--opened'`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-accordion/${testName}--${currentBrowser}.png`,
      )
      .saveScreenshot(
        `screenshots/bolt-accordion/${testName}--${currentBrowser}.png`,
      )
      .end();
  },

  'Accordion: inactive item remains closed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'accordion-inactive-item-closed';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-accordion-40-accordion-content-variations/02-components-accordion-40-accordion-content-variations.html`,
      )
      .waitForElementVisible('bolt-accordion', 1000)
      .click(
        'bolt-accordion:first-of-type bolt-accordion-item:nth-child(2) div[slot="trigger"]',
      )
      .pause(1000)
      .execute(
        function(data) {
          const accordionItem = document.querySelector(
            'bolt-accordion-item:nth-child(2)',
          );
          const label = accordionItem.renderRoot.querySelector(
            '.c-bolt-accordion-item__trigger-label',
          );
          const hasInactiveClass = label.classList.contains(
            'c-bolt-accordion-item__trigger-label--inactive',
          );
          // const hasExpandedAttr =
          //   label.getAttribute('aria-expanded') === 'false';
          // const isDiv = label.tagName === 'DIV';

          return hasInactiveClass;
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value === true,
            `Clicked on an inactive accordion item and verified the trigger has the inactive class 'c-bolt-accordion-item__trigger-label--inactive'`,
          );
          // browser.assert.ok(
          //   result.value.hasInactiveClass === true,
          //   `Clicked on an inactive accordion item and verified the trigger has the inactive class 'c-bolt-accordion-item__trigger-label--inactive'`,
          // );
          // browser.assert.ok(
          //   result.value.hasExpandedAttr === true,
          //   `Clicked on an inactive accordion item and verified the label has the attribute 'aria-expanded="false"'`,
          // );
          // browser.assert.ok(
          //   result.value.isDiv === true,
          //   `Clicked on an inactive accordion item and verified the label has the tag name 'DIV'`,
          // );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-accordion/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
