#!/usr/bin/env bash
# Ran from `..` via `npm run composer:install`, so all paths relative to that, not this directory

if [[ $IN_NETLIFY == 'yes' ]]; then
  echo 'In Netlify, setting up php and composer...'
  source ~/.phpbrew/bashrc
  phpbrew switch `phpbrew list|tail -n1`
  php -v
fi

composer install -d apps/pattern-lab--workshop --prefer-source --no-interaction --no-dev
