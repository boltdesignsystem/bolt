#!/usr/bin/env node
const { outputBanner } = require('ci-utils');
const { execAndReport } = require('../scripts/check-run');

execAndReport({
  cmd: 'yarn test',
  name: 'Unit Test',
})
  .then(results => {
    outputBanner('Unit: done');
  })
  .catch(err => {
    outputBanner('Unit: error');
    // console.log(err);
    process.exit(1);
  });
