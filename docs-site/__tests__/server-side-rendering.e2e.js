module.exports = {
  'Pattern Lab: Confirm SSR Working': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-button-70-button-ssr-example--web-component-wo-shadow-dom/02-components-button-70-button-ssr-example--web-component-wo-shadow-dom.html`,
      )
      .waitForElementVisible('bolt-button', 3000)
      .assert.elementPresent('.c-bolt-button')
      .saveScreenshot(
        `screenshots/pattern-lab/web-component-ssr--${browser.currentEnv ||
          'chrome'}.png`,
      )
      .end();
  },
};
