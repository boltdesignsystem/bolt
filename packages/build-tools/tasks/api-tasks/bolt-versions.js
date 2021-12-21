const fs = require('fs');
const semver = require('semver');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const checkLinks = require('check-links');
const InCache = require('incache');
const { Octokit } = require('@octokit/rest');
const { throttling } = require('@octokit/plugin-throttling');
const MyOctokit = Octokit.plugin(throttling);

let versionSpinner;

const { getConfig } = require('@bolt/build-utils/config-store');
const { fileExists } = require('@bolt/build-utils/general');
// Note: cannot use `cwd` as this is run from docs-site (yarn start, yarn build) and from root dir (yarn test:js)
const lernaConfig = require('./../../../../lerna.json');

const store = new InCache();
let isUsingOldData = false; // remember if we are using up to date version data or older (stale) data as a fallback

const urlsToCheck = [];

function isValidFullRelease(tag) {
  // Is valid semver and does not contain any pre-release labels
  return semver.valid(tag) && !semver.prerelease(tag);
}

async function writeBoltVersionUrlsToJson(versionData) {
  const config = await getConfig();

  const lernaVersion = semver.clean(lernaConfig.version);

  // Filter out versions that are greater than the lerna version
  const versionInfo = versionData.filter(({ label }) =>
    semver.lte(label, lernaVersion),
  );

  versionInfo.sort(function(a, b) {
    return semver.rcompare(a.label, b.label);
  });

  // Write the dynamically created version list to the "bolt-releases.bolt.json" data file.
  // This will be used to populate the Version Selector component.
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
      // moved to the try/catch to gracefully handle the GITHUB_TOKEN env not being available
      const octokit = new MyOctokit({
        auth: 'token ' + process.env.GITHUB_TOKEN || undefined,
        throttle: {
          onRateLimit: (retryAfter, options) => {
            console.warn(
              `Github API Request quota exhausted for request ${options.method} ${options.url}`,
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
              `Github API abuse detected for request ${options.method} ${options.url}`,
            );
          },
        },
        debug: false,
      });

      tags = await octokit.repos.listTags({
        owner: 'bolt-design-system',
        repo: 'bolt',
        per_page: 9999,
      });

      // Filter out versions that are not valid or pre-release
      tags = tags.data.filter(({ name }) => isValidFullRelease(name));

      await store.set('bolt-tags', tags, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }); // set 30 day cache
      await store.save();
    } catch (err) {
      // handle expired cached data + not having a GITHUB_TOKEN set as an environmental variable

      // use old stale data if it exists
      if (fs.existsSync(path.join(process.cwd(), '.incache'))) {
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

  return tags;
}

async function gatherBoltVersionUrls() {
  versionSpinner = ora(
    chalk.blue('Gathering data on the latest Bolt Design System releases...'),
  ).start();
  let tags = await getBoltTags();
  const tagUrls = [];

  for (let index = 0; index < tags.length; index++) {
    let tag = tags[index].name;
    if (isValidFullRelease(tag)) {
      let tagString = tag
        .replace(/\//g, '-') // `/` => `-`
        .replace('--', '-') // `--` => `-`
        .replace(/\./g, '-'); // `.` => `-`

      const siteUrl = `https://${tagString}.boltdesignsystem.com`;
      urlsToCheck.push(siteUrl);
    }
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

  for (let index = 0; index < tags.length; index++) {
    let tag = tags[index].name;
    if (isValidFullRelease(tag)) {
      let tagString = tag
        .replace(/\//g, '-') // `/` => `-`
        .replace('--', '-') // `--` => `-`
        .replace(/\./g, '-'); // `.` => `-`

      const siteUrl = `https://${tagString}.boltdesignsystem.com`;

      if (
        semver.valid(tag) &&
        results[siteUrl] !== undefined &&
        results[siteUrl].status === 'alive'
      ) {
        tagUrls.push({
          label: tag,
          type: 'option',
          value: siteUrl,
        });
      }
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
