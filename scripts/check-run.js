const jwt = require('jsonwebtoken');
const fs = require('fs');
const { join } = require('path');
const fetch = require('node-fetch');
const { getGitSha } = require('ci-utils');

const installationId = '572023';
const repoSlug = 'boltdesignsystem/bolt';
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
    iss: installationId,
  },
  privateKey,
  {
    algorithm: 'RS256',
    expiresIn: '10m',
  },
);

const getHeaders = token => ({
  'Content-Type': 'application/json',
  Accept:
    'application/vnd.github.antiope-preview+json, application/vnd.github.machine-man-preview+json, application/vnd.github.v3+json',
  Authorization: `Bearer ${token}`,
});

/**
 * @return {Promise<{token: string, expires_at: string}>}
 */
async function getAccessToken() {
  try {
    return fetch(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {
        method: 'POST',
        headers: {
          ...getHeaders(jwtToken),
        },
      },
    ).then(res => res.json());
  } catch (err) {
    console.error('error getting access token ', err);
    process.exit(1);
  }
}

/**
 * @param name
 * @param status
 * @param output
 * @return {Promise<Object>}
 * @link https://developer.github.com/v3/checks/runs/#create-a-check-run
 */
async function createCheckRun({ name, status, output }) {
  try {
    const token = await getAccessToken();
    return fetch(`https://api.github.com/repos/${repoSlug}/check-runs`, {
      method: 'POST',
      headers: {
        ...getHeaders(token),
      },
      body: JSON.stringify({
        name,
        status,
        output,
        head_sha: getGitSha(),
      }),
    }).then(res => res.json());
  } catch (err) {
    console.error('error setting check run ' + name + ' to ' + status, err);
    process.exit(1);
  }
}

module.exports = {
  createCheckRun,
};
