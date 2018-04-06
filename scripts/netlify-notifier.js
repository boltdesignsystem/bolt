#!/usr/bin/env node
const url = require('url');
const querystring = require('querystring');
const fetch = require("node-fetch");
const nowBase = 'https://api.zeit.co';
// const nowSiteId = 'bolt-design-system.now.com';
// const nowDeploysEndpoint = `${nowBase}/sites/${nowSiteId}/deploys`;

const { NOW_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG } = process.env;

// if (!NOW_TOKEN || !GITHUB_TOKEN || !TRAVIS_PULL_REQUEST || !TRAVIS_REPO_SLUG) {
//   console.error('Need to have env var of NOW_TOKEN, GITHUB_TOKEN, TRAVIS_PULL_REQUEST, TRAVIS_REPO_SLUG set');
//   console.log(`TRAVIS_PULL_REQUEST: ${TRAVIS_PULL_REQUEST}`);
//   console.log(`TRAVIS_REPO_SLUG: ${TRAVIS_REPO_SLUG}`);
//   process.exit(1);
// }
//
// if (TRAVIS_PULL_REQUEST == 'false') {
//   console.log('Not a PR build, so this is not needed.');
//   process.exit(0);
// }

async function init() {
  try {
    const nowEndpoint = url.resolve(`${nowBase}/v2/now/deployments`, `?${querystring.stringify({ 
      teamId: 'boltdesignsystem',
    })}`);

    const nowDeploys = await fetch(nowEndpoint, {
      headers: {
        'Authorization': `Bearer ${NOW_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());

    if (!nowDeploys) {
      console.error('Did not get any info on latest now deploys...');
      process.exit(1);
    }

    nowDeploys.deployments.sort((a, b) => {
      return a.created - b.created;
    }).reverse();

    const latestDeploy = nowDeploys.deployments[0];
    // console.log(nowDeploys);
    console.log('Latest now Deploy: ', latestDeploy);

    const aliasEndpoint = `${nowBase}/v2/now/deployments/${latestDeploy.uid}/aliases?${querystring.stringify({
      teamId: 'boltdesignsystem',
    })}`;

    const aliasResponse = await fetch(aliasEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        alias: `${latestDeploy.name}.now.sh`,
      }),
      headers: {
        'Authorization': `Bearer ${NOW_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());

    console.log('aliasResponse: ', aliasResponse);

    // The GitHub comment template - Can handle HTML
    const githubCommentText = `
:zap: PR built on Travis and deployed a now preview here: 

https://${latestDeploy.url}

<details>

- Commit built: ${process.env.TRAVIS_COMMIT}
- [Travis build](https://travis-ci.org/${process.env.TRAVIS_REPO_SLUG}/builds/${process.env.TRAVIS_BUILD_ID})
- Branch link (WIP): https://${aliasResponse.alias}

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
