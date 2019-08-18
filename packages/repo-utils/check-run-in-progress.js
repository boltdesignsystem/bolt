#!/usr/bin/env node
const { setCheckRun } = require('../scripts/check-run');
const name = process.argv[2];

if (!name) {
  console.log(
    'Must passing in a single argument that is the name of the GitHub check to pass in.',
  );
  process.exit(1);
}

setCheckRun({ name, status: 'in_progress' })
  .then(results => {
    console.log(`Check Run in-progress ${name}: ${results.html_url}`);
  })
  .catch(err => {
    console.error(`Error: Marking Check Run ${name} as in progress`, err);
    process.exit(1);
  });
