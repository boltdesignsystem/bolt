#!/usr/bin/env node
const url = require('url');
const querystring = require('querystring');
const fetch = require('node-fetch');
const {spawnSync} = require('child_process');

async function init() {
  try {
    const {
      NOW_TOKEN,
      GITHUB_TOKEN,
      TRAVIS,
      TRAVIS_BRANCH,
      TRAVIS_PULL_REQUEST_BRANCH,
      TRAVIS_PULL_REQUEST,
      TRAVIS_REPO_SLUG,
    } = process.env;

    let branchName = 'detached-HEAD';
    try {
      branchName = spawnSync('git', ['symbolic-ref', 'HEAD'], {
        encoding: 'utf8',
      }).stdout.replace('refs/heads/', '').replace(/\//g, '-').trim();
    } catch (error) {
    }

    if (TRAVIS == 'true') {
      if (TRAVIS_PULL_REQUEST == 'false') {
        branchName = TRAVIS_BRANCH;
      } else {
        branchName = TRAVIS_PULL_REQUEST_BRANCH;
      }
    }

    console.log(`Branch Name: ${branchName}`);

    const args = [
      'deploy',
      './www',
      '--name=bolt-design-system',
      '--team=boltdesignsystem',
      '--static',
    ];

    if (NOW_TOKEN) {
      args.push(`--token=${NOW_TOKEN}`);
    }

    console.log('Starting deploy...');
    const deployOutput = spawnSync('now', args, {encoding: 'utf8'});
    if (deployOutput.status !== 0) {
      console.error('Error deploying:');
    }
    console.log(deployOutput.stdout, deployOutput.stderr);
    const deployedUrl = deployOutput.stdout.trim();
    const deployedDomain = deployedUrl.replace('https://', '');

    if (!deployedUrl) {
      // @todo determine if this is even needed since we have `deployedUrl` from deploy command
      const nowEndpoint = url.resolve('https://api.zeit.co/v2/now/deployments', `?${querystring.stringify({
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
      console.log('Latest now Deploy:');
      console.log(latestDeploy);
    }

    // @todo get alias working
    // const aliasEndpoint = `https://api.zeit.co/v2/now/deployments/${deployedDomain}/aliases?${querystring.stringify({
    //   teamId: 'boltdesignsystem',
    // })}`;
    //
    // const aliasResponse = await fetch(aliasEndpoint, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     alias: `bolt-design-system--${branchName}.now.sh`,
    //   }),
    //   headers: {
    //     'Authorization': `Bearer ${NOW_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    // }).then(res => res.json());
    //
    // console.log('aliasResponse: ');
    // console.log(aliasResponse);

    if (TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST == 'false') {
      console.log('Not a Pull Request, so will not try to comment on PR.');
      process.exit(0);
    }

    // The GitHub comment template - Can handle HTML
    const githubCommentText = `
:zap: PR built on Travis and deployed a now preview here: 

${deployedUrl}

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
