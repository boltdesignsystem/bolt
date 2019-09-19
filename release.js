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
} = require('./release-utils');
const urlFriendlyVersion = normalizedUrlString(nextReleaseVersion);

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

    console.log(chalk.blue('Step 3. Bump PHP Dependencies'));
    await bumpPhpDependencies(nextReleaseVersion);
    console.log(chalk.green('OK: Updated PHP Dependencies to new version.\n'));

    console.log(chalk.blue('Step 4. Publish Canary Release'));
    await canary();
    console.log(chalk.green('OK: Published our canary release!\n'));
  } catch (error) {
    console.log(chalk.red(`ERROR: the pre-release checks failed! ${error}`));
  }
}

function getCanaryVersion() {
  const previousVersions = JSON.parse(
    shell.exec(`npm view @bolt/core versions --json`).stdout,
  );
  const previousCanary = JSON.parse(
    shell.exec(`npm view @bolt/core@canary dist-tags --json`).stdout,
  ).canary;

  let newCanaryVersionSuffix = 0;
  let newCanaryVersion;

  if (previousCanary !== '') {
    newCanaryVersionSuffix = parseInt(
      previousCanary.split('.')[previousCanary.split('.').length - 1],
    );
  }

  newCanaryVersion = `${nextReleaseVersion}-canary.${gitSha}.${newCanaryVersionSuffix}`;

  while (previousVersions.includes(newCanaryVersion)) {
    console.warn(
      `We found a previous canary release of ${newCanaryVersion} so bumping the canary version!`,
    );
    newCanaryVersion = `${nextReleaseVersion}-canary.${gitSha}.${newCanaryVersionSuffix +
      1}`;
  }

  return newCanaryVersion;
}

// shell.exec(
//   `lerna publish --preid next --no-git-tag-version --no-push --yes ${newVersion} -m "[skip travis] chore(release): pre-release %s"`,
// );

// {
//   "latest": "2.8.0-beta.2",
//   "next": "2.8.0-beta.1",
//   "canary": "2.8.0-canary.33b5593d7.0"
// }

// preRelease();

function canary() {
  shell.exec(
    `lerna publish --preid canary --no-git-tag-version --no-push --yes ${getCanaryVersion()} -m "[skip travis] chore(release): pre-release %s"`,
  );
  // npx lerna publish --canary ${nextReleaseType} --preid next --force-publish
}

// clearCache();
//

// const isStableRelease = branchName === 'master';

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
