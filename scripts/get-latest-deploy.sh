#!/usr/bin/env bash
# Outputs the latest now.sh deploy
# Start in this directory even if ran elsewhere
cd "$(dirname "$0")"
node -e 'require("./utils").getLatestDeploy().then(x => process.stdout.write(x)).catch(err => process.stdout.write(JSON.stringify(err)))'
