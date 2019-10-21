const shell = require('shelljs');
const { branchName } = require('./scripts/utils/branch-name');
const isCanaryRelease = branchName === 'master';
const isFullRelease = branchName === 'release-2.x';
const { normalizeUrlAlias } = require('./scripts/utils/normalize-url-alias');
const { gitSha } = require('./scripts/utils');
const execSync = require('child_process').execSync;
const { getLatestDeploy } = require('./scripts/utils');
const { IncomingWebhook } = require('@slack/webhook');
const chalk = require('chalk');

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const SLACK_WEBPACK_URL_CANARY = process.env.SLACK_WEBPACK_URL_CANARY;

async function getLernaPackages() {
  const packages = shell.exec('npx lerna ls -pl', {
    silent: true,
  }).stdout;
  const formattedPackages = [];
  packages.split('\n').map(packageInfo => {
    const [packagePath, name, version] = packageInfo.split(':');

    if (packagePath && version) {
      formattedPackages.push({ path: packagePath, name, version });
    }
  });

  return formattedPackages;
}

async function getIndependentPackageList() {
  return getLernaPackages().then(packages =>
    packages.map(p => `\n - \`${p.name}@${p.version.split('+')[0]}\``).join(''),
  );
}

async function init() {
  if (isCanaryRelease) {
    try {
      const version = shell
        .exec('auto version', {
          silent: true,
        })
        .stdout.trim();

      const canaryVersion = `.${process.env.TRAVIS_PULL_REQUEST_SHA ||
        process.env.TRAVIS_JOB_NUMBER ||
        gitSha}`;

      await shell.exec(
        `npx lerna publish pre${version} --dist-tag canary --preid canary${canaryVersion} --no-git-reset --no-git-tag-version --exact --ignore-scripts --no-push --yes -m "[skip travis] chore(release): pre-release %s"`,
      );
      console.log('Canary published to NPM.');
      const packages = await getLernaPackages();

      await shell.exec('git reset --hard HEAD').stdout;

      // const independentPackages = await getIndependentPackageList();
      // console.log(independentPackages);

      const versioned = packages.find(p => p.version.includes('canary'));
      if (!versioned) {
        console.log(
          'No packages were changed so no canary version was published.',
        );
      }

      const canaryReleaseVersion = `v${versioned.version.split('+')[0].trim()}`; // ex. 2.9.0-canary.6b70020b5.0

      const branchSpecificUrl = await normalizeUrlAlias(branchName);
      const tagSpecificUrl = await normalizeUrlAlias(canaryReleaseVersion);

      const nowAliases = [];
      nowAliases.push(branchSpecificUrl);
      nowAliases.push(await normalizeUrlAlias('canary'));
      nowAliases.push(tagSpecificUrl);

      console.log(nowAliases);

      await shell.exec(`
        npx json -I -f docs-site/.incache -e 'this["bolt-tags"].expiresOn = "2019-06-14T12:30:26.377Z"'
        npx json -I -f docs-site/.incache -e 'this["bolt-urls-to-test"].expiresOn = "2019-06-14T12:30:26.377Z"'
      `);

      shell.exec(`npx now alias boltdesignsystem.com ${tagSpecificUrl}`);

      execSync('npm run build');
      shell.exec(
        `npx now deploy --meta gitSha="${gitSha}" --token=${process.env.NOW_TOKEN}`,
      );

      const latestUrl = await getLatestDeploy();

      nowAliases.forEach(alias => {
        shell.exec(`npx now alias ${latestUrl} ${alias}`);
      });

      shell.exec(`
        git tag -d ${canaryReleaseVersion}
        git push origin :refs/tags/${canaryReleaseVersion}
      `);

      await shell.exec('git reset --hard HEAD').stdout;

      if (SLACK_WEBPACK_URL_CANARY) {
        const webhook = new IncomingWebhook(SLACK_WEBPACK_URL_CANARY);
        await webhook.send({
          text: `Bolt canary release, *${canaryReleaseVersion}*, has successfully published!
           - <https://canary.boltdesignsystem.com|Shared Canary URL>
           - <${tagSpecificUrl}|Unique Canary URL>`,
        });
      } else {
        console.log(
          chalk.yellow(
            'Skipped sending Slack notification about upcoming Canary release -- missing `SLACK_WEBPACK_URL_CANARY` env variable!',
          ),
        );
      }

      console.log('Finished publishing canary release!');

      // const urlVersion = urlFriendlyString(newVersion);

      // await shell.exec(`
      //   npx now alias ${latestUrl} next.boltdesignsystem.com
      //   npx now alias ${latestUrl} next.boltdesignsystem.com
      // `);
    } catch (error) {
      console.error(error);
    }
  } else if (isFullRelease) {
    console.log('full release!');

    // publish
    // alias new version

    // console.log(
    //   `https://github.com/boltdesignsystem/bolt/releases/tag/v${currentVersion}`,
    // );
  } else {
    console.log(
      `Skipping doing an auto-release since the current branch, ${branchName}, isn't master or a release branch!`,
    );

    // shell.exec(`
    //   now alias ${latestUrl} ${branchAlias}
    //   now alias ${latestUrl} v${urlVersion}.boltdesignsystem.com
    //   now alias ${latestUrl} boltdesignsystem.com
    //   now alias ${latestUrl} www.boltdesignsystem.com
    //   now alias ${latestUrl} bolt-design-system.com
    //   now alias ${latestUrl} www.bolt-design-system.com
    // `);
  }

  // const lernaConfig = require('./lerna.json');
  // const currentVersion = lernaConfig.version;

  // const releaseType = isCanaryRelease ? shell
  //   .exec(`auto version`, {
  //     silent: true,
  //   })
  //   .stdout.trim();
  // console.log(releaseType);
}
init();

