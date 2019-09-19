const cp = require('child_process');
const path = require('path');
const { branchName } = require('@bolt/scripts/utils/branch-name');
const { TRAVIS, TRAVIS_TAG } = require('@bolt/scripts/utils/travis-vars');
const { gitSha } = require('@bolt/scripts/utils');
const repoRoot = path.join(__dirname, './');
const { existsSync } = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const shell = require('shelljs');
shell.config.silent = true;
const clear = require('clear');
const {
  normalizeUrlAlias,
} = require('@bolt/scripts/utils/normalize-url-alias');
const {
  nextReleaseType,
  nextReleaseVersion,
  buildBeforeDeploying,
} = require('./release-utils');

const fullConfigPath = path.join(repoRoot, 'www/build/data/config.bolt.json');
const twigNamespacesManifestPath = path.join(
  repoRoot,
  'www/build/data/twig-namespaces.bolt.json',
);
const pattenLabIndexPath = path.join(repoRoot, 'www/pattern-lab/index.html');
const {
  getBoltTags,
} = require('@bolt/build-tools/tasks/api-tasks/bolt-versions');

const onlyPublishOnTheseBranches = ['master', 'develop', 'next', 'release/2.x'];

async function checkTokens() {
  const spinner = await ora('Checking if the right tokens exist...');
  if (!process.env.NPM_TOKEN) {
    await spinner.fail('The `NPM_TOKEN` is needed in order to cut a release!');
    process.exit(1);
  } else {
    await spinner.succeed('OK: found `NPM_TOKEN` token.');
  }

  await spinner.start('Checking for a `NOW_TOKEN` token');
  if (!process.env.NOW_TOKEN) {
    await spinner.fail(
      'The `NOW_TOKEN` token is needed in order to cut a release!',
    );
    process.exit(1);
  } else {
    await spinner.succeed('OK: found `NOW_TOKEN` token.');
  }

  spinner.start('Checking for a `GH_TOKEN` token');
  if (!process.env.NOW_TOKEN) {
    await spinner.fail(
      'The `GH_TOKEN` token is needed in order to cut a release!',
    );
    process.exit(1);
  } else {
    await spinner.succeed(`OK: found \`GH_TOKEN\` token.`);
  }
}

async function runAllChecks() {
  return new Promise(async resolve => {
    const spinner = ora('Running pre-publish tests...');

    spinner.start('Checking if we need to do a full build....');
    if (!existsSync(pattenLabIndexPath)) {
      spinner.warn(
        `WARN: can't find ${pattenLabIndexPath}!. Running a full build before continuing...`,
      );
      await buildBeforeDeploying();
    } else if (!existsSync(twigNamespacesManifestPath)) {
      spinner.warn(
        `WARN: can't find ${twigNamespacesManifestPath}!. Running a full build before continuing...`,
      );
      await buildBeforeDeploying();
    } else if (!existsSync(fullConfigPath)) {
      spinner.warn(
        `WARN: can't find ${fullConfigPath}!. Running a full build before continuing...`,
      );
      await buildBeforeDeploying();
    } else {
      spinner.succeed(
        `OK: \`twig-namespaces.bolt.json\` and \`config.bolt.json\` files located so build skipped.`,
      );
    }

    await checkTokens();

    if (!TRAVIS) {
      spinner.warn(
        'SKIP: skipped check for the `TRAVIS_TAG` ENV check for local releases.',
      );
    } else if (TRAVIS && TRAVIS_TAG) {
      process.exit(0);
      spinner.fail(
        'FAIL: this is already a tagged release on Travis so skipping over doing another publish',
      );
    } else {
      spinner.succeed('OK: this is not a tagged release on Travis');
    }

    spinner.start('Restrict publishing to specific branches on Travis');
    if (!TRAVIS) {
      spinner.warn('SKIP: Skipped Travis branch check for local releases.');
    } else if (!onlyPublishOnTheseBranches.includes(branchName) && TRAVIS) {
      spinner.fail(
        'FAIL: We can only publish on the master, develop, next, and release/2.x branches while on Travis. NOTE: You can still manually publish canary releases locally.',
      );
      process.exit(0);
    } else {
      spinner.succeed(
        'OK: Confirm we are only publishing on the `master`, `develop`, `next`, or `release/2.x` branches.',
      );
    }

    spinner.start('Confirming what type of release is being published...');
    if (nextReleaseVersion === null) {
      spinner.fail(
        `Unexpected received ${nextReleaseVersion} as the version to publish to!`,
      );
      process.exit(0);
    } else {
      spinner.succeed(`OK: this next release will be ${nextReleaseVersion}.`);
    }

    spinner.start(
      'Confirming the release about to cut does not already exist...',
    );

    const allBoltTags = [];
    let tags = await getBoltTags();
    cp.execFileSync('rm', ['.incache'], { stdio: 'inherit' });

    for (let tag of tags) {
      allBoltTags.push(tag.name);
    }
    if (allBoltTags.includes(`v${nextReleaseVersion}`)) {
      spinner.fail(`The v${nextReleaseVersion} tag already exists!!`);
      process.exit(1);
    } else {
      spinner.succeed(
        `OK: confirmed that the \`v${nextReleaseVersion}\` tag doesn't already exist.`,
      );
    }

    await resolve();
  });
}

module.exports = {
  runAllChecks,
};
