const fs = require('fs');
const semver = require('semver');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const checkLinks = require('check-links');
const { gitSemverTags } = require('./git-semver-tags');
const { getConfig } = require('./config-store');

function urlFriendlyBranchAndTagName(string) {
  return string
    .replace(/\//g, '-') // `/` => `-`
    .replace('--', '-') // `--` => `-` now.sh subdomains can't have `--` for some reason
    .replace(/\./g, '-'); // `.` => `-`
}

const {
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
  ,
} = process.env;

let branchName = 'detached-HEAD';

try {
  branchName = spawnSync('git', ['symbolic-ref', 'HEAD'], {
    encoding: 'utf8',
  }).stdout.replace('refs/heads/', '').replace(/\//g, '-').trim();
} catch (error) {
  process.exit(1);
}

if (TRAVIS === 'true') {
  if (TRAVIS_PULL_REQUEST === 'false') {
    branchName = TRAVIS_BRANCH;
  } else {
    branchName = TRAVIS_PULL_REQUEST_BRANCH;
  }
}

console.log(`Branch Name: ${branchName}`);

// Making sure branch name is ok to be in URL
const branchUrlPart = urlFriendlyBranchAndTagName(branchName);
const aliasedUrlSubdomain = `${encodeURIComponent(branchUrlPart)}.boltdesignsystem`;
const aliasedUrl = `https://${aliasedUrlSubdomain}.com`;

const urlsToCheck = [];

async function writeVersionDataToJson(versionData) {
  const config = await getConfig();

  fs.writeFile(
    path.join(process.cwd(), config.dataDir, '/bolt-releases.bolt.json'),
    JSON.stringify({
      options: versionData,
    }),
    'utf8',
    err => {
      if (err) throw err;
    },
  );
}

async function gatherBoltVersions() {
  const versionSpinner = ora(
    chalk.blue('Gathering data on the latest Bolt Design System releases...'),
  ).start();
  const tags = await gitSemverTags();

  const tagUrls = [];

  for (index = 0; index < tags.length; index++) {
    let tag = tags[index];
    let tagString = urlFriendlyBranchAndTagName(tag);
    
    const newSiteUrl = `https://${tagString}.boltdesignsystem.com`;
    const oldSiteUrl = `https://${tagString}.bolt-design-system.com`;

    urlsToCheck.push(newSiteUrl);
    urlsToCheck.push(oldSiteUrl);
  }

  const results = await checkLinks(urlsToCheck);
  let preSelected = false;

  for (index = 0; index < tags.length; index++) {
    let tag = tags[index];
    let tagString = tag
      .replace(/\//g, '-') // `/` => `-`
      .replace('--', '-') // `--` => `-`
      .replace(/\./g, '-'); // `.` => `-`

    const newSiteUrl = `https://${tagString}.boltdesignsystem.com`;
    const oldSiteUrl = `https://${tagString}.bolt-design-system.com`;

    if (results[newSiteUrl].status === 'alive') {
      tagUrls.push({
        label: tag,
        type: 'option',
        value: newSiteUrl,
      });
    } else if (results[oldSiteUrl].status === 'alive') {
      tagUrls.push({
        label: tag,
        type: 'option',
        value: oldSiteUrl,
      });
    }
    
    if (preSelected === false && branchName === tag){
      tagUrls[0].selected = true;
      preSelected = true;
    }
  }
  
  tagUrls.sort(function(a, b) {
    return semver.rcompare(a.label, b.label);
  });
  
  // indicate which tagged release is the latest
  tagUrls[0].label = tagUrls[0].label + ' (latest)';
  
  // manually add the master branch to the array of releases
  tagUrls.push({
    label: 'master (next)',
    type: 'option',
    value: 'https://master.boltdesignsystem.com',
    selected: branchUrlPart === 'master' ? true : false,
  });
  
  // optionally add your current branch name if not on master or a tagged release already pre-selected
  if (branchUrlPart !== 'master' && preSelected === false) {
    tagUrls.push({
      label: branchUrlPart + ' (current)',
      type: 'option',
      value: `https://${aliasedUrlSubdomain}.boltdesignsystem.com`,
      selected: true,
    });
  }

  versionSpinner.succeed(
    chalk.green('Gathered data on the latest Bolt Design System releases!'),
  );

  return tagUrls;
}

async function getBoltVersions() {
  const versionsGathered = await gatherBoltVersions();
  return versionsGathered;
}

async function writeBoltVersions() {
  const versionsFound = await getBoltVersions();
  await writeVersionDataToJson(versionsFound);
}

module.exports = {
  getBoltVersions,
  writeBoltVersions,
};
