const fs = require('fs');
const semver = require('semver');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const checkLinks = require('check-links');
const { gitSemverTags } = require('./git-semver-tags');
const { getConfig } = require('./config-store');

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

  // Skip over checking for Bolt releases when not in prod mode to speed up the initial build
  // if (!config.prod) {
  versionSpinner.succeed(
    chalk.green('Skipped gathering data on every Bolt release -- dev build!'),
  );
  return [
    {
      label: 'Local Dev',
      type: 'option',
      value: `http://localhost:${config.port}/${config.startPath}`,
    },
  ];
  // }

  const tags = await gitSemverTags();

  const tagUrls = [];

  for (index = 0; index < tags.length; index++) {
    let tag = tags[index];
    let tagString = tag
      .replace(/\//g, '-') // `/` => `-`
      .replace('--', '-') // `--` => `-`
      .replace(/\./g, '-'); // `.` => `-`

    const newSiteUrl = `https://${tagString}.boltdesignsystem.com`;
    const oldSiteUrl = `https://${tagString}.bolt-design-system.com`;

    urlsToCheck.push(newSiteUrl);
    urlsToCheck.push(oldSiteUrl);
  }

  const results = await checkLinks(urlsToCheck);

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
