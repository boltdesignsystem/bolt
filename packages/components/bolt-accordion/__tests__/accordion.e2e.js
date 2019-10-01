let currentBrowser;

module.exports = {
  tags: ['component', 'accordion', 'web component'],
  'Accordion: item opened': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'accordion-item-opened';
    const firstTriggerSelector =
      'bolt-accordion:first-of-type .c-bolt-accordion-item__trigger';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-accordion--45-accordion-no-shadow/02-components-accordion--45-accordion-no-shadow.html`,
      )
      .waitForElementVisible('bolt-accordion', 1000)
      .assert.elementPresent(firstTriggerSelector)

      .click(firstTriggerSelector)
      .assert.cssClassPresent(firstTriggerSelector, 'handorgel__header--opened')
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
    const inactiveTriggerSelector =
      'bolt-accordion-item[inactive] .c-bolt-accordion-item__trigger';
    const inactiveLabelSelector =
      'bolt-accordion-item[inactive] .c-bolt-accordion-item__trigger-label';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-accordion--45-accordion-no-shadow/02-components-accordion--45-accordion-no-shadow.html`,
      )
      .waitForElementVisible('bolt-accordion', 1000)
      .assert.elementPresent(inactiveTriggerSelector)
      .assert.elementPresent(inactiveLabelSelector)
      .click(inactiveLabelSelector)
      .assert.cssClassPresent(
        inactiveTriggerSelector,
        'handorgel__header--disabled',
      )
      .assert.attributeContains(inactiveLabelSelector, 'aria-expanded', 'false')
      .saveScreenshot(
        `screenshots/bolt-accordion/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
