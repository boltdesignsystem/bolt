'use strict';

const core = require('@theme-tools/core');
const fs = require('fs-extra');
const path = require('path');
const jsondiff = require('jsondiffpatch');
const defaultConfig = require('./config.default');
const getValue = require('./lib/get-value');

module.exports = userConfig => {
  const config = core.utils.merge({}, defaultConfig, userConfig);
  const args = '($file, $value, $options:())';

  const sassFunctions = {};

  sassFunctions[config.asyncName + args] = require('./lib/export-data')(config);
  sassFunctions[config.syncName + args] = require('./lib/export-data-sync')(
    config,
  );
  return sassFunctions;
};
