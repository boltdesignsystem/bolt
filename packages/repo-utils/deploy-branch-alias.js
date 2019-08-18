#!/usr/bin/env node
const { getLatestDeploy } = require('./utils');
const { aliasNowUrl } = require('./utils/handle-now-aliases');
const { branchName } = require('./utils/branch-name');

getLatestDeploy()
  .then(url => {
    aliasNowUrl(url, branchName);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
