#! /usr/bin/env node
const { getPkgsChanged, gitSha } = require('../test-utils');

let base = 'master';

if (process.env.TRAVIS === 'true') {
  const {
    // for push builds, or builds not triggered by a pull request, this is the name of the branch.
    // for builds triggered by a pull request this is the name of the branch targeted by the pull request.
    // for builds triggered by a tag, this is the same as the name of the tag(TRAVIS_TAG).
    TRAVIS_BRANCH,
    // The pull request number if the current job is a pull request, “false” if it’s not a pull request.
    TRAVIS_PULL_REQUEST,
  } = process.env;

  const isPr = TRAVIS_PULL_REQUEST !== 'false';
  if (isPr) {
    base = TRAVIS_BRANCH;
  }
}

const pkgs = getPkgsChanged({ from: gitSha, base });

// This provides a regex for test files to the `jest` cli
// https://jestjs.io/docs/en/cli#jest-regexfortestfiles
// Example: `jest "pkgs/button|pkgs/card"` will only run tests found in the directories `pkgs/button` and `pkgs/card`
// The function used above gathers info about which packages changed.
// This file is to be used with `jest`, like so:
// `jest "$(bolt-list-pkg-paths-changed)"`
// use `stderr` to communicate to user, this will not be passed to jest
// use `stdout` to provide a command line argument to `jest`, this will not be seen by user

process.stderr.write(
  `Comparing this commit "${gitSha}" to base of "${base}":\n`,
);
process.stderr.write(
  `These packages have changed, filtering tests to just these directories:\n`,
);

pkgs.forEach(pkg => {
  process.stderr.write(`- ${pkg.name} : ${pkg.relPath} \n`);
});

const filteredList = pkgs.map(pkg => pkg.relPath).join('|');
process.stdout.write(filteredList);
