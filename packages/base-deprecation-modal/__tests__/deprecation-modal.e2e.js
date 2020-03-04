let currentBrowser;

module.exports = {
  tags: ['component', 'ie 11 deprecation modal'],
  'Verify IE 11 Deprecation Modal Works + Only Displays in IE 11': function(browser) {
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
          `${testingUrl}/pattern-lab/patterns/02-components-deprecation-modal-ie-11-deprecation/02-components-deprecation-modal-ie-11-deprecation.html`,
        )
        .waitForElementVisible('.js-deprecation-modal', 3000)
        .click('css selector', '.js-dismiss-deprecation-modal')
        .expect.element('.js-deprecation-modal')
        .to.not.be.visible.after(3000);

      // modal remains hidden refreshing (after clicking on the X)
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-deprecation-modal-ie-11-deprecation/02-components-deprecation-modal-ie-11-deprecation.html`,
        )
        // .waitForElementNotVisible('.js-deprecation-modal', 3000)
        .expect.element('.js-deprecation-modal')
        .to.not.be.visible.after(3000);

      // modal re-appears after deleting cookie
      browser
        .deleteCookie('dismissIEDeprecationNotice')
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-deprecation-modal-ie-11-deprecation/02-components-deprecation-modal-ie-11-deprecation.html`,
        )
        .expect.element('.js-deprecation-modal')
        .to.be.visible.after(3000);

      // modal closes via keyboard by tabbing to the hidden close button
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-deprecation-modal-ie-11-deprecation/02-components-deprecation-modal-ie-11-deprecation.html`,
        )
        .waitForElementVisible('.js-deprecation-modal', 3000)
        .waitForElementVisible('.c-bolt-deprecation-modal__text', 3000)
        .click('css selector', '.c-bolt-deprecation-modal__text')
        .keys([
          browser.Keys.TAB,
          browser.Keys.TAB,
          browser.Keys.TAB,
          browser.Keys.TAB,
          browser.Keys.ENTER,
        ])
        .expect.element('.js-deprecation-modal')
        .to.not.be.visible.after(3000);

      // modal doesn't re-open after closing via keyboard
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-deprecation-modal-ie-11-deprecation/02-components-deprecation-modal-ie-11-deprecation.html`,
        )
        .expect.element('.js-deprecation-modal')
        .to.not.be.visible.after(3000);
    } else {
      browser
        .url(
          `${testingUrl}/pattern-lab/patterns/02-components-deprecation-modal-ie-11-deprecation/02-components-deprecation-modal-ie-11-deprecation.html`,
        )
        .expect.element('.js-deprecation-modal').to.not.be.visible;
    }
  },
};
