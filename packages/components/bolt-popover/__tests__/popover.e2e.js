let currentBrowser;

module.exports = {
  tags: ['component', 'popover'],
  'Popover w/ matching open no-JS / SSR state auto-opens but can still be closed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-popover-25-popover-theme-variations/02-components-popover-25-popover-theme-variations.html#js-bolt-popover-theme-demo-xdark-5`,
      )
      .waitForElementVisible('bolt-popover[uuid="theme-demo-xdark-5"]', 1000)
      .pause(1000)
      .assert.visible('#js-bolt-popover-theme-demo-xdark-5')
      .assert.not.urlContains('#js-bolt-popover-theme-demo-xdark-5')
      .assert.not.urlContains('#js-bolt-popover')
      .click('body')
      .pause(100)
      .assert.not.visible('#js-bolt-popover-theme-demo-xdark-5')
      .end();
  },

  'Popover w/ matching closed no-JS / SSR state remains closed': function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-popover-25-popover-theme-variations/02-components-popover-25-popover-theme-variations.html#js-bolt-popover-trigger-theme-demo-xdark-5`,
      )
      .waitForElementVisible('bolt-popover[uuid="theme-demo-xdark-5"]', 1000)
      .pause(1000)
      .assert.not.visible('#js-bolt-popover-theme-demo-xdark-5')
      .assert.not.urlContains('#js-bolt-popover-trigger-theme-demo-xdark-5')
      .assert.not.urlContains('#js-bolt-popover')
      .assert.not.visible('#js-bolt-popover-theme-demo-xdark-5')
      .end();
  },

  "Popover's URL cleanup doesn't modify existing URL query strings": function(browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-popover-25-popover-theme-variations/02-components-popover-25-popover-theme-variations.html?foo=bar#js-bolt-popover-theme-demo-xdark-5`,
      )
      .waitForElementVisible('bolt-popover[uuid="theme-demo-xdark-5"]', 1000)
      .pause(1000)
      .assert.visible('#js-bolt-popover-theme-demo-xdark-5')
      .assert.not.urlContains('#js-bolt-popover-theme-demo-xdark-5')
      .assert.not.urlContains('#js-bolt-popover')
      .click('body')
      .pause(100)
      .assert.not.visible('#js-bolt-popover-theme-demo-xdark-5')
      .assert.urlContains('?foo=bar')
      .end();
  },
};
