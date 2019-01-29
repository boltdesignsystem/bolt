#!/usr/bin/env node
const { resolve } = require('path');

const { spawnSync } = require('child_process');
const { promisify } = require('util');
const shell = require('shelljs');
const gitSemverTags = require('git-semver-tags');
const { outputBanner } = require('ci-utils');
const { setCheckRun } = require('./check-run');
const { gitSha } = require('./utils');
const promisifyGitTags = promisify(gitSemverTags);

let {
  NOW_TOKEN,
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
  TRAVIS_BUILD_WEB_URL,
} = process.env;

const baseNowArgs = ['--platform-version=1', '--team=boltdesignsystem'];

if (NOW_TOKEN) baseNowArgs.push(`--token=${NOW_TOKEN}`);

let branchName = 'detached-HEAD';
try {
  branchName = spawnSync('git', ['symbolic-ref', 'HEAD'], {
    encoding: 'utf8',
  })
    .stdout.replace('refs/heads/', '')
    .replace(/\//g, '-')
    .trim();
} catch (error) {
  process.exit(1);
}

async function handleNowDeploy(deployOutput) {
  console.log(deployOutput);
  const deployedUrl = deployOutput.trim();
  const deployedId = deployedUrl
    .replace('https://', '')
    .replace('boltdesignsystem-', '')
    .replace('.now.sh', '');

  console.log('Aliasing to branch/tag name...');
  // Making sure branch name is ok to be in URL
  const branchUrlPart = branchName
    .replace(/\//g, '-') // `/` => `-`
    .replace('--', '-') // `--` => `-` now.sh subdomains can't have `--` for some reason
    .replace(/\./g, '-'); // `.` => `-`
  const aliasedUrlSubdomain = `${encodeURIComponent(
    branchUrlPart,
  )}.boltdesignsystem`;

  const aliasedUrl = `https://${aliasedUrlSubdomain}.com`;
  const aliasOutput = spawnSync(
    'now',
    ['alias', deployedUrl, aliasedUrl, ...baseNowArgs],
    { encoding: 'utf8' },
  );
  if (aliasOutput.status !== 0) {
    console.error('Error aliasing:');
    console.log(aliasOutput.stdout, aliasOutput.stderr);

    if (setCheckRun) {
      await setCheckRun({
        status: 'completed',
        name: 'Deploy - now.sh',
        conclusion: 'failure',
        output: {
          title: 'Now.sh Deploy failure',
          summary: `
${aliasOutput.stdout}
${aliasOutput.stderr}
          `.trim(),
        },
      });
    }
    process.exit(1);
  }
  console.log(aliasOutput.stdout, aliasOutput.stderr);

  if (setCheckRun) {
    await setCheckRun({
      status: 'completed',
      name: 'Deploy - now.sh',
      conclusion: 'success',
      output: {
        title: 'Now.sh Deploy',
        summary: `
  - ${deployedUrl}
  - ${aliasedUrl}
        `.trim(),
      },
    });
  }

  // if this is a tagged full release, then it should become the main site. we aliased above so we have a tagged version out as well i.e. `v1-2-3-boltdesignsystem.com`
  if (TRAVIS_TAG && TRAVIS_TAG === latestTag && !latestTag.includes('rc')) {
    console.log('Is tag build, aliasing to main site.');
    const aliasOutput2 = spawnSync(
      'now',
      ['alias', deployedUrl, 'boltdesignsystem.com', ...baseNowArgs],
      { encoding: 'utf8' },
    );
    if (aliasOutput2.status !== 0) {
      // @todo setCheckRun
      console.error('Error aliasing:');
      console.log(aliasOutput2.stdout, aliasOutput2.stderr);
      process.exit(1);
    }
    // @todo setCheckRun
    console.log(aliasOutput2.stdout, aliasOutput2.stderr);

    console.log('aliasing www.boltdesignsystem.com to main site too.');
    const aliasOutput3 = spawnSync(
      'now',
      ['alias', deployedUrl, 'www.boltdesignsystem.com', ...baseNowArgs],
      { encoding: 'utf8' },
    );
    if (aliasOutput3.status !== 0) {
      // @todo setCheckRun
      console.error('Error aliasing:');
      console.log(aliasOutput3.stdout, aliasOutput3.stderr);
      process.exit(1);
    }
    // @todo setCheckRun
    console.log(aliasOutput3.stdout, aliasOutput3.stderr);
  } else if (TRAVIS_TAG && TRAVIS_TAG !== latestTag) {
    // @todo setCheckRun
    console.error(
      `Error aliasing: Travis Tag of ${TRAVIS_TAG} doesn't match the latest tag of ${latestTag}`,
    );
    process.exit(1);
  } else {
    console.log("Skipping now.sh tag alias since this isn't a tagged version.");
  }
}

async function init() {
  try {
    const tags = await promisifyGitTags();
    const latestTag = tags[0];

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

    if (TRAVIS === 'true') {
      if (TRAVIS_PULL_REQUEST === 'false') {
        branchName = TRAVIS_BRANCH;
      } else {
        branchName = TRAVIS_PULL_REQUEST_BRANCH;
      }
    }

    console.log(`Branch Name: ${branchName}`);

    if (GITHUB_TOKEN) {
      await setCheckRun({
        name: 'Deploy - now.sh',
        status: 'in_progress',
      });
      outputBanner('Starting deploy...');
    }

    try {
      const child = shell.exec(`now deploy --meta gitSha="${gitSha}" --env GIT_SHA=${gitSha} --build-env GIT_SHA=${gitSha} --platform-version=1 --team=boltdesignsystem --token=${NOW_TOKEN}`).stdout;

      await handleNowDeploy(child);
    } catch (error) {
      console.error('Error deploying:');
      console.log(error.stdout, error.stderr);

      if (GITHUB_TOKEN) {
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
      }
      process.exit(1);
    }
  } catch (error) {
    console.log('Error');
    console.error(error);
    process.exit(1);
  }
}

init();
