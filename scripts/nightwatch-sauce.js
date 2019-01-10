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

// eslint-ignore
const bodyExample = {
  'browser_short_version': '11',
  'video_url': 'https://assets.saucelabs.com/jobs/54b93a335aa94b23b8411d6cbdc8a00b/video.mp4',
  'creation_time': 1547091312,
  'custom-data': null,
  'browser_version': '11.285.17134.0.',
  'owner': '[secure]',
  'id': '54b93a335aa94b23b8411d6cbdc8a00b',
  'record_screenshots': true,
  'record_video': true,
  'build': null,
  'passed': true,
  'public': 'public',
  'assigned_tunnel_id': null,
  'status': 'in progress',
  'log_url': 'https://assets.saucelabs.com/jobs/54b93a335aa94b23b8411d6cbdc8a00b/selenium-server.log',
  'start_time': 1547091312,
  'proxied': false,
  'modification_time': 1547091328,
  'tags': [],
  'name': 'E2e/Pattern Lab E2e',
  'commands_not_successful': 0,
  'video_secret': 'f9e39a9e373e4afc8eb71fc07f23966a',
  'consolidated_status': 'passed',
  'end_time': null,
  'error': null,
  'os': 'Windows 10',
  'breakpointed': null,
  'browser': 'iexplore',
};

/**
 * @param {Object} capabilities
 * @param {string} testId
 * @param {Object} data - data sent to Sauce Labs
 * @param {Object} body - data sent back from Sauce Labs (see `bodyExample`)
 * @return {Promise<void>}
 */
async function sendTravisTestInfo(capabilities, testId, data, body) {
  outputBanner('sendTravisTestInfo running..');
  console.log({
    capabilities,
    testId,
    data,
    body,
  });
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
- Browser Name: ${capitalize(capabilities.browserName)}
- Browser Version: ${capabilities.version}
- Browser Platform: ${capitalize(capabilities.platform)}
- [View Test in Sauce Labs](https://saucelabs.com/beta/tests/${testId}/commands)
    `.trim();

    const details = `
<details>
  <summary>Data</summary>

\`\`\`json
${JSON.stringify({ body, data, capabilities, testId }, null, '  ')}
\`\`\`

</details>

- log_url: ${body.log_url}
-     

`.trim();

    const results = await setCheckRun({
      name: `Nightwatch - ${testId}`,
      status: passed ? 'success' : 'failure',
      conclusion: passed ? 'success' : 'failure',
      output: {
        title: `Nightwatch ${passed ? 'Success' : 'Failed'}`,
        summary,
        details,
        images: [
          {
            alt: `Image of ${capabilities.browserName} test`,
            image_url: `https://assets.saucelabs.com/jobs/${testId}/0001screenshot.png`,
            caption: `${capabilities.browserName} Passed!`,
          },
        ],
      },
    });

    outputBanner('setCheckRun results');
    console.log(results);
    outputBanner('DONE: sendTravisTestInfo');
    return results;
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


  function responseCallback(res) {
    res.setEncoding('utf8');
    console.log('Response: ', res.statusCode, JSON.stringify(res.headers));
    let bodies = [];
    res.on('data', function onData(chunk) {
      console.log('BODY: ' + chunk);
      bodies.push(chunk);
    });
    res.on('end', function onEnd() {
      const body = JSON.parse(bodies.join());
      console.info('Finished updating saucelabs', body);
      sendTravisTestInfo(
        client.capabilities,
        sessionId,
        data,
        body
      ).then(results => callback());
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
