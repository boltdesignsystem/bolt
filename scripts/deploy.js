#!/usr/bin/env node
const shell = require('shelljs');
const { outputBanner } = require('ci-utils');
const { gitSha } = require('./utils');
const { setCheckRun } = require('./check-run');

const {
  TRAVIS,
  TRAVIS_PULL_REQUEST,
  TRAVIS_BRANCH,
  TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_REPO_SLUG,
  TRAVIS_TAG,
  TRAVIS_BUILD_WEB_URL,
} = require('./utils/travis-vars');

let { NOW_TOKEN, GITHUB_TOKEN } = process.env;

const baseNowArgs = ['--platform-version=1', '--team=boltdesignsystem'];

if (NOW_TOKEN) baseNowArgs.push(`--token=${NOW_TOKEN}`);

async function init() {
  try {
    // also made in `.travis.yml` during docker tag
    // const gitSha = getGitSha(true);
    // const gitShaLong = getGitSha();

    console.log({
      TRAVIS,
      TRAVIS_BRANCH,
      TRAVIS_PULL_REQUEST_BRANCH,
      TRAVIS_PULL_REQUEST,
      TRAVIS_REPO_SLUG,
      TRAVIS_TAG,
      TRAVIS_BUILD_WEB_URL,
      gitSha,
    });

    await setCheckRun({
      name: 'Deploy - now.sh',
      status: 'in_progress',
    });
    outputBanner('Starting deploy...');

    try {
      const deployedUrl = shell.exec(
        `now deploy --meta gitSha="${gitSha}" --env GIT_SHA=${gitSha} --build-env GIT_SHA=${gitSha} --platform-version=1 --team=boltdesignsystem --token=${NOW_TOKEN}`,
      ).stdout;

      let deployedUrlPretty = deployedUrl.trim();

      await setCheckRun({
        status: 'completed',
        name: 'Deploy - now.sh (basic)',
        conclusion: 'success',
        output: {
          title: 'Now.sh Basic Deploy',
          summary: `
    - ${deployedUrlPretty}
          `.trim(),
        },
      });

      // await handleNowDeploy(child);
    } catch (error) {
      console.error('Error deploying:');
      console.log(error.stdout, error.stderr);

      await setCheckRun({
        status: 'completed',
        name: 'Deploy - now.sh',
        conclusion: 'failure',
        output: {
          title: 'Now.sh Deploy failure',
          summary: `
${error.stdout}
${error.stderr}
          `.trim(),
        },
      });
      process.exit(1);
    }
  } catch (error) {
    console.log('Error');
    console.error(error);
    process.exit(1);
  }
}

init();
