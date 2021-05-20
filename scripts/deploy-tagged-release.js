#!/usr/bin/env node
const { promisify } = require('util');
const gitSemverTags = require('git-semver-tags');
const promisifyGitTags = promisify(gitSemverTags);
const { getLatestDeploy } = require('./utils');
const { aliasVercelUrl } = require('./utils/handle-vercel-aliases');
const { TRAVIS_TAG } = require('./utils/travis-vars');

getLatestDeploy()
  .then(async url => {
    const tags = await promisifyGitTags();
    const latestTag = tags[0];

    if (TRAVIS_TAG) {
      // console.log(`Latest Bolt Release Git Tag: ${latestTag}`);
      aliasVercelUrl(url, latestTag);
    }

    if (TRAVIS_TAG && TRAVIS_TAG === latestTag && !latestTag.includes('rc')) {
      aliasVercelUrl(url, '');
      aliasVercelUrl(url, 'www');
    } else {
      // skip alias to main site
    }
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
