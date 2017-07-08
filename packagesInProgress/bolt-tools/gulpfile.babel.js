const gulp = require('gulp-help')(require('gulp'));
const _ = require('lodash');
let localConfig = {};

// Attempt to load an optional local configuration file.
try {
  localConfig = require('./local.gulp-config');
}
catch (e) {}

// Load all gulp tasks.
require('./index')(gulp, localConfig);