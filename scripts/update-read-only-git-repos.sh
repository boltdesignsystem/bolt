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

# Run helper subsplit script ported over from from https://raw.githubusercontent.com/dflydev/git-subsplit/master/git-subsplit.sh

./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/bolt-design-system/core-php.git
./scripts/git-subsplit.sh publish --work-dir=$PWD packages/core-php:https://${GH_TOKEN}@github.com/bolt-design-system/core-php.git \
  --heads=master --update
rm -rf .subsplit

./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/bolt-design-system/bolt_connect.git
./scripts/git-subsplit.sh publish --work-dir=$PWD packages/drupal-modules/bolt_connect:https://${GH_TOKEN}@github.com/bolt-design-system/bolt_connect.git \
  --heads=master --update
rm -rf .subsplit

