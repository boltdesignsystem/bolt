#!/usr/bin/env node
// This is ran as a git precommit hook as it is the only way to hook into when `lerna publish` has updated versions and is about to commit and tag the results.
// We want to update php dependencies versions as well.
const path = require('path');
const fs = require('fs');
const argv = require('yargs').argv;
const yaml = require('js-yaml');
let lernaVersion;

if (argv.v) {
  lernaVersion = argv.v;
} else {
  lernaVersion = require(path.join(__dirname, '../../lerna.json')).version;
}

const corePhpPath = path.join(
  __dirname,
  '../../packages/twig-integration/twig-extensions-shared/composer.json',
);
const corePhp = require(corePhpPath);
corePhp.version = lernaVersion;
fs.writeFileSync(corePhpPath, JSON.stringify(corePhp, null, '  '));

const boltConnectPath = path.join(
  __dirname,
  '../../packages/twig-integration/drupal-module/bolt_connect/composer.json',
);
const boltConnect = require(boltConnectPath);
boltConnect.version = lernaVersion;
boltConnect.require['bolt-design-system/core-php'] = lernaVersion;
fs.writeFileSync(boltConnectPath, JSON.stringify(boltConnect, null, '  '));

const boltConnectInfoPath = path.join(
  __dirname,
  '../../packages/twig-integration/drupal-module/bolt_connect.info.yml',
);
const boltConnectInfo = yaml.safeLoad(fs.readFileSync(boltConnectInfoPath));
boltConnectInfo.version = lernaVersion;
fs.writeFileSync(boltConnectInfoPath, yaml.safeDump(boltConnectInfo), 'utf8');
