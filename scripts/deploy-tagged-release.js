#!/usr/bin/env node
const { promisify } = require('util');
const semver = require('semver');
const gitSemverTags = require('git-semver-tags');
const promisifyGitTags = promisify(gitSemverTags);
const { getLatestDeploy } = require('./utils');
const { aliasNowUrl } = require('./utils/handle-now-aliases');
const { TRAVIS_TAG } = require('./utils/travis-vars');

getLatestDeploy()
  .then(async url => {
    const tags = await promisifyGitTags();
    const latestTag = tags[0];

    if (TRAVIS_TAG) {
      // console.log(`Latest Bolt Release Git Tag: ${latestTag}`);
      aliasNowUrl(url, latestTag);
    }

    // Alias prod (boltdesignsystem.com) if this is the latest semver tag and it is NOT a pre-release
    if (
      TRAVIS_TAG &&
      TRAVIS_TAG === latestTag &&
      semver.valid(latestTag) &&
      !semver.prerelease(latestTag)
    ) {
      aliasNowUrl(url, '');
      aliasNowUrl(url, 'www');
    } else {
      // skip alias to main site
    }
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
