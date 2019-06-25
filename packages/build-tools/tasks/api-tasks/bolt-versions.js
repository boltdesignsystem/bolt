const fs = require('fs');
const semver = require('semver');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const checkLinks = require('check-links');
const InCache = require('incache');

const Octokit = require('@octokit/rest').plugin(
  process.env.GITHUB_TOKEN
    ? require('@octokit/plugin-throttling')
    : function() {},
);

let versionSpinner;

const octokit = new Octokit(
  process.env.GITHUB_TOKEN
    ? {
        auth() {
          if (process.env.GITHUB_TOKEN) {
            return `token ${process.env.GITHUB_TOKEN}`;
          } else {
            return undefined;
          }
        },
        throttle: {
          onRateLimit: (retryAfter, options) => {
            console.warn(
              `Github API Request quota exhausted for request ${
                options.method
              } ${options.url}`,
            );

            // only retry if wait is 15 seconds or less
            if (options.request.retryCount === 0 && retryAfter <= 15) {
              // only retries once
              console.log(`Retrying after ${retryAfter} seconds!`);
              return true;
            } else {
              console.log(
                `Skipping auto-retry since we don't want to wait ${retryAfter} seconds!`,
              );
              return false;
            }
          },
          onAbuseLimit: (retryAfter, options) => {
            // does not retry, only logs a warning
            console.warn(
              `Github API abuse detected for request ${options.method} ${
                options.url
              }`,
            );
          },
        },
        debug: false,
      }
    : {},
);

const { getConfig } = require('../../utils/config-store');
const { fileExists } = require('../../utils/general');
const store = new InCache();
let isUsingOldData = false; // remember if we are using up to date version data or older (stale) data as a fallback

const urlsToCheck = [];

async function writeBoltVersionUrlsToJson(versionData) {
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

async function getBoltTags() {
  const config = await getConfig();

  let tags; // grab tags from Github API or via local file cache

  // use local cache if available, but not on Travis tagged releases
  if (store.get('bolt-tags') && !process.env.TRAVIS_TAG) {
    tags = await store.get('bolt-tags');
  } else {
    try {
      tags = await octokit.repos.listTags({
        owner: 'bolt-design-system',
        repo: 'bolt',
        per_page: 9999,
      });
      tags = tags.data;
      await store.set('bolt-tags', tags, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // set 30 day cache
      await store.save();
    } catch (err) {
      // handle expired cached data + not having a GITHUB_TOKEN set as an environmental variable

      // use old stale data if it exists
      try {
        await fs.promises.access(path.resolve(process.cwd(), '.incache'));
        let staleData = fs.readFileSync(path.join(process.cwd(), '.incache'));
        staleData = JSON.parse(staleData);
        const oldTags = staleData['bolt-tags'].value;
        const oldUrls = staleData['bolt-urls-to-test'].value;

        await store.set('bolt-tags', oldTags, {
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        await store.set('bolt-urls-to-test', oldUrls, {
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        await store.save();

        tags = oldTags;
        isUsingOldData = true; // remember this is old stale data for later
        // otherwise just use a static version of the dropdown menu so the docs site doesn't break
      } catch (error) {
        versionSpinner.warn(
          chalk.yellow(
            'Could not generate the list of the latest releases of Bolt due to a missing GITHUB_TOKEN auth token + not finding an old version to fall back on. Skipping for now...',
          ),
        );

        return [
          {
            label: 'Latest',
            type: 'option',
            value: `https://boltdesignsystem.com`,
          },
        ];
      }
    }
  }

  return tags;
}

async function gatherBoltVersionUrls() {
  versionSpinner = ora(
    chalk.blue('Gathering data on the latest Bolt Design System releases...'),
  ).start();
  let tags = await getBoltTags();
  const tagUrls = [];

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
    await store.set('bolt-urls-to-test', results, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
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

  if (isUsingOldData) {
    versionSpinner.warn(
      chalk.yellow(
        'Using Could not find a GITHUB_TOKEN auth token and the cached version of the latest Bolt releases has expired -- using the old (expired) data for now...',
      ),
    );
  } else {
    versionSpinner.succeed(
      chalk.green(
        'Finished gathering data on the latest Bolt Design System releases!',
      ),
    );
  }

  return tagUrls;
}

async function getBoltVersionUrls() {
  const versionsGathered = await gatherBoltVersionUrls();
  return versionsGathered;
}

async function writeBoltVersions() {
  const versionsFound = await getBoltVersionUrls();
  await writeBoltVersionUrlsToJson(versionsFound);
}

module.exports = {
  getBoltTags,
  getBoltVersionUrls,
  writeBoltVersions,
};
