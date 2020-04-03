#!/usr/bin/env node
// Outputs the latest now.sh deploy
const { getLatestDeploy } = require('./utils');

getLatestDeploy()
  .then((url) => {
    process.stdout.write(url);
  })
  .catch((error) => {
    process.stderr.write(error);
    process.exit(1);
  });
