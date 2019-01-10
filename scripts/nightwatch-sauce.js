/* eslint no-console:0 */

// Tell Sauce Labs about Nightwatch fails

const https = require('https');
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


async function sendTravisTestInfo(capabilities, testId) {
  outputBanner('sendTravisTestInfo ran with these "capabilities":');
  console.log(capabilities);
  try {
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

    const summary = `
<h3>:zap: Sauce Labs Test for ${capabilities.browserName} Passed!</h3>
<a href="https://assets.saucelabs.com/jobs/${testId}/0001screenshot.png" target="_blank">
<img align="right" width="50%" src="https://assets.saucelabs.com/jobs/${testId}/0001screenshot.png" alt="Image of ${capabilities.browserName} test"></a>
    `.trim();

    const details = `
<details open>
  <summary>Test Details</summary>
  <ul>
    <li>Browser Name: ${capitalize(capabilities.browserName)}</li>
    <li>Browser Version: ${capabilities.version}</li>
    <li>Browser Platform: ${capitalize(capabilities.platform)}</li>
    <li><a href="https://saucelabs.com/beta/tests/${testId}/commands" target="_blank">View Test in Sauce Labs</a></li>
  </ul>
</details>
    `.trim();

    const results = await setCheckRun({
      name: 'Nightwatch',
      status: passed ? 'success' : 'failure',
      conclusion: passed ? 'success' : 'failure',
      output: {
        title: `Nightwatch ${passed ? 'Success' : 'Failed'}`,
        summary,
        details,
      },
    });

    outputBanner('setCheckRun results');
    console.log(results);
    outputBanner('DONE: sendTravisTestInfo');
  } catch (error) {
    console.log('Error');
    console.error(error);
    process.exit(1);
  }
}


module.exports = function sauce(client, callback) {
  const currentTest = client.currentTest;
  const username = client.options.username;
  const sessionId = client.capabilities['webdriver.remote.sessionid'];
  const accessKey = client.options.accessKey;

  if (!client.launch_url.match(/saucelabs/)) {
    console.log('Not saucelabs ...');
    return callback();
  }

  if (!username || !accessKey || !sessionId) {
    console.log('No username, accessKey or sessionId');
    return callback();
  }

  const passed = currentTest.results.passed === currentTest.results.tests;

  const data = JSON.stringify({
    passed,
  });

  const requestPath = `/rest/v1/${username}/jobs/${sessionId}`;

  sendTravisTestInfo(client.capabilities, sessionId);

  function responseCallback(res) {
    res.setEncoding('utf8');
    console.log('Response: ', res.statusCode, JSON.stringify(res.headers));
    res.on('data', function onData(chunk) {
      console.log('BODY: ' + chunk);
    });
    res.on('end', function onEnd() {
      console.info('Finished updating saucelabs');
      callback();
    });
  }

  try {
    console.log('Updating saucelabs', requestPath);

    const req = https.request({
      hostname: 'saucelabs.com',
      path: requestPath,
      method: 'PUT',
      auth: `${username}:${accessKey}`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }, responseCallback);

    req.on('error', function onError(e) {
      console.log('problem with request: ' + e.message);
    });
    req.write(data);
    req.end();
  } catch (error) {
    console.log('Error', error);
    callback();
  }
};
