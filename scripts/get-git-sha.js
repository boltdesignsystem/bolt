#!/usr/bin/env node
const { gitSha } = require('./utils');
process.stdout.write(gitSha);
