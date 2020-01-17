#! /usr/bin/env node
const execa = require('execa');
const { getPkgsChanged } = require('../test-utils');

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
  // https://github.com/travis-ci/travis-ci/issues/6069#issuecomment-319710346
  [
    {
      label: 'Setting git config',
      cmd:
        'git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"',
    },
    {
      label: 'Git Fetch',
      cmd: 'git fetch',
    },
  ].forEach(step => {
    process.stderr.write(`${step.label}\n`);
    const results = execa.sync(step.cmd);
    if (results.failed) {
      process.stderr.write(`Uh oh, this Travis git step failed:\n`);
      process.stderr.write(`${results.stderr}\n`);
      process.stderr.write(`${results.stdout}\n`);
      process.exit(1);
      return;
    }
    process.stderr.write('Ran OK\n');
  });
}

const pkgs = getPkgsChanged({ from: 'HEAD', base: `origin/${base}` });

// This provides a regex for test files to the `jest` cli
// https://jestjs.io/docs/en/cli#jest-regexfortestfiles
// Example: `jest "pkgs/button|pkgs/card"` will only run tests found in the directories `pkgs/button` and `pkgs/card`
// The function used above gathers info about which packages changed.
// This file is to be used with `jest`, like so:
// `jest "$(bolt-list-pkg-paths-changed)"`
// use `stderr` to communicate to user, this will not be passed to jest
// use `stdout` to provide a command line argument to `jest`, this will not be seen by user

// account for situations where no pkgs have recently changed
if (pkgs.length >= 1) {
  process.stderr.write(`Comparing this commit "HEAD" to base of "${base}":\n`);
  process.stderr.write(
    `These packages were found to have had recent changes:
      ${pkgs.map(pkg => pkg.name).join('\n')}

      Filtering tests to only run on these packages.\n`,
  );

  pkgs.forEach(pkg => {
    process.stderr.write(`- ${pkg.name} : ${pkg.relPath} \n`);
  });

  const filteredList = pkgs.map(pkg => pkg.relPath).join('|');
  process.stdout.write(filteredList || './fake-test-path'); // dummy path to Jest so we can exit early
} else {
  process.stderr.write(`No packages have recently changed! Exiting early...`);
  process.stdout.write('./fake-test-path'); // dummy path to Jest so we can exit early
}
