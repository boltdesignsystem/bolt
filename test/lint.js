#!/usr/bin/env node
const { outputBanner } = require('ci-utils');
const { execAndReport } = require('../scripts/check-run');

execAndReport({
  cmd: 'yarn lint',
  name: 'Lint',
})
  .then(results => {
    outputBanner('Lint: done');
  })
  .catch(err => {
    outputBanner('Lint: error');
    // console.log(err);
    process.exit(1);
  });
