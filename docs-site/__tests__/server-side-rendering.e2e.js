module.exports = {
  'Pattern Lab: Confirm SSR Working': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(`${testingUrl}/pattern-lab/?p=viewall-components-button`)
      .assert.urlContains('components-button')
      .saveScreenshot(
        `screenshots/pattern-lab/button-component-docs--${browser.currentEnv ||
          'chrome'}.png`,
      )
      .click('.pl-js-open-new-window')
      .windowHandles(function(result) {
        var handle = result.value[1];
        browser.switchWindow(handle);
      })
      .waitForElementVisible('bolt-button', 3000)
      .assert.elementPresent('.c-bolt-button')
      .saveScreenshot(
        `screenshots/pattern-lab/button-component-docs-in-new-window--${browser.currentEnv ||
          'chrome'}.png`,
      )
      .closeWindow()
      .windowHandles(function(result) {
        var handle = result.value[0];
        browser.switchWindow(handle);
      })
      .url(
        `${testingUrl}/pattern-lab/?p=components-button-ssr--web-component-wo-shadow-dom`,
      )
      .click('.pl-js-open-new-window')
      .windowHandles(function(result) {
        var handle = result.value[1];
        browser.switchWindow(handle);
      })
      .waitForElementVisible('bolt-button', 3000)
      .assert.elementPresent('.c-bolt-button')
      .saveScreenshot(
        `screenshots/pattern-lab/button-component-ssr--${browser.currentEnv ||
          'chrome'}.png`,
      )
      .closeWindow()
      .end();
  },
};
