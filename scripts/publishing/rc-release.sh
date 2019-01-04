#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!
set -e
cd "$(dirname "$0")" # Start in the scripts/publishing folder, even if run from root directory
cd ../../

CURRENT_BRANCH=`git rev-parse --symbolic-full-name --abbrev-ref HEAD`

if [[ $CURRENT_BRANCH != 'next/2.x' && $CURRENT_BRANCH != 'next/1.x' ]]; then
  echo "Error: cannot publish a pre-release on a branch that's not next/2.x or next/1.x. Aborting the pre-release.";
  exit 1;
fi

./scripts/publishing/before-release.sh #verify everything is good to go before publishing
npx lerna publish $1 --registry http://localhost:4000 --npm-tag next --preid rc --no-commit-hooks --no-git-reset --verify-access --conventional-commits
./scripts/publishing/after-release.sh #post-release work
