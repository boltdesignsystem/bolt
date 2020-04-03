#!/usr/bin/env node
const { setCheckRun } = require('../scripts/check-run');
const name = process.argv[2];

if (!name) {
  console.log(
    'Must passing in a single argument that is the name of the GitHub check to pass in.',
  );
  process.exit(1);
}

setCheckRun({
  name,
  status: 'completed',
  conclusion: 'failure',
})
  .then((results) => {
    console.log(`Failed Check Run ${name}: ${results.html_url}`);
  })
  .catch((err) => {
    console.error(`Error: Failing Check Run ${name}`, err);
    process.exit(1);
  });
