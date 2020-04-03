#!/usr/bin/env node
const { createCheckSuite } = require('./check-run');

createCheckSuite()
  .then((results) => {
    console.log(`Check Suite Created ${results.id}`);
  })
  .catch(() => {
    process.exit(1);
  });
