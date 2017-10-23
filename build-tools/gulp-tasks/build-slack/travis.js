#! /usr/bin/env node

const github = require('octonode');
const normalizeUrl = require('normalize-url');
const spawn = require('cross-spawn');
const travisAfterAll = require('travis-after-all');
const urlRegex = require('url-regex');

const nowCli = require.resolve('now/bin/now');

if (!process.env.CI || !process.env.TRAVIS) {
  throw new Error('Could not detect Travis CI environment');
}

const githubToken = process.env.GH_TOKEN;
const nowToken = process.env.NOW_TOKEN;

if (!githubToken) {
  throw new Error('Missing required environment variable GH_TOKEN');
}

if (!nowToken) {
  throw new Error('Missing required environment variable NOW_TOKEN');
}

const client = github.client(githubToken);
const ghRepo = client.repo(process.env.TRAVIS_REPO_SLUG);

function noop() {}

function getUrl(content) {
  const urls = content.match(urlRegex()) || [];

  return urls.map(url => normalizeUrl(url.trim().replace(/\.+$/, '')))[0];
}

function deploy(context, sha) {
  ghRepo.status(sha, {
    context,
    state: 'pending',
    description: `Δ Now ${context} deployment pending`
  }, noop);

  const args = [
    '--token', nowToken,
    '--no-clipboard'
  ];
  const alias = context === 'production' && process.env.NOW_ALIAS;
  let stdout = '';

  if (alias) {
    args.push(...['--alias', alias]);
  }

  const child = spawn(nowCli, args);

  if (!alias) {
    child.stdout.on('data', data => stdout += data);
  }

  child.on('error', (err) => {
    console.error(err);
    ghRepo.status(sha, {
      context,
      state: 'error',
      description: `Δ Now ${context} deployment failed. See Travis logs for details.`
    }, noop);
  });

  child.on('close', () => {
    const target_url = alias || getUrl(stdout);

    ghRepo.status(sha, {
      context,
      target_url,
      state: 'success',
      description: `Δ Now ${context} deployment complete`
    }, noop);
  });
}

travisAfterAll((code, err) => {
  // Don't do anything if there was an error of if the build returned a failing code
  if (err || code) {
    return;
  }

  switch (process.env.TRAVIS_EVENT_TYPE) {
    case 'pull_request': return deploy('staging', process.env.TRAVIS_PULL_REQUEST_SHA);
    case 'push': return deploy('production', process.env.TRAVIS_COMMIT);
  }
});