// // clear docs site .incache file

//
// const url = process.env.SLACK_WEBHOOK_URL;
// // Read a url from the environment variables

// // npm run build

// // npm run deploy

// function urlFriendlyString(string) {
//   return string
//     .replace(/\//g, '-') // `/` => `-`
//     .replace('--', '-') // `--` => `-` now.sh subdomains can't have `--` for some reason
//     .replace(/\./g, '-'); // `.` => `-`
// }

// // let normalizedUrlBase = `${encodeURIComponent(normalizedUrlPrefix)}`;

// const { getLatestDeploy } = require('./scripts/utils');
//

// const { aliasNowUrl } = require('./scripts/utils/handle-now-aliases');
//
// const { TRAVIS_TAG } = require('./scripts/utils/travis-vars');

// const { promisify } = require('util');
// const gitSemverTags = require('git-semver-tags');
// const semver = require('semver');
// const { IncomingWebhook } = require('@slack/webhook');
// const promisifyGitTags = promisify(gitSemverTags);
// // console.log(latestVersion.version);

// // const NOW_URL = require('./scripts/get-latest-deploy.js');
// async function postRelease() {
//   const latestUrl = await getLatestDeploy();
//

//   // console.log(latestUrl);

//   const urlVersion = urlFriendlyString(currentVersion);

//   const url = process.env.SLACK_WEBHOOK_URL;

//   const webhook = new IncomingWebhook(url, {
//     icon_emoji: ':bolt:',
//   });

// Send the notification
// (async () => {
//   await webhook.send({
//     text: `Bolt v${currentVersion} has been released! Check out the <https://github.com/boltdesignsystem/bolt/releases/tag/v${currentVersion}|latest release notes> for more details!`,
//     color: 'good', // Can aeither be one of 'good', 'warning', 'danger', or any hex color code
//   });
// })();

//
// let upcomingVersion;

// console.log(isCanaryRelease);

//
//

// const gitTags = await promisifyGitTags();
// const latestGitTag = gitTags[0];

// console.log(branchAlias);
// console.log(tagAlias);
// console.log(latestTag);

//
// const newVersion = semver.inc(version, releaseType);

// // auto version
// if (tags.includes(`v${newVersion}`)){
//   console.log(`v${newVersion} tag already exists! Aborting...`);
// }

// if (TRAVIS_TAG) {
//   aliasNowUrl(url, latestTag);
// }
// shell.exec(`
//   v2.8.3
// `);

// now alias ${latestUrl} release-2-x.boltdesignsystem.com
// now alias ${latestUrl} v${urlVersion}.boltdesignsystem.com

// tagged tagged release
// if (branchName === 'release-2.x') {
//   console.log('full release!');
//   shell.exec(`
//     now alias ${latestUrl} boltdesignsystem.com
//     now alias ${latestUrl} www.boltdesignsystem.com
//     now alias ${latestUrl} bolt-design-system.com
//     now alias ${latestUrl} www.bolt-design-system.com
//   `);
// } else if (branchName === 'master') {

// } else {

// }

// await aliasNowUrl(latestUrl, branchName);

// shell.exec(`
//   now alias ${latestUrl} boltdesignsystem.com
//   now alias ${latestUrl} www.boltdesignsystem.com
//   now alias ${latestUrl} bolt-design-system.com
//   now alias ${latestUrl} www.bolt-design-system.com
//   now alias ${latestUrl} release-2-x.boltdesignsystem.com
//   now alias ${latestUrl} v2-5-5.boltdesignsystem.com
// `);

// https://boltdesignsystem-riaqedhmc.now.sh
// }

// postRelease();
// git checkout docs-site/src/assets

// now alias https://boltdesignsystem-123ab99sz.now.sh boltdesignsystem.com
// now alias https://boltdesignsystem-123ab99sz.now.sh www.boltdesignsystem.com
// now alias https://boltdesignsystem-123ab99sz.now.sh bolt-design-system.com
// now alias https://boltdesignsystem-123ab99sz.now.sh www.bolt-design-system.com
// now alias https://boltdesignsystem-123ab99sz.now.sh release-2-x.boltdesignsystem.com
// now alias https://boltdesignsystem-123ab99sz.now.sh v2-5-5.boltdesignsystem.com
