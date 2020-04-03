module.exports = {
  'Pattern Lab: Confirm Successful Now.sh Deploy - Pattern Lab Inner': function (
    browser,
  ) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}/pattern-lab/index.html`)
      .waitForElementVisible('.pl-c-body', 3000)
      .verify.title('Pattern Lab - components-overview')
      .end();
  },

  // 'Pattern Lab: Confirm Successful Now.sh Deploy - Pattern Lab Outer': function(
  //   browser,
  // ) {
  //   const { testingUrl } = browser.globals;
  //   console.log(`global browser url: ${testingUrl}`);
  //   browser
  //     .url(`${testingUrl}/pattern-lab/?p=components-overview`)
  //     .waitForElementVisible('.pl-js-open-new-window', 3000)
  //     .waitForElementVisible('pl-header', 3000)
  //     .assert.elementPresent('.js-c-typeahead__input')
  //     .click('.js-c-typeahead__input'); // click on the PL search input

  //   // type "Components-Card" in the input field. Adjust command based on browser support
  //   if (browser.sendKeys) {
  //     browser.sendKeys('.js-c-typeahead__input', 'Components-Card');
  //   } else {
  //     browser.keys('Components-Card');
  //   }

  // browser.saveScreenshot(
  //   `screenshots/pattern-lab/pattern-lab-search-input--${browser.capabilities
  //     .browserName || 'chrome'}.png`,
  // );

  // // end buggy keyboard input test early for IE 11
  // if (browser.capabilities.browserName.includes('explorer')) {
  //   browser.end();
  // } else {
  //   browser
  //     .waitForElementVisible('.pl-c-typeahead__result--first', 3000) // make sure the "Open in a New Tab" UI is there
  //     .click('.pl-c-typeahead__result--first') // click on the first result
  //     .getAttribute('.pl-js-open-new-window', 'href', function(result) {
  //       browser.url(`${result.value}`);
  //     })
  //     .waitForElementVisible('bolt-card', 3000)
  //     .assert.urlContains('components-card')
  //     .saveScreenshot(
  //       `screenshots/pattern-lab/pattern-lab-search-results-load-new-page--${browser
  //         .capabilities.browserName || 'chrome'}.png`,
  //     )
  //     .end();
  // }
  // },
};
