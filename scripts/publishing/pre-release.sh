#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"
cd ../../

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
# set -e

# # Echo every command being executed
# set -x

# # Go to root
# cd ..
# root_path=$PWD

# if [ -n "$(git status --porcelain)" ]; then
#   echo "Your git status is not clean. Aborting.";
#   exit 1;
# fi

# Compile
# cd packages/react-error-overlay/
# npm run build:prod
# cd ../..
# Go!
# ./node_modules/.bin/lerna publish "$@"

# echo "About to publish $1"

# --amend
# lerna version --amend

# npx lerna version --registry http://localhost:4000 
# npx lerna publish from-package --registry http://localhost:4000 --canary

PREV_VERSION=`git describe --abbrev=0`
npx lerna publish --registry http://localhost:4000 --npm-tag next --preid rc --no-commit-hooks --no-git-reset --verify-access
CURRENT_VERSION=`git describe --abbrev=0`
git push origin :refs/tags/v$CURRENT_VERSION
node scripts/update-php-package-versions.js

# ./update-read-only-git-repos.sh

# rm -rf verdaccio/
# killall verdaccio
# exit 1;

git add .
git commit -m "v$CURRENT_VERSION"
git tag -fa v$CURRENT_VERSION
git push --force
git push --tags --force

