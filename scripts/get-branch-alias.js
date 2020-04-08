#!/usr/bin/env node
const { branchName } = require('./utils/branch-name');
const { normalizeUrlAlias } = require('./utils/normalize-url-alias');

const alias = normalizeUrlAlias(branchName).trim();
process.stdout.write(alias);
