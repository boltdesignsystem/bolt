#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"
cd ../../

npx lerna publish $1 --registry http://localhost:4000 --no-commit-hooks --no-git-reset --verify-access
CURRENT_VERSION=`git describe --abbrev=0`
git push origin :refs/tags/$CURRENT_VERSION
node scripts/update-php-package-versions.js

git add .
git commit --amend
git tag -f $CURRENT_VERSION
git push --force --no-verify
git push --tags --force --no-verify
