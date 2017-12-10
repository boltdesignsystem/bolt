'use strict';

var shell = require('gulp-shell');
var backstopConfig = require('../backstop.json');

module.exports = function(gulp, options) {
  gulp.task('backstop:ref', shell.task([
    'cd node_modules/backstopjs; npm run reference'
  ]));

  gulp.task('backstop:test', shell.task([
    'cd node_modules/backstopjs; npm run test'
  ]));
};