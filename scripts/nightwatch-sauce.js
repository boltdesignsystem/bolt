/* eslint no-console:0 */

// Tell Sauce Labs about Nightwatch fails

const https = require('https');
const url = require('url');
const querystring = require('querystring');
const fetch = require('node-fetch');
const {
  spawnSync
} = require('child_process');

async function sendTravisTestInfo(capabilities, testId) {
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

    const githubCommentText = `
## :zap: Sauce Labs Test for ${capabilities.browserName} Passed!:

![Image of ${capabilities.browserName}](https://assets.saucelabs.com/jobs/${testId}/0001screenshot.png | width=100)

<details>
  <summary>Test Details</summary>
  - Browser Name: ${capabilities.browserName}
  - Browser Version: ${capabilities.version}
  - Browser Platform: ${capabilities.platform}
  - Test Url: https://saucelabs.com/beta/tests/${testId}/commands
</details>
    `.trim();

    // `TRAVIS_PULL_REQUEST` is either `'false'` or a PR number like `'55'`. All strings.
    if (TRAVIS && TRAVIS_PULL_REQUEST != 'false') {
      console.log('This is a Pull Request build, so will not try to comment on PR.');

      const githubCommentEndpoint = `https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments`;

      const response = await fetch(githubCommentEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          body: githubCommentText,
        }),
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }).then(res => res.json());
      console.log(response);
      console.log('GitHub comment posted');
    } else {
      console.log('This is not a Pull Request build, so will not try to comment on PR.');
    }
  // @todo Errors should be passed to `catch`
  } catch (error) {
    console.log('Error');
    console.error(error);
  }
}


module.exports = function sauce(callback) {
  const currentTest = this.client.currentTest;
  const username = this.client.options.username;
  const sessionId = this.client.capabilities['webdriver.remote.sessionid'];
  const accessKey = this.client.options.accessKey;

  if (!this.client.launch_url.match(/saucelabs/)) {
    console.log('Not saucelabs ...');
    return callback();
  }

  if (!username || !accessKey || !sessionId) {
    console.log(this.client);
    console.log('No username, accessKey or sessionId');
    return callback();
  }

  const passed = currentTest.results.passed === currentTest.results.tests;

  const data = JSON.stringify({
    passed,
  });

  const requestPath = `/rest/v1/${username}/jobs/${sessionId}`;

  sendTravisTestInfo(this.client.capabilities, sessionId);

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
