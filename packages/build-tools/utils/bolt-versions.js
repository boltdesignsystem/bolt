const fs = require('fs');
const semver = require('semver');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const checkLinks = require('check-links');
const InCache = require('incache');
const Octokit = require('@octokit/rest').plugin(
  require('@octokit/plugin-throttling'),
);

const octokit = new Octokit({
  throttle: {
    onRateLimit: (retryAfter, options) => {
      console.warn(
        `Github API Request quota exhausted for request ${options.method} ${
          options.url
        }`,
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
  headers: {
    Accept: 'application/vnd.github.v3.raw',
  },
});

const { getConfig } = require('./config-store');
const { fileExists } = require('./general');
const store = new InCache();
let isUsingOldData = false; // remember if we are using up to date version data or older (stale) data as a fallback

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
    try {
      tags = await octokit.repos.listTags({
        owner: 'bolt-design-system',
        repo: 'bolt',
        per_page: 9999,
      });
      tags = tags.data;
      await store.set('bolt-tags', tags, { maxAge: 5 * 60 * 1000 }); // set 5 minute cache expiration
      await store.save();
    } catch (err) {
      // handle expired cached data + not having a GITHUB_TOKEN set as an environmental variable

      // use old stale data if it exists
      if (fileExists(path.join(process.cwd(), '.incache'))) {
        let staleData = fs.readFileSync(path.join(process.cwd(), '.incache'));
        staleData = JSON.parse(staleData);
        const oldTags = staleData['bolt-tags'].value;
        const oldUrls = staleData['bolt-urls-to-test'].value;

        await store.set('bolt-tags', oldTags, { maxAge: 5 * 60 * 1000 }); // set 5 minute cache expiration
        await store.set('bolt-urls-to-test', oldUrls, {
          maxAge: 5 * 60 * 1000,
        }); // set 5 minute cache expiration
        await store.save();

        tags = oldTags;
        isUsingOldData = true; // remember this is old stale data for later
      } else {
        // otherwise just use a static version of the dropdown menu so the docs site doesn't break
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
    await store.set('bolt-urls-to-test', results, { maxAge: 5 * 60 * 1000 });
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
