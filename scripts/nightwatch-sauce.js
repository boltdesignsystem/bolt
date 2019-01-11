/* eslint no-console:0 */

// Tell Sauce Labs about Nightwatch fails

const { outputBanner } = require('ci-utils');
const { setCheckRun } = require('./check-run');

/**
 * Util for capitalization
 * @param string
 * @return {string}
 */
function capitalize(string) {
  return string && string[0].toUpperCase() + string.slice(1);
}

/**
 * @param {Object} opt
 * @param {Object} opt.currentTest - Meta data of current tests
 * @param {Object} opt.capabilities - Browser/Client capabilities and settings
 * @param {string} opt.sessionId - Testing Session Id in SauceLabs
 * @return {Promise<void>}
 */
async function setGithubAppSauceResults({
  currentTest,
  capabilities,
  sessionId,
}) {
  outputBanner('setGithubAppSauceResults running..');
  // console.log({
  //   currentTest,
  //   capabilities,
  //   sessionId,
  // });
  try {
    const {
      /** @type {string} - Name of test */
      name,
      /** @type {string} - Name of test file, ie `__tests__/bolt-video.e2e` */
      module: testFileName,
      /** @type {string} */
      group,
      /** @type {{ time: string, assertions: array, passed: number, errors: number, failed: number, skipped: number, tests: number, steps: array, timeMs: number}} */
      results,
    } = currentTest;

    const { SAUCE_USERNAME, SAUCE_ACCESS_KEY } = process.env;
    const auth = Buffer.from(`${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}`).toString(
      'base64',
    );

    const assetBaseUrl = `https://assets.saucelabs.com/jobs/${sessionId}`;

    // just the file names, not absolute paths
    const assetNames = await fetch(
      // https://wiki.saucelabs.com/display/DOCS/Job+Methods
      `https://saucelabs.com/rest/v1/${SAUCE_USERNAME}/jobs/${sessionId}/assets`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
        },
      },
    ).then(res => res.json());

    /** @type {{ 'sauce-log': string, 'video': string, 'selenium-log': string, screenshots: string[], 'video.mp4': string  }} */
    const assets = {};
    Object.keys(assetNames).forEach(key => {
      const value = assetNames[key];
      if (key === 'screenshots') {
        assets[key] = value.map(v => `${assetBaseUrl}/${v}`);
      } else {
        assets[key] = `${assetBaseUrl}/${value}`;
      }
    });

    /** @type {boolean} */
    const passed = results.passed === results.tests - results.skipped;

    const text = ` 
<details open>
  <summary>Test Result Details</summary>
  ${Object.keys(results.testcases)
    .map(testName => {
      return `
    
### Assertion: ${testName}

- Time: ${results.testcases[testName].time} seconds
- Assertions: ${results.testcases[testName].tests}
- Passed: ${results.testcases[testName].passed}
- Errors: ${results.testcases[testName].errors}
- Failed: ${results.testcases[testName].failed}
- Skipped: ${results.testcases[testName].skipped}

`;
    })
    .join()}
</details>

---

<details>
  <summary>Data</summary>

\`\`\`json
${JSON.stringify({ currentTest, capabilities, sessionId }, null, '  ')}
\`\`\`
  
</details>  
    `.trim();
    const checkRunName = [
      'NW',
      name,
      capitalize(capabilities.browserName),
      capitalize(capabilities.platform),
    ].join(' - ');
    await setCheckRun({
      name: checkRunName,
      status: 'completed',
      conclusion: passed ? 'success' : 'failure',
      output: {
        title: `Nightwatch ${passed ? 'Success' : 'Failed'}`,
        summary: `
- Results: ${results.passed} of ${results.tests} test cases passed
- Total Time: ${results.time} seconds
- Browser Name: ${capitalize(capabilities.browserName)}
- Browser Version: ${capabilities.version}
- Browser Platform: ${capitalize(capabilities.platform)}
- [View Test in Sauce Labs](https://saucelabs.com/beta/tests/${sessionId}/commands)
- [Video](${assets.video})
- [sauce-log](${assets['sauce-log']})
- [selenium-log](${assets['selenium-log']})
        `.trim(),
        text,
        images: assets.screenshots.map((screenshot, i) => ({
          image_url: screenshot,
          alt: `Screenshot ${i}`,
          caption: assetNames.screenshot[i],
        })),
      },
    });
  } catch (error) {
    console.log('Error');
    console.error(error);
    process.exit(1);
  }
}

/**
 * @param {Object} client - Nightwatch instance @todo add link to API docs
 * @param {function} callback
 * @returns {void}
 */
function handleNightwatchResults(client, callback) {
  const currentTest = client.currentTest;
  const sessionId = client.capabilities['webdriver.remote.sessionid'];
  const { username, accessKey } = client.options;

  if (!client.launch_url.match(/saucelabs/)) {
    console.log('Not saucelabs ...');
    return callback();
  }

  if (!username || !accessKey || !sessionId) {
    console.log('No username, accessKey or sessionId');
    return callback();
  }

  setGithubAppSauceResults({
    currentTest,
    capabilities: client.capabilities,
    sessionId,
  })
    .then(() => {
      outputBanner('DONE: setGithubAppSauceResults');
      callback();
    })
    .catch(err => {
      console.log('Error setGithubAppSauceResults:', err);
      callback();
    });
}

module.exports = {
  handleNightwatchResults,
};
