module.exports = {
  'Pattern Lab: Confirm SSR Working': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-button-70-server-side-rendering--twig-only/02-components-button-70-server-side-rendering--twig-only.html`,
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
