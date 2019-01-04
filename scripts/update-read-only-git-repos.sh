#!/usr/bin/env bash
cd "$(dirname "$0")"
cd ../

# Run helper subsplit script ported over from from https://raw.githubusercontent.com/dflydev/git-subsplit/master/git-subsplit.sh
CURRENT_VERSION=`git describe --abbrev=0`
CURRENT_BRANCH=`git rev-parse --symbolic-full-name --abbrev-ref HEAD`

if [ -n "$(git status --porcelain)" ]; then
  echo "Error: your git status is not clean. Aborting release.";
  exit 1;
fi

if [[ $TRAVIS_TAG ]]; then
  echo "This is a tagged git release so we will update read-only git repos...";

  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/core-php.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/core-php:https://${GH_TOKEN}@github.com/sghoweri/core-php.git \
    --no-heads --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/drupal-modules/bolt_connect:https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git \
    --no-heads --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

#@todo: update to support future major releases
elif [[ $CURRENT_BRANCH != 'release/2.x' && $CURRENT_BRANCH != 'release/1.x' && $CURRENT_BRANCH != 'master' && $CURRENT_BRANCH != 'next/2.x' && $CURRENT_BRANCH != 'next/3.x' ]]; then
  echo "This is not a tagged git release or a release-related branch -- skipped updating remote repos!";
  exit;
else
  echo "This is not a tagged git release but it IS a release-related branch -- updating remote repos!"
  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/core-php.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/core-php:https://${GH_TOKEN}@github.com/sghoweri/core-php.git \
    --heads="$CURRENT_BRANCH" --update --no-tags
  rm -rf .subsplit

  ./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git
  ./scripts/git-subsplit.sh publish --work-dir=$PWD packages/drupal-modules/bolt_connect:https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git \
    --heads="$CURRENT_BRANCH" --update --no-tags
  rm -rf .subsplit
fi
