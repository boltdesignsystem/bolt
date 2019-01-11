#!/usr/bin/env node
const { outputBanner } = require('ci-utils');
const { execAndReport } = require('./check-run');

execAndReport({
  cmd: 'yarn lint:js',
  name: 'lint',
})
  .then(results => {
    outputBanner('done exec');
  })
  .catch(err => {
    outputBanner('exec error');
    // console.log(err);
    process.exit(1);
  });
