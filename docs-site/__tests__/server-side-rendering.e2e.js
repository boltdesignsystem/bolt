module.exports = {
  'Pattern Lab: Confirm SSR Working': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}/pattern-lab/?p=viewall-components-button`)
      .assert.urlContains('components-button')
      .saveScreenshot(
        `screenshots/pattern-lab/button-component-docs--${browser.capabilities
          .browserName || 'chrome'}.png`,
      )
      .waitForElementVisible('.pl-js-open-new-window', 10000)
      .getAttribute('.pl-js-open-new-window', 'href', function(result) {
        browser.url(result.value);
      })
      .waitForElementVisible('bolt-button', 10000)
      .assert.elementPresent('.c-bolt-button')
      .saveScreenshot(
        `screenshots/pattern-lab/button-component-docs-in-new-window--${browser
          .capabilities.browserName || 'chrome'}.png`,
      )
      .url(
        `${testingUrl}/pattern-lab/?p=components-button-ssr--web-component-wo-shadow-dom`,
      )
      .getAttribute('.pl-js-open-new-window', 'href', function(result) {
        browser.url(result.value);
      })
      .waitForElementVisible('bolt-button', 10000)
      .assert.elementPresent('.c-bolt-button')
      .saveScreenshot(
        `screenshots/pattern-lab/button-component-ssr--${browser.capabilities
          .browserName || 'chrome'}.png`,
      )
      // .closeWindow()
      .end();
  },
};
