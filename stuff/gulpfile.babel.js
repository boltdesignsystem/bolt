const gulp = require('gulp-help')(require('gulp'));
const _ = require('lodash');


let localConfig = {},
  webpackConfig = {};

// Attempt to load an optional local configuration file.
try {
  localConfig = require('./local.gulp-config');
} catch (e) {}


// Attempt to load an optional local configuration file.
try {
  webpackConfig = require('./local.webpack.config.js');
} catch (e) {}


// Load all gulp tasks.
require('./pegakit-build-tools')(gulp, localConfig, webpackConfig);
