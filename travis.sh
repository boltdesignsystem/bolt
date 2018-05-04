#!/usr/bin/env bash
echo "===./travis.sh"
echo "===yarn run build"
time yarn run build
echo "---done: yarn run build"
echo "===yarn run deploy"
time yarn run deploy
echo "---done: yarn run deploy"
echo "===./scripts/update-read-only-git-repos.sh"
time ./scripts/update-read-only-git-repos.sh
echo "---done: ./scripts/update-read-only-git-repos.sh"
echo "---done: travis.sh"
