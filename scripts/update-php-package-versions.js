#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const lernaVersion = require(path.join(__dirname, '../lerna.json')).version;

const corePhpPath = path.join(__dirname, '../packages/core-php/composer.json');
const corePhp = require(corePhpPath);
corePhp.version = lernaVersion;
fs.writeFileSync(corePhpPath, JSON.stringify(corePhp, null, '  '));

const boltConnectPath = path.join(__dirname, '../packages/drupal-modules/bolt_connect/composer.json');
const boltConnect = require(boltConnectPath);
boltConnect.version = lernaVersion;
boltConnect.require['bolt-design-system/core-php'] = lernaVersion;
fs.writeFileSync(boltConnectPath, JSON.stringify(boltConnect, null, '  '));

console.log('Updated Composer packages to latest Lerna version');
