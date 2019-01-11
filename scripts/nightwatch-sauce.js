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
  console.log({
    currentTest,
    capabilities,
    sessionId,
  });
  try {
    const passed =
      currentTest.results.passed ===
      currentTest.results.tests - currentTest.results.skipped;
    const {
      GITHUB_TOKEN,
      // if in Travis, then it's `"true"`
      TRAVIS,
      // for push builds, or builds not triggered by a pull request, this is the name of the branch.
      // for builds triggered by a pull request this is the name of the branch targeted by the pull request.
      // for builds triggered by a tag, this is the same as the name of the tag(TRAVIS_TAG).
      TRAVIS_BRANCH,
      // if the current job is a pull request, the name of the branch from which the PR originated
      // if the current job is a push build, this variable is empty("").
      TRAVIS_PULL_REQUEST_BRANCH,
      // The pull request number if the current job is a pull request, “false” if it’s not a pull request.
      TRAVIS_PULL_REQUEST,
      // The slug (in form: owner_name/repo_name) of the repository currently being built.
      TRAVIS_REPO_SLUG,
      // If the current build is for a git tag, this variable is set to the tag’s name
      TRAVIS_TAG,
    } = process.env;

    console.log({
      TRAVIS,
      TRAVIS_BRANCH,
      TRAVIS_PULL_REQUEST_BRANCH,
      TRAVIS_PULL_REQUEST,
      TRAVIS_REPO_SLUG,
      TRAVIS_TAG,
    });

    const text = `
- Results: ${currentTest.results.passed} of ${
      currentTest.results.tests
    } test cases passed
- Total Time: ${currentTest.results.time} seconds
- Browser Name: ${capitalize(capabilities.browserName)}
- Browser Version: ${capabilities.version}
- Browser Platform: ${capitalize(capabilities.platform)}
- [View Test in Sauce Labs](https://saucelabs.com/beta/tests/${sessionId}/commands)
 
 ![image](https://assets.saucelabs.com/jobs/${sessionId}/0001screenshot.png)
 
 ---
 
<details open>
  <summary>Test Result Details</summary>
  ${Object.keys(currentTest.results.testcases).map(testName => {
    return `
    
### Assertion: ${testName}

- Time: ${currentTest.results.testcases[testName].time} seconds
- Assertions: ${currentTest.results.testcases[testName].tests}
- Passed: ${currentTest.results.testcases[testName].passed}
- Errors: ${currentTest.results.testcases[testName].errors}
- Failed: ${currentTest.results.testcases[testName].failed}
- Skipped: ${currentTest.results.testcases[testName].skipped}

`;
  })}
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
    const name = [
      'NW',
      currentTest.name,
      capitalize(capabilities.browserName),
      capitalize(capabilities.platform),
    ].join(' - ');
    await setCheckRun({
      name,
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
    .then(results => {
      outputBanner('DONE: setGithubAppSauceResults');
      console.log(results);
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
