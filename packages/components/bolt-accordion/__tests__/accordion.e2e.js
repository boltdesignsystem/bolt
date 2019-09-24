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
          const trigger = accordionItem.renderRoot.querySelector(
            '.c-bolt-accordion-item__trigger',
          );
          const label = trigger.querySelector(
            '.c-bolt-accordion-item__trigger-label',
          );
          const isDisabled = trigger.classList.contains(
            'handorgel__header--disabled',
          );
          const isNotExpanded = label.getAttribute('aria-expanded') === 'false';
          const isDiv = label.tagName === 'DIV';

          return { isDisabled, isNotExpanded, isDiv };
        },
        [],
        function(result) {
          browser.assert.ok(
            result.value.isDisabled === true,
            `Clicked on an inactive accordion item and verified the trigger has the disabled class 'handorgel__header--disabled'`,
          );
          browser.assert.ok(
            result.value.isNotExpanded === true,
            `Clicked on an inactive accordion item and verified the label has the attribute 'aria-expanded="false"'`,
          );
          browser.assert.ok(
            result.value.isDiv === true,
            `Clicked on an inactive accordion item and verified the label has the tag name 'DIV'`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-accordion/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
