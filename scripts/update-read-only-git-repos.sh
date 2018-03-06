#!/usr/bin/env bash
#Must be ran from `../` ie `./scripts/update-read-only-git-repos.sh`
# if [[ $TRAVIS == 'true' ]]; then
#   if [[ $TRAVIS_PULL_REQUEST == 'false' ]]; then
#     branch_name=$TRAVIS_BRANCH
#   else
#     branch_name=$TRAVIS_PULL_REQUEST_BRANCH
#   fi

#   # @todo Update to only trigger on tags
#   if [[ $branch_name != 'master' ]]; then
#     echo "We are in Travis and this IS NOT the master branch, so we WON'T attempt to update read-only git repos."
#     exit 0
#   else
#     echo "We are in Travis and this IS the master branch, so we WILL attempt to update read-only git repos..."
#   fi

# fi

# if we have the remote `core-php` cool, if not, then let's add it
# git remote show core-php || git remote add --fetch core-php git@github.com:bolt-design-system/core-php.git
# # push updates to https://github.com/bolt-design-system/core-php
# # @todo Ensure tags are pushed so Packagist can publish them
# git subtree push --prefix=packages/core-php core-php master


scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/bolt-design-system/core-php.git

scripts/git-subsplit.sh publish --work-dir=$PWD packages/core-php:https://${GH_TOKEN}@github.com/bolt-design-system/core-php.git \
  --heads=master --update
