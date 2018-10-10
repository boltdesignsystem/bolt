#!/usr/bin/env node
const url = require('url');
const querystring = require('querystring');
const { promisify } = require('util');
const gitSemverTags = require('git-semver-tags');
const promisifyGitTags = promisify(gitSemverTags);
const fs = require('fs');
const semver = require('semver');
const urlExists = require('url-exists');
const path = require('path');
const { getConfig } = require('./config-store');

let tagUrls = [];

async function writeVersionDataToJson(versionData) {
  const config = await getConfig();
  let versionInfo = versionData;

  versionInfo.sort(function(a, b) {
    return semver.rcompare(a.label, b.label);
  });

  //versionInfo = versionInfo.reverse();

  // tagUrls.unshift({
  //   label: 'Next Release',
  //   value: 'https://master.boltdesignsystem.com',
  //   type: 'option',
  // });

  const latestReleaseLabel = versionInfo[0].label;
  const latestReleaseUrl = 'https://boltdesignsystem.com';

  versionInfo[0].selected = true;
  versionInfo[0].label = latestReleaseLabel;
  versionInfo[0].url = latestReleaseUrl;

  fs.writeFile(
    path.join(process.cwd(), config.dataDir, '/bolt-releases.bolt.json'),
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
  try {
    const tags = await promisifyGitTags();

    return new Promise((resolve, reject) => {
      function urlCallback(tagUrls) {
        return resolve(tagUrls);
      }

      tags.forEach((tag, index, array) => {
        let tagString = tag
          .replace(/\//g, '-') // `/` => `-`
          .replace('--', '-') // `--` => `-`
          .replace(/\./g, '-'); // `.` => `-`

        const newSiteUrl = `https://${tagString}.boltdesignsystem.com`;
        const oldSiteUrl = `https://${tagString}.bolt-design-system.com`;

        urlExists(newSiteUrl, function(err, exists) {
          if (exists === true) {
            tagUrls.push({
              label: tag,
              type: 'option',
              value: newSiteUrl,
            });

            if (index === array.length - 1) {
              urlCallback(tagUrls);
            }
          } else {
            urlExists(oldSiteUrl, function(err, exists) {
              if (exists) {
                console.log('Old url:' + oldSiteUrl);
                tagUrls.push({
                  label: tag,
                  type: 'option',
                  value: oldSiteUrl,
                });
              }

              if (index === array.length - 1) {
                urlCallback(tagUrls);
              }
            });
          }
        });
      });
    });
  } catch (error) {
    console.log('Error');
    console.error(error);
  }
}

async function getBoltVersions() {
  return await gatherBoltVersions();
}

async function writeBoltVersions() {
  const versionsFound = await getBoltVersions();
  await writeVersionDataToJson(versionsFound);
}

module.exports = {
  getBoltVersions,
  writeBoltVersions,
};
