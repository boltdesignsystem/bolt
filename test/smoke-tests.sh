#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "$0")" # Start in the root of the repo, even if run from the test dir
cd ../

node ./scripts/lint.js
node ./scripts/unit.js
