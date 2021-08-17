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

echo "Updating remote subsplit repos"
./scripts/release/git-subsplit.sh init https://$GH_TOKEN@github.com/bolt-design-system/core-php.git
./scripts/release/git-subsplit.sh publish --work-dir=$PWD packages/twig-integration/twig-extensions-shared:https://$GH_TOKEN@github.com/bolt-design-system/core-php.git \
  --heads="$CURRENT_BRANCH" --update --tags="$CURRENT_VERSION"
rm -rf .subsplit

./scripts/release/git-subsplit.sh init https://$GH_TOKEN@github.com/bolt-design-system/bolt_connect.git
./scripts/release/git-subsplit.sh publish --work-dir=$PWD packages/twig-integration/drupal-module:https://$GH_TOKEN@github.com/bolt-design-system/bolt_connect.git \
  --heads="$CURRENT_BRANCH" --update --tags="$CURRENT_VERSION"
rm -rf .subsplit

git checkout $CURRENT_BRANCH # return back to the branch you started on before exiting
echo "Finished syncing to the remote git repos";
exit;
