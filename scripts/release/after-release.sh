#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!
set -e
cd "$(dirname "$0")" # Start in the scripts/release folder, even if run from root directory
cd ../../

CURRENT_VERSION=`git describe --abbrev=0`
git push origin :refs/tags/$CURRENT_VERSION
node scripts/release/update-php-package-versions.js

git add .
git commit --amend --no-edit
git tag -f $CURRENT_VERSION
git push --no-verify
git push --tags --no-verify

## Update snapshot tests that depend on 
./scripts/release/update-read-only-git-repos.sh
