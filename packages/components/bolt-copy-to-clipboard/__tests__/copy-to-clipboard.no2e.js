let currentBrowser;

module.exports = {
  tags: ['component', 'copy-to-clipboard', 'web component'],
  'Bolt Copy To Clipboard': function (browser) {
    const { testingUrl } = browser.globals;
    console.log(`global browser url: ${testingUrl}`);
    currentBrowser = '--' + browser.currentEnv || 'chrome';
    let testName = 'bolt-copy-to-clipboard';

    browser
      .url(
        `${testingUrl}/pattern-lab/patterns/02-components-copy-to-clipboard-05-copy-to-clipboard/02-components-copy-to-clipboard-05-copy-to-clipboard.html`,
      )
      .waitForElementVisible('bolt-copy-to-clipboard', 1000)
      .click(
        'bolt-copy-to-clipboard span.c-bolt-copy-to-clipboard__action-text',
      )
      .pause(1000)
      .execute(
        function (data) {
          // Approach 1: test that ClipBoardJS instance on Copy To Clipboard instantiates and lifts copy
          // Drawback: ClipboardJS may still work despite breaking change to interface with browser/clipboard API
          // Confirm ClipboardJS instance has stored the desired text string
          const copyToClipboardElement = document.querySelector(
            'bolt-copy-to-clipboard',
          );
          return copyToClipboardElement.clipboardInstance
            ? copyToClipboardElement.clipboardInstance.clipboardAction
                .selectedText === 'https://boltdesignsystem.com'
            : false;

          // Approach 2: Mimic a paste event into an empty text input field, then read its value
          // Create dummy input element to paste clipboard contents
          // const copyTargetInput = document.createElement('input');
          // copyTargetInput.setAttribute('type', 'text');

          // Attach Dummy input to document, focus, and paste from the clipboard
          // document.body.appendChild(copyTargetInput);
          // copyTargetInput.focus();
          // browser.keys([browser.Keys.CONTROL, 'v']); // Not sure if this works across multiple browsers

          // Check text inside input element
          // return copyTargetInput.value === 'https://boltdesignsystem.com';
        },
        [],
        function (result) {
          browser.assert.ok(
            result.value === true,
            `verified that "bolt-copy-to-clipboard" instantiated Clipboard.js and stored value from Dom after click.`,
          );
        },
      )
      .saveScreenshot(
        `screenshots/bolt-copy-to-clipboard/${testName}--${currentBrowser}.png`,
      )
      .end();
  },
};
