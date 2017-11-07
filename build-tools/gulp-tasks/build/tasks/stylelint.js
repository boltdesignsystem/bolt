'use strict';
var autoprefixer = require('autoprefixer');
var atImport = require("postcss-import");
var assets  = require('postcss-assets');
var stylelint = require('stylelint');
var postcssSCSS = require("postcss-scss");
var postcssReporter = require('postcss-reporter');
var stylelintConfig = require('../../.stylelintrc.json');

var processors = [
  // assets({
  //   basePath: 'source/',
  //   loadPaths: ['fonts/', 'images/']
  // }),
  atImport({
    skipDuplicates: false,
    root: '../../'
  }),
  stylelint(stylelintConfig),
  postcssReporter({ clearMessages: true })
];


module.exports = function (gulp, config, $) {
  
  gulp.task('stylelint', 'Lint Sass via Stylelint',   function(done){
    return gulp.src([
    // './source/styles/**/*.scss',
    './source/styles/06-components/*.scss',
    '!/source/styles/patternlab.scss'
    ])
    .pipe($.plumber({
      errorHandler: function (error) {
        $.notify.onError({
          title: 'CSS <%= error.name %> - Line <%= error.line %>',
          message: '<%= error.message %>'
        })(error);
      }
    }))
    .pipe($.postcss(processors, {
      syntax: postcssSCSS
    }));
  });
};