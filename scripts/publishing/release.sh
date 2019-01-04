#!/bin/bash
# Borrowed with gratitude from Create React App by Facebook; thanks!
set -e
cd "$(dirname "$0")" # Start in the scripts/publishing folder, even if run from root directory
cd ../../

./scripts/publishing/before-release.sh #verify everything is good to go before publishing
npx lerna publish $1 --registry http://localhost:4000 --no-commit-hooks --no-git-reset --verify-access
./scripts/publishing/after-release.sh #post-release work
