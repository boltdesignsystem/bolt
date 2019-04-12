#!/usr/bin/env node
const shell = require('shelljs');

let branchOrTagName = 'detached-HEAD';
try {
  branchOrTagName = shell.exec(
    `git rev-parse --abbrev-ref HEAD | grep -v HEAD || git describe --exact-match HEAD 2> /dev/null || git rev-parse HEAD`,
    {
      silent: true,
    },
  ).stdout;
} catch (error) {
  console.log(error);
  process.exit(1);
}

module.exports = {
  branchOrTagName,
};
