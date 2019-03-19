module.exports = {
  'Pattern Lab: Confirm Successful Now.sh Deploy - Pattern Lab Inner': function(
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

  'Pattern Lab: Confirm Successful Now.sh Deploy - Pattern Lab Outer': function(
    browser,
  ) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}/pattern-lab/?p=components-overview`)
      .waitForElementVisible('pl-header', 3000)
      .assert.elementPresent('.js-c-typeahead__input')
      .click('.js-c-typeahead__input') // click on the PL search input
      .keys('Components-Card') // type "Components-Card" in the input field
      .click('.pl-c-typeahead__result--first') // click on the first result
      .waitForElementVisible('.pl-js-open-new-window', 3000) // make sure the "Open in a New Tab" UI is there before clicking on it
      .click('.pl-js-open-new-window')
      .windowHandles(function(result) {
        var handle = result.value[1];
        browser.switchWindow(handle); // switch browser windows to make sure the page we've just opened is in focus
      })
      .waitForElementVisible('bolt-card', 3000)
      .assert.urlContains('components-card')
      .saveScreenshot(
        `screenshots/pattern-lab/pattern-lab-search-results-load-new-page--${browser.currentEnv ||
          'chrome'}.png`,
      )
      .end();
  },
};
