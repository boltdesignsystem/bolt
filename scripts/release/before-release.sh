#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!
set -e
cd "$(dirname "$0")" # Start in the scripts/release folder, even if run from root directory
cd ../../

if [ -n "$(git status --porcelain)" ]; then
  echo "Error: your git status is not clean. Aborting release.";
  exit 1;
fi

# remove the temp verdaccio folder before publishing or running through any tests
# rm -rf ./scripts/release/verdaccio/storage/@bolt 

npm run lint
npm run test

echo 'Finished release pre-checks!';
