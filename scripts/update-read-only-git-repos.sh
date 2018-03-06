#!/usr/bin/env bash
# Must be ran from `../` ie `./scripts/update-read-only-git-repos.sh`
# if we have the remote `core-php` cool, if not, then let's add it
git remote show core-php || git remote add --fetch core-php git@github.com:bolt-design-system/core-php.git
# push updates to https://github.com/bolt-design-system/core-php
git subtree push --prefix=packages/core-php core-php master
