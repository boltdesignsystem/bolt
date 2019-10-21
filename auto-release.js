const shell = require('shelljs');
const { branchName } = require('./scripts/utils/branch-name');
const isCanaryRelease = branchName === 'master';
const isFullRelease = branchName === 'release-2.x';
const { normalizeUrlAlias } = require('./scripts/utils/normalize-url-alias');

async function init() {
  if (isCanaryRelease) {
    shell.exec(`auto canary`);
  } else if (isFullRelease) {
    console.log('full release!');

    // const branchSpecificUrl = await normalizeUrlAlias(branchName);
    // const tagSpecificUrl = await normalizeUrlAlias(version);

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
// shell.exec(`
//   npx json -I -f docs-site/.incache -e 'this["bolt-tags"].expiresOn = "2019-06-14T12:30:26.377Z"'
//   npx json -I -f docs-site/.incache -e 'this["bolt-urls-to-test"].expiresOn = "2019-06-14T12:30:26.377Z"'
// `);

// const { IncomingWebhook } = require('@slack/webhook');
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
