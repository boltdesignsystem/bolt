const fs = require('fs');
const semver = require('semver');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const checkLinks = require('check-links');
const InCache = require('incache');
const octokit = require('@octokit/rest')({
  debug: false,
  headers: {
    Accept: 'application/vnd.github.v3.raw',
  },
});
const { getConfig } = require('./config-store');

const store = new InCache();

// so we don't go over rate limits
if (process.env.GITHUB_TOKEN) {
  octokit.authenticate({
    type: 'token',
    token: process.env.GITHUB_TOKEN,
  });
}

const urlsToCheck = [];

async function writeVersionDataToJson(versionData) {
  const config = await getConfig();
  let versionInfo = versionData;

  versionInfo.sort(function(a, b) {
    return semver.rcompare(a.label, b.label);
  });

  fs.writeFile(
    path.join(config.dataDir, '/bolt-releases.bolt.json'),
    JSON.stringify({
      options: versionInfo,
    }),
    'utf8',
    err => {
      if (err) throw err;
    },
  );
}

async function gatherBoltVersions() {
  const config = await getConfig();

  const versionSpinner = ora(
    chalk.blue('Gathering data on the latest Bolt Design System releases...'),
  ).start();

  const tagUrls = [];
  let tags; // grab tags from Github API or via local file cache

  if (store.get('bolt-tags')) {
    tags = await store.get('bolt-tags');
  } else {
    tags = await octokit.repos.listTags({
      owner: 'bolt-design-system',
      repo: 'bolt',
      per_page: 9999,
    });
    tags = tags.data;
    await store.set('bolt-tags', tags, { maxAge: 900 });
    await store.save();
  }

  for (index = 0; index < tags.length; index++) {
    let tag = tags[index].name;
    let tagString = tag
      .replace(/\//g, '-') // `/` => `-`
      .replace('--', '-') // `--` => `-`
      .replace(/\./g, '-'); // `.` => `-`

    const newSiteUrl = `https://${tagString}.boltdesignsystem.com`;
    const oldSiteUrl = `https://${tagString}.bolt-design-system.com`;

    urlsToCheck.push(newSiteUrl);
    urlsToCheck.push(oldSiteUrl);
  }

  let results;

  if (store.get('bolt-urls-to-test')) {
    results = await store.get('bolt-urls-to-test');
  } else {
    results = await checkLinks(urlsToCheck);
    await store.set('bolt-urls-to-test', results, { maxAge: 900 });
    await store.save();
  }

  for (index = 0; index < tags.length; index++) {
    let tag = tags[index].name;
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
