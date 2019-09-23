const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const semver = require('semver');
const CFonts = require('cfonts');
const { branchName } = require('@bolt/scripts/utils/branch-name');
const { TRAVIS, TRAVIS_TAG } = require('@bolt/scripts/utils/travis-vars');
const { getLatestDeploy } = require('@bolt/scripts/utils');
const { gitSha } = require('@bolt/scripts/utils');
const msg = require('bit-message-box');
const clear = require('clear');
const ora = require('ora');

const {
  nextReleaseType,
  nextReleaseVersion,
  buildBeforeDeploying,
  normalizedUrlString,

  bumpPhpDependencies,
  testMonorepo,
  deployWebsite,
  clearCache,
  getCanaryVersion,
} = require('./release-utils');
const urlFriendlyVersion = normalizedUrlString(nextReleaseVersion);
const canaryReleaseVersion = getCanaryVersion();

const { IncomingWebhook } = require('@slack/webhook');
const { runAllChecks } = require('./release-checks');

const isPr = process.env.TRAVIS_PULL_REQUEST || false;
const baseBranch =
  JSON.parse(fs.readFileSync('./.autorc', 'utf-8')).baseBranch || 'master';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

CFonts.say('Bolt Design System', {
  font: 'simple', // define the font face
  align: 'left', // define text alignment
  colors: ['#ABB3F2', '#545DA6'], // define all colors
  background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
});

const aliasUrls = [
  'boltdesignsystem.com',
  'www.boltdesignsystem.com',
  'bolt-design-system.com',
  'www.bolt-design-system.com',
  `v${urlFriendlyVersion}.boltdesignsystem.com`,
];

async function canaryRelease() {
  try {
    await runAllChecks();
    await testMonorepo();

    //   await bumpPhpDependencies(nextReleaseVersion);

    await shell.exec(
      `lerna publish --dist-tag canary --no-git-tag-version --no-push --yes ${canaryReleaseVersion} -m "[skip travis] chore(release): pre-release %s"`,
    );

    // reset updated CHANGELOG.md + package.json files
    await shell.exec(`
      git reset --hard
      git clean -f
    `);

    // clear .inache file + rebuild website
    await clearCache();
    await buildBeforeDeploying();

    const deployUrl = await deployWebsite();

    await shell.exec(`
      now alias ${deployUrl} canary.boltdesignsystem.com
      now alias ${deployUrl} ${normalizedUrlString(
      canaryReleaseVersion,
    )}.boltdesignsystem.com
    `);
    // await shell.exec(`git add docs-site/.incache`);
    // await shell.exec(
    //   `git commit -m "[skip travis] chore(release): publish v${canaryReleaseVersion}`,
    // );
    // await shell.exec(`git push --no-verify`);

    if (SLACK_WEBHOOK_URL) {
      const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);
      await webhook.send({
        text: `Bolt canary release, *v${canaryReleaseVersion}*, has successfully published!
          - <https://canary.boltdesignsystem.com|Shared Canary URL>
          - <https://${normalizedUrlString(
            canaryReleaseVersion,
          )}.boltdesignsystem.com|Unique Canary URL>`,
      });
    } else {
      console.log(
        chalk.yellow(
          'Skipped sending Slack notification -- missing `SLACK_WEBHOOK_URL` env variable!',
        ),
      );
    }

    console.log(chalk.green('Finished publishing canary release!\n'));

    // now alias newDeployUrl boltdesignsystem.com
    // now alias newDeployUrl www.boltdesignsystem.com
    // now alias newDeployUrl bolt-design-system.com
    // now alias newDeployUrl www.bolt-design-system.com
    // now alias newDeployUrl release-2-x.boltdesignsystem.com
    // now alias newDeployUrl v2-5-5.boltdesignsystem.com
    // if (branchName === 'release/2.x') {
    //   console.log(chalk.blue('Step 3. Bump PHP Dependencies'));
    //   await bumpPhpDependencies(nextReleaseVersion);
    //   console.log(chalk.green('OK: Updated PHP Dependencies to new version.\n'));
    // } else {
    // }

    // now alias boltdesignsystem.com v${urlFriendlyVersion}.boltdesignsystem.com
  } catch (error) {
    console.log(chalk.red(`ERROR: the pre-release checks failed! ${error}`));
  }
}

canaryRelease();

//   shell.exec(`lerna publish ${nextReleaseVersion} `).stdout;

// # add updated .incache to Git
// git add .
// git commit -m "[skip travis] chore(release): publish v${newVersion}"

// git tag -fa v${newVersion} -m v${newVersion}
// git push --no-verify
// git push origin v${newVersion} --no-verify --force

// now alias newDeployUrl boltdesignsystem.com
// now alias newDeployUrl www.boltdesignsystem.com
// now alias newDeployUrl bolt-design-system.com
// now alias newDeployUrl www.bolt-design-system.com
// now alias newDeployUrl release-2-x.boltdesignsystem.com
// now alias newDeployUrl v2-5-5.boltdesignsystem.com

// git checkout master
// git pull
// git merge release/2.x
// git commit
// git push

// const newReleaseType = shell.exec(‘npm run version’); // minor, patch, etc

// const currentVersion = JSON.parse(require(‘lerna.json’)).version;

// const nextVersion = `${semver.inc(currentVersion, newReleaseType)`}; // v2.9.0

// npx json -I -f docs-site/.incache -e 'this["bolt-tags"].expiresOn = "2019-06-14T12:30:26.377Z"'
// npx json -I -f docs-site/.incache -e 'this["bolt-urls-to-test"].expiresOn = "2019-06-14T12:30:26.377Z"'

// npm run build
// npm run deploy

// const nowUrl = getLatestDeployUrl();

// if (branch === ‘release/2.x’){
//   aliasNowUrl();

//   git add .
//   git commit -m "chore(release): publish v2.5.5"

//   git tag -fa v2.5.5 -m v2.5.5
//   git push --no-verify
//   git push origin v2.5.5 --no-verify --force
// }

// now alias newDeployUrl boltdesignsystem.com
// now alias newDeployUrl www.boltdesignsystem.com
// now alias newDeployUrl bolt-design-system.com
// now alias newDeployUrl www.bolt-design-system.com
// now alias newDeployUrl release-2-x.boltdesignsystem.com
// now alias newDeployUrl v2-5-5.boltdesignsystem.com

// git checkout master
// git pull
// git merge release/2.x
// git commit
// git push
