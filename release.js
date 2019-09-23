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

// const isPreRelease = branchName !== 'master';

async function init() {
  /* eslint-disable prettier/prettier */
  msg.info(
    `
    ${chalk.gray(`Gathering info needed to do a release...`)}

    BRANCH INFO:
      ${chalk.gray(`- Current branch name:`)} ${chalk.white.bold(branchName)}
      ${chalk.gray(`- Full release branch:`)} ${chalk.white.bold(baseBranch)}

    GIT INFO:
    ${chalk.gray(`- Is this a pull request?`)} ${chalk.white.bold(isPr)}
    ${chalk.gray(`- What's our code's git SHA?`)} ${chalk.white.bold(gitSha)}

    RELEASE INFO:
    ${chalk.gray(`- Upcoming release type:`)} ${chalk.white.bold(
      nextReleaseType,
    )}
    ${chalk.gray(`- Upcoming release number:`)} ${chalk.white.bold(
      nextReleaseVersion,
    )}
    ${chalk.gray(
      `- What's the URL-friendly format of this version #?`,
    )} ${chalk.white.bold(urlFriendlyVersion)}
  `,
  );

  const deployUrl = await deployWebsite();

  msg.info(`
    WEBSITE INFO:
    ${chalk.gray(`- Now.sh deployment URL:`)} ${chalk.white.bold.underline(
    deployUrl,
  )}
    ${chalk.gray(`- URLs to alias with this deployment:`)}
      - ${chalk.white.bold(aliasUrls.join('\n      - '))}
`); /* eslint-enable prettier/prettier */
}

// init();

async function preRelease() {
  try {
    console.log(chalk.blue('Step 1. Run pre-release smoke tests'));
    await runAllChecks();
    console.log(chalk.green('OK: Ran all pre-release smoke tests passed. \n'));

    console.log(chalk.blue('Step 2. Run pre-release Jest Tests'));
    await testMonorepo();
    console.log(chalk.green('OK: All pre-release Jest tests passed! \n'));

    console.log(chalk.blue('Step 3. Bump PHP Dependencies (Skipped)'));
    //   await bumpPhpDependencies(nextReleaseVersion);
    //   console.log(chalk.green('OK: Updated PHP Dependencies to new version.\n'));

    console.log(chalk.blue('Step 4. Publish Canary Release'));
    await shell.exec(
      `lerna publish --dist-tag canary --no-git-tag-version --no-push --yes ${canaryReleaseVersion} -m "[skip travis] chore(release): pre-release %s"`,
    );
    console.log(chalk.green('OK: Published our canary release!\n'));

    // reset updated CHANGELOG.md + package.json files
    console.log(
      chalk.blue('Step 5. Clean up modified files post-canary release.'),
    );
    await shell.exec(`git reset --hard`);
    await shell.exec(`git clean -f`);

    // clear .inache file + rebuild website
    console.log(chalk.blue('Step 6. Rebuild the docs site.'));
    await clearCache();
    await buildBeforeDeploying();

    console.log(chalk.blue('Step 7. Deploy to now.sh.'));
    const deployUrl = await deployWebsite();

    // await shell.exec(`now alias ${deployUrl} next.boltdesignsystem.com`);
    console.log(chalk.blue('Step 8. Alias deployed site.'));
    await shell.exec(`now alias ${deployUrl} canary.boltdesignsystem.com`);
    await shell.exec(
      `now alias ${deployUrl} ${normalizedUrlString(
        canaryReleaseVersion,
      )}.boltdesignsystem.com`,
    );
    // console.log(chalk.green('Finished automatically publishing canary release!\n'));

    console.log(chalk.blue('Step 9. Send Slack notification'));

    // await shell.exec(`git add docs-site/.incache`);
    // await shell.exec(
    //   `git commit -m "[skip travis] chore(release): publish v${canaryReleaseVersion}`,
    // );
    // await shell.exec(`git push --no-verify`);
    if (process.env.SLACK_WEBHOOK_URL) {
      const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
      await webhook.send({
        text: `Bolt canary release ${canaryReleaseVersion} has successfully published! <https://canary.boltdesignsystem.com|View Here>`,
      });
    } else {
      console.log(
        chalk.blue(
          'Skipped sending Slack notification -- missing `SLACK_WEBHOOK_URL` env variable!',
        ),
      );
    }

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

preRelease();
//
//

//

// # Alias the new tagged release URL
// now alias boltdesignsystem.com v${urlFriendlyVersion}.boltdesignsystem.com
// `;

// if (branchName === 'master') {
//   // shell.exec(`
//   // `).stdout;
//   shell.exec(`lerna publish ${nextReleaseVersion} `).stdout;
// } else if (branchName === 'develop' || branchName === 'next') {
//   shell.exec('echo "all set!"');
//   // shell.exec(
//   //   `lerna publish --canary ${nextReleaseType} --preid next --force-publish`,
//   // ).stdout;
// }

// npx

// npx lerna publish --canary ${nextReleaseType} --preid next --force-publish`,

// npm run build

// # add updated .incache to Git
// git add .
// git commit -m "[skip travis] chore(release): publish v${newVersion}"

// git tag -fa v${newVersion} -m v${newVersion}
// git push --no-verify
// git push origin v${newVersion} --no-verify --force

// npm run deploy
// ```

// #now alias https://boltdesignsystem-123ab99sz.now.sh release-2-x.boltdesignsystem.com

// now alias https://boltdesignsystem-123ab99sz.now.sh
// now alias https://boltdesignsystem-123ab99sz.now.sh
// now alias https://boltdesignsystem-123ab99sz.now.sh
// now alias https://boltdesignsystem-123ab99sz.now.sh
// now alias https://boltdesignsystem-123ab99sz.now.sh

// git checkout master
// git pull
// git merge release/2.x
// git commit
// git push

// v2.5.5
function bumpPhpDependencies(newVersion) {
  const spinner = ora('Updating PHP dependencies...').start();

  try {
    shell.exec(
      `node scripts/release/update-php-package-versions.js -v ${newVersion}`,
    );

    shell.exec(
      `git add \
        packages/core-php/composer.json \
        packages/drupal-modules/bolt_connect/bolt_connect.info.yml \
        packages/drupal-modules/bolt_connect/composer.json
      `,
    );

    shell.exec(
      `git commit -m "[skip travis] chore: version bump PHP-related dependencies to v${newVersion}"`,
    );
    spinner.succeed('OK: finished updating PHP dependencies');
  } catch (error) {
    return spinner.fail(`Failed to update PHP dependencies.`);
  }
}

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
