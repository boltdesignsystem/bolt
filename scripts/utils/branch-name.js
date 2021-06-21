const { spawnSync } = require('child_process');
const {
  TRAVIS,
  TRAVIS_PULL_REQUEST,
  TRAVIS_BRANCH,
  TRAVIS_PULL_REQUEST_BRANCH,
} = require('./travis-vars');

let branchName = 'detached-HEAD';
try {
  branchName = spawnSync('git', ['symbolic-ref', 'HEAD'], {
    encoding: 'utf8',
  })
    .stdout.replace('refs/heads/', '')
    .replace(/\//g, '-')
    .trim();
} catch (error) {
  process.exit(1);
}

if (TRAVIS === 'true') {
  if (TRAVIS_PULL_REQUEST === 'false') {
    branchName = TRAVIS_BRANCH;
  } else {
    branchName = TRAVIS_PULL_REQUEST_BRANCH;
  }
}

// console.log(`Branch Name: ${branchName}`);

module.exports = {
  branchName,
};
