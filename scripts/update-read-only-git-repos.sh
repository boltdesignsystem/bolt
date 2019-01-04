#!/usr/bin/env bash
cd "$(dirname "$0")"
cd ../

# Run helper subsplit script ported over from from https://raw.githubusercontent.com/dflydev/git-subsplit/master/git-subsplit.sh
CURRENT_VERSION=`git describe --abbrev=0`
IS_GIT_TAG=`git describe --exact-match HEAD`
CURRENT_BRANCH=`git rev-parse --symbolic-full-name --abbrev-ref HEAD`

# Must be ran from `../` ie `./scripts/update-read-only-git-repos.sh`
if [[ $TRAVIS_TAG || $IS_GIT_TAG ]]; then
  echo "This is a tagged git release so we will update read-only git repos...";

  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/core-php.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/core-php:https://${GH_TOKEN}@github.com/sghoweri/core-php.git \
    --no-heads --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/drupal-modules/bolt_connect:https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git \
    --no-heads --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

else [[ $CURRENT_BRANCH == 'feature/2.x' || $CURRENT_BRANCH == 'feature/1.x' || $CURRENT_BRANCH == 'master' || $CURRENT_BRANCH == 'next/2.x' ]]; then
  echo "This is not a tagged git release so only updating the release-specific branch...";
  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/core-php.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/core-php:https://${GH_TOKEN}@github.com/sghoweri/core-php.git \
    --heads="$CURRENT_BRANCH" --update --no-tags
  rm -rf .subsplit

  echo "Skipping subsplit since we aren't on -tree We are in Travis and this IS NOT a tag build, so we WON'T attempt to update read-only git repos."
  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/drupal-modules/bolt_connect:https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git \
    --heads="$CURRENT_BRANCH" --update --no-tags
  rm -rf .subsplit
fi
