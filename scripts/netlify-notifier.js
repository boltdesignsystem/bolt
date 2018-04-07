#!/usr/bin/env node
const url = require('url');
const querystring = require('querystring');
const fetch = require("node-fetch");
const netlifyBase = 'https://api.netlify.com/api/v1';
const netlifySiteId = 'bolt-design-system.netlify.com';
const netlifyDeploysEndpoint = `${netlifyBase}/sites/${netlifySiteId}/deploys`;

const { NETLIFY_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG} = process.env;

if (!NETLIFY_TOKEN || !GITHUB_TOKEN || !TRAVIS_PULL_REQUEST || !TRAVIS_REPO_SLUG) {
  console.error('Need to have env var of NETLIFY_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG set');
  console.log(`TRAVIS_PULL_REQUEST: ${TRAVIS_PULL_REQUEST}`);
  console.log(`TRAVIS_REPO_SLUG: ${TRAVIS_REPO_SLUG}`);
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

    // The GitHub comment template - Can handle HTML
    const githubCommentText = `
:zap: PR built on Travis and deployed a Netlify preview here: 

${netlifyDeploys[0].deploy_ssl_url}

<details>

- Commit built: ${process.env.TRAVIS_COMMIT}
- [Travis build](https://travis-ci.org/${process.env.TRAVIS_REPO_SLUG}/builds/${process.env.TRAVIS_BUILD_ID})

</details>
`.trim();
    // end GitHub comment template

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
