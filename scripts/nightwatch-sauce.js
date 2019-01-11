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

    /** @type {boolean} */
    const passed = results.passed === results.tests - results.skipped;

    const text = `
- Results: ${results.passed} of ${results.tests} test cases passed
- Total Time: ${results.time} seconds
- Browser Name: ${capitalize(capabilities.browserName)}
- Browser Version: ${capabilities.version}
- Browser Platform: ${capitalize(capabilities.platform)}
- [View Test in Sauce Labs](https://saucelabs.com/beta/tests/${sessionId}/commands)
 
 ![image](https://assets.saucelabs.com/jobs/${sessionId}/0001screenshot.png)
 
 ---
 
<details open>
  <summary>Test Result Details</summary>
  ${Object.keys(results.testcases).map(testName => {
    return `
    
### Assertion: ${testName}

- Time: ${results.testcases[testName].time} seconds
- Assertions: ${results.testcases[testName].tests}
- Passed: ${results.testcases[testName].passed}
- Errors: ${results.testcases[testName].errors}
- Failed: ${results.testcases[testName].failed}
- Skipped: ${results.testcases[testName].skipped}

`;
  }).join()}
</details>

---

<details>
  <summary>Data</summary>
  
  \`\`\`json
   ${JSON.stringify({ currentTest, capabilities, sessionId }, null, '  ')}
  \`\`\`
  
  <!--<pre> <code class="highlight highlight-source-json"> </code> </pre>-->
  
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
        summary: `- Results: ${currentTest.results.passed} of ${
          currentTest.results.tests
        } tests passed`.trim(),
        text,
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
