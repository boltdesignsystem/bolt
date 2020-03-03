let currentBrowser;

module.exports = {
  tags: ['component', 'ie 11 deprecation modal'],
  'Verify IE 11 Deprecation Modal Only Displays in IE 11': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.capabilities.browserName;

    // make sure the deprecation modal is working in IE 11 + doesn't display in other browsers
    if (
      browser.capabilities.browserName === 'internet explorer' &&
      browser.capabilities.version === '11'
    ) {
      // modal closes after clicking on the X
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-ie-11-deprecation-ie-11-deprecation/02-components-ie-11-deprecation-ie-11-deprecation.html`,
        )
        .waitForElementVisible('.js-ie-11-deprecation', 2000)
        .click('css selector', '.js-dismiss-deprecation-notice')
        .expect.element('.js-ie-11-deprecation')
        .to.not.be.visible.after(1000);

      // modal remains hidden refreshing (after clicking on the X)
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-ie-11-deprecation-ie-11-deprecation/02-components-ie-11-deprecation-ie-11-deprecation.html`,
        )
        // .waitForElementNotVisible('.js-ie-11-deprecation', 3000)
        .expect.element('.js-ie-11-deprecation')
        .to.not.be.visible.after(3000);

      // modal re-appears after deleting cookie
      browser
        .deleteCookie('dismissIEDeprecationNotice')
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-ie-11-deprecation-ie-11-deprecation/02-components-ie-11-deprecation-ie-11-deprecation.html`,
        )
        .expect.element('.js-ie-11-deprecation')
        .to.be.visible.after(2000);

      // modal closes via keyboard by tabbing to the hidden close button
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-ie-11-deprecation-ie-11-deprecation/02-components-ie-11-deprecation-ie-11-deprecation.html`,
        )
        .waitForElementVisible('.js-ie-11-deprecation', 2000)
        .waitForElementVisible('.c-bolt-ie-11-deprecation__text', 2000)
        .click('css selector', '.c-bolt-ie-11-deprecation__text')
        .keys([
          browser.Keys.TAB,
          browser.Keys.TAB,
          browser.Keys.TAB,
          browser.Keys.TAB,
          browser.Keys.ENTER,
        ])
        .expect.element('.js-ie-11-deprecation')
        .to.not.be.visible.after(2000);

      // modal doesn't re-open after closing via keyboard
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-ie-11-deprecation-ie-11-deprecation/02-components-ie-11-deprecation-ie-11-deprecation.html`,
        )
        .expect.element('.js-ie-11-deprecation')
        .to.not.be.visible.after(2000);
    } else {
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-ie-11-deprecation-ie-11-deprecation/02-components-ie-11-deprecation-ie-11-deprecation.html`,
        )
        .expect.element('.js-ie-11-deprecation').to.not.be.visible;
    }
  },
};
