const shell = require('shelljs');
const cp = require('child_process');
const path = require('path');
const semver = require('semver');
const { branchName } = require('@bolt/scripts/utils/branch-name');
const { TRAVIS, TRAVIS_TAG } = require('@bolt/scripts/utils/travis-vars');
const { gitSha } = require('@bolt/scripts/utils');
const repoRoot = path.join(__dirname, './');
const { existsSync } = require('fs-extra');
const {
  normalizeUrlAlias,
} = require('@bolt/scripts/utils/normalize-url-alias');

const fullConfigPath = path.join(repoRoot, 'www/build/data/config.bolt.json');
const twigNamespacesManifestPath = path.join(
  repoRoot,
  'www/build/data/twig-namespaces.bolt.json',
);
const {
  getBoltTags,
} = require('@bolt/build-tools/tasks/api-tasks/bolt-versions');

const currentVersion = require(path.join(__dirname, './lerna.json')).version;

if (TRAVIS_TAG) {
  console.log(
    'This is already a tagged release on Travis so skipping over doing another publish',
  );
  process.exit(0);
}

const onlyPublishOnTheseBranches = ['master', 'develop', 'next', 'release/2.x'];

if (!onlyPublishOnTheseBranches.includes(branchName) && TRAVIS) {
  console.log(
    `Skipped publishing since we only do a release on the master, develop, next, and release/2.x branches. Note: this rule only applies on Travis. You can still manually publish canary releases locally.`,
  );
  process.exit(0);
}

// deployedUrl = shell.exec(
//   `npx now --meta gitSha="${gitSha}" --token=${NOW_TOKEN}`,
// ).stdout;

// ex. minor
function getNextReleaseType() {
  return shell.exec(`auto version --from v${currentVersion}`, {
    silent: true,
  }).stdout;
}
const nextReleaseType = getNextReleaseType().trim();

// console.log(nextReleaseType);
// console.log(typeof(getNextReleaseType()));
const nextReleaseVersion = semver.inc(
  semver.coerce(currentVersion),
  nextReleaseType,
);

if (nextReleaseVersion === 'null') {
  console.warn(
    `Unexpected received ${nextReleaseVersion} as the next version to publish to!?`,
  );
  process.exit(0);
}

if (!process.env.NPM_TOKEN) {
  console.warn('An NPM Token is needed in order to publish!');
  process.exit(1);
}

// const nextReleaseVersion = function() {
//   return shell
//     .exec(`npx semver ${currentVersion} --increment ${nextReleaseType}`, {
//       silent: true,
//     })
//     .stdout.trim();
// };

// console.log(nextReleaseVersion);
// console.log(getNextReleaseType());

async function init() {
  const allBoltTags = [];
  let tags = await getBoltTags();

  for (let tag of tags) {
    allBoltTags.push(tag.name);
  }

  // test to make sure the version we're trying to publish to doesn't already exist
  if (allBoltTags.includes(nextReleaseVersion)) {
    console.warn(`The ${nextReleaseVersion} tag already exists!!`);
    process.exit(1);
  }

  // remote release
  if (TRAVIS) {
    // local release
  } else {
    // shell.exec(`
    //   npm run setup
    //   npm run build
    // `).stdout;
    cp.execFileSync('rm', ['.incache'], { stdio: 'inherit' });
    cp.execFileSync('npm', ['run', 'setup'], { stdio: 'inherit' });
    cp.execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });
  }

  if (!existsSync(twigNamespacesManifestPath)) {
    console.warn(
      `Can't find ${twigNamespacesManifestPath}!. Please do a build first first before deploying!`,
    );
    process.exit(1);
  }

  if (!existsSync(fullConfigPath)) {
    console.warn(
      `Can't find ${fullConfigPath}!. Please do a build first first before deploying!`,
    );
    process.exit(1);
  }

  // shell.exec(`
  //   node scripts/release/update-php-package-versions.js -v ${nextReleaseVersion}
  //   git add .
  //   git commit -m "[skip travis] chore(release): bump PHP deps to v${nextReleaseVersion}"
  // `).stdout;
  //   normalizeUrlAlias
  if (branchName === 'master') {
    // shell.exec(`
    //   npx json -I -f docs-site/.incache -e 'this["bolt-tags"].expiresOn = "2019-06-14T12:30:26.377Z"'
    //   npx json -I -f docs-site/.incache -e 'this["bolt-urls-to-test"].expiresOn = "2019-06-14T12:30:26.377Z"'
    // `).stdout;

    shell.exec(`lerna publish ${nextReleaseVersion}`).stdout;
  } else if (branchName === 'develop' || branchName === 'next') {
    shell.exec(
      `lerna publish --canary ${nextReleaseType} --preid next --no-git-reset`,
    ).stdout;
  }
  // console.log(branchName);
  //   @bolt/core@2.8.0-canary.33b5593d7.0
  // --canary
  // lerna publish  --dist-tag canary --no-git-reset
  // //

  // 2.7.0-canary.${SHA}
  // 2.8.0-canary.33b5593d7.0
}

init();

// git checkout release/2.x
// npm run setup
// npm run lint
// npm run test
// npm run build

// # what’s the next release going to be?

// // major = 'major',
// // premajor = 'premajor',
// // minor = 'minor',
// // preminor = 'preminor',
// // patch = 'patch',
// // prepatch = 'prepatch',
// // noVersion = ''

// // bump PHP dependencies

// function bumpPhpDeps(version){
// node scripts/release/update-php-package-versions.js -v 2.5.5

// git add .

// git commit -m "chore: version bump PHP-related dependencies to v2.5.5"

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
