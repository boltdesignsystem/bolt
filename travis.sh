#!/usr/bin/env bash
echo "===./travis.sh"
echo "===npm run build"
time npm run build
echo "---done: npm run build"
echo "===npm run deploy"
time npm run deploy
echo "---done: npm run deploy"
echo "===./scripts/update-read-only-git-repos.sh"
time ./scripts/update-read-only-git-repos.sh
echo "---done: ./scripts/update-read-only-git-repos.sh"
echo "---done: travis.sh"
