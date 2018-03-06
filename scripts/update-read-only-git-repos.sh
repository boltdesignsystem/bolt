#!/usr/bin/env bash
# Must be ran from `../` ie `./scripts/update-read-only-git-repos.sh`
if [[ $TRAVIS == 'true' ]]; then
  if [[ $TRAVIS_PULL_REQUEST == 'false' ]]; then
    branch_name=$TRAVIS_BRANCH
  else
    branch_name=$TRAVIS_PULL_REQUEST_BRANCH
  fi

  # @todo Update to only trigger on tags
  if [[ $branch_name != 'master' ]]; then
    echo "We are in Travis and this IS NOT the master branch, so we WON'T attempt to update read-only git repos."
    exit 0
  else
    echo "We are in Travis and this IS the master branch, so we WILL attempt to update read-only git repos..."
  fi

fi
# Adding the git remote - we might already have it which would result in an error message and an error, we don't want either
git remote add --fetch core-php git@github.com:bolt-design-system/core-php.git > /dev/null 2>&1 || true
# push updates to https://github.com/bolt-design-system/core-php
# @todo Ensure tags are pushed so Packagist can publish them
git subtree push --prefix=packages/core-php core-php master
