#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!
set -e
cd "$(dirname "$0")" # Start in the scripts/release folder, even if run from root directory
cd ../../

CURRENT_VERSION=`git describe --tags --abbrev=0`
git push origin :refs/tags/$CURRENT_VERSION
node scripts/release/update-php-package-versions.js
npm run dependencies:update

find . -name '.incache' -exec rm -rf {} + # clear .incache file when doing a release
npm run setup
npm run build # regenerate the whole site so dropdown + cached result is always up to date
git add . # add to version control

git commit --amend --no-edit
git tag -fa $CURRENT_VERSION -m $CURRENT_VERSION
git push --no-verify
git push --tags --force --no-verify

## Update snapshot tests that depend on 
./scripts/release/update-read-only-git-repos.sh
