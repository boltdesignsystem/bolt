const expect = require('expect-puppeteer');

const testPages = require('./analytics-pages');
const googleAnalyticsEt = require('./analytics-selectors');


const referenceUrl = 'https://www1.pega.com';
const testingUrl = 'https://demo4.d8.pega.com';

describe('Testing Google Analytics Selectors', function () {
  jest.setTimeout(50000);

  testPages.forEach((page) => {
    const pageName = page.name;
    const pageUrls = page.urls;

    pageUrls.forEach(async (url) => {

      googleAnalyticsEt.forEach(async (item) => {
        const selector = item.selector;
        const actionName = item.action;



        it(`${pageName} - Testing - ${actionName}`, async () => {
          const page = await browser.newPage();

          let referenceElementExists = false;
          let testElementExists = false;

          await page.goto(`${referenceUrl}${url}`);
          if (await page.$(selector) !== null) referenceElementExists = true;

          await page.goto(`${testingUrl}${url}`);
          if (await page.$(selector) !== null) testElementExists = true;

          if (referenceElementExists !== testElementExists){
            if (referenceElementExists === true && testElementExists === false){ // Reference OK - test fail
              throw Error(`❌ Error: The ${selector} analytics selector was NOT found on the testing url, ${testingUrl}${url}, but currently exists on the reference url, ${referenceUrl}${url}. Does the element selector need to be updated?`);
            } else if (testElementExists === true && referenceElementExists === false) { // Test OK - reference fail
              console.warn(`⚠️ Warning: the ${selector} analytics selector was NOT found on the reference url, ${referenceUrl}${url}, but WAS found on the testing url, ${testingUrl}${url}. Has this selector been updated to fix something in production?`);
            }
          }

          if (referenceElementExists === false && testElementExists === false) { // Test fail + reference fail
            console.warn(`️️⚠️ Warning: The ${selector} analytics selector not found on the reference URL, ${referenceUrl}${url}, or on the test url, ${testingUrl}${url}. Should this selector exist on this page?`);
          } else if (referenceElementExists === true && testElementExists === true) { // Test OK + reference OK
            console.info(`️️✅ Success! the ${selector} analytics selector WAS found on both the reference URL, ${referenceUrl}${url}, AND the test url, ${testingUrl}${url}!`);
          }

          page.close();
        });

      });
    });
  });
});
