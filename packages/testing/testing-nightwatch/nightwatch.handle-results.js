const { getGitSha } = require('ci-utils');
const fetch = require('node-fetch');
const https = require('https');

const gitSha = getGitSha(true);
const gitShaLong = getGitSha();

const {
  SAUCE_USERNAME,
  SAUCE_ACCESS_KEY,
  // for push builds, or builds not triggered by a pull request, this is the name of the branch.
  // for builds triggered by a pull request this is the name of the branch targeted by the pull request.
  // for builds triggered by a tag, this is the same as the name of the tag(TRAVIS_TAG).
  TRAVIS_BRANCH,
  // if the current job is a pull request, the name of the branch from which the PR originated
  // if the current job is a push build, this variable is empty("").
  TRAVIS_PULL_REQUEST_BRANCH,
  // The pull request number if the current job is a pull request, "false" if it’s not a pull request.
  TRAVIS_PULL_REQUEST,
  // The slug (in form: owner_name/repo_name) of the repository currently being built.
  TRAVIS_REPO_SLUG,
  // If the current build is for a git tag, this variable is set to the tag’s name
  TRAVIS_TAG,
  TRAVIS_BUILD_WEB_URL,
  TRAVIS_JOB_NUMBER,
} = process.env;

const auth = Buffer.from(`${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}`).toString(
  'base64',
);

/**
 * @param {Object} client - Nightwatch instance @todo add link to API docs
 * @param {function} callback
 * @returns {void}
 */

async function handleNightwatchResults(client, callback) {
  const currentTest = client.currentTest;
  const sessionId = client.capabilities['webdriver.remote.sessionid'];
  const { username, accessKey } = client.options;
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

  if (!client.launch_url.match(/saucelabs/)) {
    console.log('Not saucelabs ...');
    process.exit(1);
  }

  if (!username || !accessKey || !sessionId) {
    console.log('No username, accessKey or sessionId');
    console.log(username);
    console.log(accessKey);
    console.log(sessionId);
    process.exit(1);
  }

  const passed = results.passed === results.tests - results.skipped;
  console.log(`Passed: ${passed ? 'Yes' : 'No'} - ${name}`);

  try {
    const res = await fetch(
      // https://wiki.saucelabs.com/display/DOCS/Job+Methods
      `https://saucelabs.com/rest/v1/${SAUCE_USERNAME}/jobs/${sessionId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passed,
          build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
          tags: ['CI'],
          'custom-data': {
            TRAVIS_JOB_NUMBER,
            TRAVIS_BRANCH,
            TRAVIS_PULL_REQUEST_BRANCH,
            TRAVIS_PULL_REQUEST,
            TRAVIS_REPO_SLUG,
            TRAVIS_TAG,
            TRAVIS_BUILD_WEB_URL,
            gitSha,
            gitShaLong,
          },
        }),
      },
    );

    if (res.ok) {
      // console.log(`Set SauceLabs details ok`);
    } else {
      console.log(`Setting SauceLabs details not ok`);
      throw new Error(`Set SauceLabs details not ok ${res.statusText}`);
    }

    const data = JSON.stringify({
      passed,
    });

    const requestPath = `/rest/v1/${username}/jobs/${sessionId}`;

    try {
      // console.log('Updating Saucelabs', requestPath);

      const req = https.request(
        {
          hostname: 'saucelabs.com',
          path: requestPath,
          method: 'PUT',
          auth: `${username}:${accessKey}`,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        },
        function(res) {
          let results;
          res.setEncoding('utf8');

          if (res.statusCode !== 200) {
            console.log('Failed to updating Saucelabs', requestPath);
            console.log(
              'Response: ',
              res.statusCode,
              JSON.stringify(res.headers),
            );
          }
          res.on('data', function onData(chunk) {
            // console.log('BODY: ' + chunk);
            results = chunk;
          });
          res.on('end', function onEnd() {
            console.info('Finished updating Saucelabs');
            callback(results);
          });
        },
      );

      req.on('error', function onError(e) {
        console.log('problem with request: ' + e.message);
      });
      req.write(data);
      req.end();
    } catch (error) {
      console.log('Error', error);
      callback(error);
    }
  } catch (err) {
    console.log(`Error setting SauceLabs details`, err);
    process.exit(1);
  }
}

module.exports = {
  handleNightwatchResults,
};
