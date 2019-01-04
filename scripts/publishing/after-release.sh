#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!
set -e
cd "$(dirname "$0")" # Start in the scripts/publishing folder, even if run from root directory
cd ../../

CURRENT_VERSION=`git describe --abbrev=0`
git push origin :refs/tags/$CURRENT_VERSION
node scripts/update-php-package-versions.js

git add .
git commit --amend --no-edit
git tag -f $CURRENT_VERSION
git push --force --no-verify
git push --tags --force --no-verify

## Update snapshot tests that depend on 
./scripts/update-read-only-git-repos.sh
