// let currentBrowser;

// module.exports = {
//   tags: ['component', 'tabs', 'web component'],
//   'Bolt Tabs': function(browser) {
//     const { testingUrl } = browser.globals;
//     console.log(`global browser url: ${testingUrl}`);
//     currentBrowser = '--' + browser.currentEnv || 'chrome';
//     let testName = 'bolt-tabs';

//     browser
//       .url(
//         `${testingUrl}/pattern-lab/patterns/02-components-tabs-40-tabs-content-variations/02-components-tabs-40-tabs-content-variations.html`,
//       )
//       .waitForElementVisible('bolt-tabs', 1000)
//       .click(
//         'bolt-tabs:first-of-type bolt-tab-panel:first-of-type div[slot="label"]',
//       )
//       .pause(1000)
//       .execute(
//         function(data) {
//           const tabsItem = document.querySelector('bolt-tab-panel');
//           return tabsItem.renderRoot
//             .querySelector('.c-bolt-tab-panel__label')
//             .classList.contains('handorgel__header--opened');
//         },
//         [],
//         function(result) {
//           browser.assert.ok(
//             result.value === true,
//             `verified that <bolt-tabs> rendered the tabs element, opened it and the active section has a class of handorgel__header--opened.`,
//           );
//         },
//       )
//       .saveScreenshot(
//         `screenshots/bolt-tabs/${testName}--${currentBrowser}.png`,
//       )
//       .end();
//   },
// };
