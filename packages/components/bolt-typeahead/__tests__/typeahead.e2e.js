let currentBrowser;

module.exports = {
  tags: ['component', 'typeahead'],
  'Bolt Typeahead: Dynamic Data': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-typeahead';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-typeahead-typeahead--dynamically-fetch-data/02-components-typeahead-typeahead--dynamically-fetch-data.html`,
      )
      .waitForElementVisible('.js-c-typeahead__input', 3000)
      .assert.elementPresent('.js-typeahead-hook--dynamically-fetch-data')
      .assert.elementPresent(
        '.js-typeahead-hook--dynamically-fetch-data .c-bolt-button',
      )
      .click('.js-c-typeahead__input'); // click on the PL search input

    browser.saveScreenshot(
      `screenshots/pattern-lab/typeahead--${browser.capabilities.browserName ||
        'chrome'}.png`,
    );

    browser.expect.elements('.c-bolt-typeahead__result').count.to.equal(1);

    browser
      .waitForElementVisible('.c-bolt-typeahead__result', 3000)
      .click('.c-bolt-typeahead__result') // click on the first result
      .waitForElementVisible('.c-page-header', 3000);

    browser.assert.urlContains('https://www.pega.com');
  },
};
