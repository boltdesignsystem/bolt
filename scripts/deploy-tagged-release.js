#!/usr/bin/env node
const { promisify } = require('util');
const gitSemverTags = require('git-semver-tags');
const promisifyGitTags = promisify(gitSemverTags);
const { getLatestDeploy } = require('./utils');
const { aliasNowUrl } = require('./utils/handle-now-aliases');

getLatestDeploy()
  .then(async url => {
    const tags = await promisifyGitTags();
    const latestTag = tags[0];

    if (TRAVIS_TAG) {
      // console.log(`Latest Bolt Release Git Tag: ${latestTag}`);
      aliasNowUrl(url, latestTag);
    }

    if (TRAVIS_TAG && TRAVIS_TAG === latestTag && !latestTag.includes('rc')) {
      aliasNowUrl(url, '');
      aliasNowUrl(url, 'www');
    } else {
      console.error(
        `Error aliasing: Travis Tag of ${TRAVIS_TAG} doesn't match the latest tag of ${latestTag}`,
      );
      process.exit(1);
    }
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
