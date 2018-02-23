#!/usr/bin/env node
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const fetch = require("node-fetch");
const netlifyBase = 'https://api.netlify.com/api/v1';
const netlifySiteId = 'sandbox-netlify.netlify.com';
const netlifyDeploysEndpoint = `${netlifyBase}/sites/${netlifySiteId}/deploys`;

const { NETLIFY_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG} = process.env;

if (!NETLIFY_TOKEN || !GITHUB_TOKEN || !TRAVIS_PULL_REQUEST || !TRAVIS_REPO_SLUG) {
  console.log('Need to have env var of NETLIFY_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG set');
  process.exit(1);
}

if (TRAVIS_PULL_REQUEST == 'false') {
  console.log('Not a PR build, so this is not needed.');
  process.exit(0);
}

async function init() {
  try {
    const netlifyEndpoint = url.resolve(netlifyDeploysEndpoint, `?${querystring.stringify({ access_token: NETLIFY_TOKEN, })}`);
    const netlifyDeploys = await fetch(netlifyEndpoint).then(res => res.json());
    if (!netlifyDeploys) {
      console.error('Did not get any info on latest Netlify deploys...');
      process.exit(1);
    }
    console.log('Latest Netlify Deploy: ', netlifyDeploys[0]);

    // Can handle HTML
    const githubCommentText = `Netlify build preview available at: ${netlifyDeploys[0].deploy_ssl_url}`;
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
    // @todo Errors should be passed to `catch`
  } catch (error) {
    console.log('Error');
    console.error(error);
  }
}

init();
