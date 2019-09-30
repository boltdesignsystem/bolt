const jwt = require('jsonwebtoken');
const execa = require('execa');
const fs = require('fs');
const { join } = require('path');
const fetch = require('node-fetch');
const { getGitSha } = require('ci-utils');

const installationId = '572023';
const repoSlug = 'bolt-design-system/bolt';
const privateKey = fs.readFileSync(
  join(__dirname, './bolt-design-system-bot.private-key.pem'),
  'utf8',
);

if (!privateKey) {
  console.error('Could not find private key PEM file');
  process.exit(1);
}

const jwtToken = jwt.sign(
  {
    iss: '23351',
  },
  privateKey,
  {
    algorithm: 'RS256',
    expiresIn: '10m',
  },
);

let accessToken;

/**
 * Get Date in format GitHub wants
 * @return {string} - current date like '2019-01-09T23:31:24.748Z'
 */
function getDate() {
  return new Date().toISOString();
}

const getHeaders = token => ({
  'Content-Type': 'application/json',
  Accept:
    'application/vnd.github.antiope-preview+json, application/vnd.github.machine-man-preview+json, application/vnd.github.v3+json',
  Authorization: `Bearer ${token}`,
});

/**
 * @return {Promise<string>}
 */
async function getAccessToken() {
  const response = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        ...getHeaders(jwtToken),
      },
    },
  ).catch(err => {
    console.error('error getting access token', err);
    process.exit(1);
  });

  const results = await response.json();
  if (!response.ok) {
    console.log(results);
    throw new Error(
      `Error getting access token: ${response.status} ${response.statusText}. ${
        results.message
      }`,
    );
  }

  accessToken = results.token;
  return results.token;
}

/**
 * Exec Shell Command and Report Results to GitHub Checks
 * @param {Object} opt
 * @param {string} opt.cmd - Shell command to execute from CWD
 * @param {string} opt.name - GitHub Checks Name
 * @return {Promise<boolean>} Did cmd fail?
 */
async function execAndReport({ cmd, name }) {
  try {
    const {
      failed,
      // code,
      // timedOut,
      stdout,
      stderr,
      // message,
    } = await execa.shell(cmd);
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    await setCheckRun({
      name,
      status: 'completed',
      conclusion: 'success',
      output: {
        title: name,
        summary: `Ran ${cmd}`,
      },
    });
    return failed;
  } catch (err) {
    const {
      failed,
      // code,
      // timedOut,
      stdout,
      stderr,
      message,
    } = err;
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    await setCheckRun({
      name,
      status: 'completed',
      conclusion: 'failure',
      output: {
        title: name,
        summary: `Ran ${cmd}`,
        text: `
<pre><code>
${message}
</code></pre>
        `.trim(),
      },
    });

    return failed;
  }
}

/**
 * @return {Promise<Object>}
 * @link https://developer.github.com/v3/checks/suites/#create-a-check-suite
 */
async function createCheckSuite() {
  const token = accessToken || (await getAccessToken());
  const response = await fetch(
    `https://api.github.com/repos/${repoSlug}/check-suites`,
    {
      method: 'POST',
      headers: {
        ...getHeaders(token),
      },
      body: JSON.stringify({
        head_sha: getGitSha(),
      }),
    },
  ).catch(err => {
    console.error('error creating check suite', err);
    process.exit(1);
  });

  const results = await response.json();
  if (!response.ok) {
    console.log(results);
    throw new Error(
      `Error creating check suite: ${response.status} ${response.statusText}. ${
        results.message
      }`,
    );
  }

  return results;
}

/**
 * @typedef {Object} GitHubCheckOutput
 * @prop {string} title
 * @prop {string} summary - supports Markdown
 * @prop {string} [text] - supports Markdown
 * @prop {Object[]} [annotations]
 * @prop {{ alt: string, image_url: string, caption: string }[]} [images] - Image Grid using absolute urls
 * @link https://developer.github.com/v3/checks/runs/#output-object
 */

/**
 * @param {Object} opt
 * @param {string} opt.name
 * @param {string} [opt.status='queued'] - One of queued, in_progress, or completed
 * @param {GitHubCheckOutput} [opt.output]
 * @param {string} [opt.conclusion] - The final conclusion of the check. Can be one of success, failure, neutral, cancelled, timed_out, or action_required. When the conclusion is action_required, additional details should be provided on the site specified by details_url.
 * @param {string} [opt.details_url]
 * @return {Promise<Object>}
 * @link https://developer.github.com/v3/checks/runs/#create-a-check-run
 */
async function setCheckRun({
  name,
  status = 'queued',
  output,
  conclusion,
  details_url,
}) {
  const token = accessToken || (await getAccessToken());
  const body = {
    name,
    status,
    output,
    head_sha: getGitSha(),
  };
  switch (status) {
    case 'in_progress':
      body.started_at = getDate();
      break;
    case 'completed':
      body.completed_at = getDate();
      body.conclusion = conclusion;
      break;
  }
  const response = await fetch(
    `https://api.github.com/repos/${repoSlug}/check-runs`,
    {
      method: 'POST',
      headers: {
        ...getHeaders(token),
      },
      body: JSON.stringify(body),
    },
  ).catch(err => {
    console.error('error setting check run ' + name + ' to ' + status, err);
    process.exit(1);
  });

  const results = await response.json();
  if (!response.ok) {
    console.log(results);
    throw new Error(
      `Error creating check run: ${response.status} ${response.statusText}. ${
        results.message
      }`,
    );
  }

  return results;
}

module.exports = {
  createCheckSuite,
  setCheckRun,
  execAndReport,
};
