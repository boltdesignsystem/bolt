#!/usr/bin/env bash
set -Eeuo pipefail

node ./scripts/lint.js
node ./scripts/unit.js
