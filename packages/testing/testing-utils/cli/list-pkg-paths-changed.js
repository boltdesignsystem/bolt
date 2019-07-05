#! /usr/bin/env node
const { getPkgsChanged, gitSha } = require('../test-utils');

const pkgs = getPkgsChanged({ from: gitSha, base: 'master' });

// This provides a regex for test files to the `jest` cli
// https://jestjs.io/docs/en/cli#jest-regexfortestfiles
// Example: `jest "pkgs/button|pkgs/card"` will only run tests found in the directories `pkgs/button` and `pkgs/card`
// The function used above gathers info about which packages changed.
// This file is to be used with `jest`, like so:
// `jest "$(bolt-list-pkg-paths-changed)"`
// use `stderr` to communicate to user, this will not be passed to jest
// use `stdout` to provide a command line argument to `jest`, this will not be seen by user

process.stderr.write(`These packages have changed, filtering tests to just these directories:\n`);

pkgs.forEach(pkg => {
  process.stderr.write(`- ${pkg.name} : ${pkg.relPath} \n`);
});

const filteredList = pkgs.map(pkg => pkg.relPath).join('|');
process.stdout.write(filteredList);
