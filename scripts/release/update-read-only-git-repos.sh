#!/usr/bin/env bash
cd "$(dirname "$0")"
cd ../../

# Run helper subsplit script ported over from from https://raw.githubusercontent.com/dflydev/git-subsplit/master/git-subsplit.sh
CURRENT_VERSION=`git describe --tags --abbrev=0`
CURRENT_BRANCH=`git rev-parse --symbolic-full-name --abbrev-ref HEAD`

if [ -n "$(git status --porcelain)" ]; then
  echo "Error: your git status is not clean. Aborting release.";
  exit 1;
fi

if [[ $TRAVIS_TAG ]]; then
  echo "This is a tagged git release so we will update read-only git repos...";

  ./scripts/release/git-subsplit.sh init https://$GH_TOKEN@github.com/bolt-design-system/core-php.git
  ./scripts/release/git-subsplit.sh publish --work-dir=$PWD packages/php/shared-twig-extensions:https://$GH_TOKEN@github.com/bolt-design-system/core-php.git \
    --no-heads --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

  ./scripts/release/git-subsplit.sh init https://$GH_TOKEN@github.com/bolt-design-system/bolt_connect.git
  ./scripts/release/git-subsplit.sh publish --work-dir=$PWD packages/php/bolt-connect-drupal-module:https://$GH_TOKEN@github.com/bolt-design-system/bolt_connect.git \
    --no-heads --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

  git checkout $CURRENT_BRANCH # return back to the branch you started on before exiting
  echo "Finished syncing up the remote git repos!";
  exit;

#@todo: update to support future major releases
elif [[ $CURRENT_BRANCH != 'release/2.x' && $CURRENT_BRANCH != 'release/1.x' && $CURRENT_BRANCH != 'master' && $CURRENT_BRANCH != 'next' ]]; then
  echo "This is not a tagged git release or a release-related branch -- skipped updating remote repos!";
  exit;
else
  echo "This is not a tagged git release but it IS a release-related branch -- updating remote repos!"
  ./scripts/release/git-subsplit.sh init https://$GH_TOKEN@github.com/bolt-design-system/core-php.git
  ./scripts/release/git-subsplit.sh publish --work-dir=$PWD packages/php/shared-twig-extensions:https://$GH_TOKEN@github.com/bolt-design-system/core-php.git \
    --heads="$CURRENT_BRANCH" --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

  ./scripts/release/git-subsplit.sh init https://$GH_TOKEN@github.com/bolt-design-system/bolt_connect.git
  ./scripts/release/git-subsplit.sh publish --work-dir=$PWD packages/php/bolt-connect-drupal-module:https://$GH_TOKEN@github.com/bolt-design-system/bolt_connect.git \
    --heads="$CURRENT_BRANCH" --update --tags="$CURRENT_VERSION"
  rm -rf .subsplit

  git checkout $CURRENT_BRANCH # return back to the branch you started on before exiting
  echo "Finished syncing up the remote git repos!";
  exit;
fi
