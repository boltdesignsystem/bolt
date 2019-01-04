#!/usr/bin/env bash
cd "$(dirname "$0")"
cd ../
# Must be ran from `../` ie `./scripts/update-read-only-git-repos.sh`
# if [[ $TRAVIS == 'true' ]]; then
#   if [[ $TRAVIS_TAG ]]; then
#     echo "We are in Travis and this is a tagged release for $TRAVIS_TAG so we will update read-only git repos...";
#   else
#     echo "We are in Travis and this IS NOT a tag build, so we WON'T attempt to update read-only git repos."
#     exit 0;
#   fi
# fi
# Run helper subsplit script ported over from from https://raw.githubusercontent.com/dflydev/git-subsplit/master/git-subsplit.sh

./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/core-php.git
./scripts/git-subsplit.sh publish --work-dir=$PWD packages/core-php:https://${GH_TOKEN}@github.com/sghoweri/core-php.git \
  --heads="master, release/1.x, release/2.x, prerelease/2.x" --update --tags="$TRAVIS_TAG"
rm -rf .subsplit

./scripts/git-subsplit.sh init https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git
./scripts/git-subsplit.sh publish --work-dir=$PWD packages/drupal-modules/bolt_connect:https://${GH_TOKEN}@github.com/sghoweri/bolt_connect.git \
  --heads="master, release/1.x, release/2.x, prerelease/2.x" --update --tags="$TRAVIS_TAG"
rm -rf .subsplit