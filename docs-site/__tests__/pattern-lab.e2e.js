module.exports = {
  'Pattern Lab: Confirm Successful Now.sh Deploy + Pattern Lab Compiled': function(
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

  'Pattern Lab: Confirm Successful Now.sh Deploy + Pattern Lab Compiled': function(
    browser,
  ) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}/pattern-lab/?p=components-overview`)
      .waitForElementVisible('pl-header', 3000)
      .assert.elementPresent('.js-c-typeahead__input')
      .saveScreenshot(
        `screenshots/pattern-lab/pattern-lab-search--${browser.currentEnv ||
          'chrome'}.png`,
      )
      .end();
  },
};
