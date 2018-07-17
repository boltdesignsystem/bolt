#!/usr/bin/env node
'use strict';
var semver = require('semver');
var currentNodeVersion = process.versions.node;

// The minimum we want is node v8.9.0 which is LTS Carbon, released Oct 2017
if (semver.lt(currentNodeVersion, '8.9.0')) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Bolt CLI requires Node 8.9.0 (LTS Carbon) or higher. \n' +
      'Please update your version of Node: https://nodejs.org/en/',
  );
  process.exit(1);
}

require('./cli');
