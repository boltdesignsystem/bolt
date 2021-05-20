#!/usr/bin/env node
const { getLatestDeploy } = require('./utils');
const { aliasVercelUrl } = require('./utils/handle-vercel-aliases');
const { branchName } = require('./utils/branch-name');

getLatestDeploy()
  .then(url => {
    aliasVercelUrl(url, branchName);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
