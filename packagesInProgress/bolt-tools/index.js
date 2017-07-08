/* globals require */


module.exports = function(gulp, config, webpackConfig) {
  
  require('dotenv').config();
  
  // var gulp = require('gulp-help')(require('gulp'));
  // var argv = require('yargs').argv;
  var runSequence = require('run-sequence').use(gulp);
  var spawn = require('child_process').spawn;
  
  
  var defaultConfig = require('./gulp-config');
  var _ = require('lodash');
  var config = _.defaultsDeep(defaultConfig, config);
  
  if (!webpackConfig){
    webpackConfig = require('./webpack.config.js');
  } 
  

  global.$ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'yargs'],
    rename: {
      'gulp-clean-css': 'cleanCSS',
      'gulp-inline-fonts': 'inlineFonts',
      'gulp-environments': 'env',
      'yargs': 'yargs',
      'gulp-if': 'gulpif',
      'gulp-util': 'util'
    },
    lazy: false
  });
  $.argv = $.yargs.argv;

  if ($.argv.prod){
    $.util.log($.util.colors.green('Build Mode: Production'));
    $.env.current($.env.production);
  } else {
    $.util.log($.util.colors.green('Build Mode: Development'));
    $.env.current($.env.development);
  }
    
  // require('gulp-import-tasks')({
  //   dir: 'build/tasks',
  //   extensions: ['.js'],
  //   params: [
  //     config, $
  //   ]
  // });
  require("./build/tasks/copy")(gulp, config, $);
  require("./build/tasks/browsersync")(gulp, config, $);
  require("./build/tasks/styles")(gulp, config, $);
  require("./build/tasks/watch")(gulp, config, $);
  require("./build/tasks/webpack")(gulp, config, $, webpackConfig);
  require("./build/tasks/svgstore")(gulp, config, $);
  require("./build/tasks/autoreload")(gulp, config, $);
  require("./build/tasks/email-templates")(gulp, config, $);
  require("./build/tasks/patternlab")(gulp, config, $);
  require("./build/tasks/penthouse")(gulp, config, $);
  require("./build/tasks/release")(gulp, config, $);
  require("./build/tasks/images")(gulp, config, $);
  require("./build/tasks/stylelint")(gulp, config, $);
  require("./build/tasks/download-icons")(gulp, config, $);
  require("./build/tasks/webpack-dev-server")(gulp, config, $, webpackConfig);


  gulp.task('default', 'Starts up the front-end workflow / build process for local development. Same as just running `gulp`.', function(cb) {
    runSequence(['autoreload'], cb);
  });

  gulp.task('serve', 'Exact same thing as `gulp` or `gulp default`, just without autoreloading.', function(cb) {
    runSequence(['copy:fonts', 'download-all-icons', 'browsersync', 'patternlab', 'styles', 'svgstore', 'email-templates', 'webpack', 'watch'], cb);
  });
  
  gulp.task('serve:proxy', 'Proxy a local Drupal instance but also inject CSS and JS changes.', function(cb) {
    runSequence(['copy:fonts', 'browsersync:proxy', 'styles', 'svgstore', 'webpack', 'watch:proxy'], cb);
  });


  gulp.task('build', 'Standalone Gulp build for production. Good for building FE assets without the local dev environment.', function(cb) {
    $.env.current($.env.production);
    
    runSequence(['copy:fonts', 'download-all-icons', 'styles', 'svgstore', 'webpack', 'email-templates'], 'patternlab', cb);
  });



  //Copied code from Pattern Lab starter build. Need to process.
  // var yaml = require('js-yaml');
  // var fs = require('fs');
  // var config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
  
  
  // var tasks = {
  //   compile: [],
  //   watch: [],
  //   validate: [],
  //   clean: [],
  //   default: []
  // };

  // var tasks = {
  //   'compile': [],
  //   'watch': [],
  //   'validate': [],
  //   'clean': [],
  //   'default': []
  // };
  // require('p2-theme-core')(gulp, config, tasks);
  // 
  // gulp.task('compile', tasks.compile);
  // gulp.task('clean', tasks.clean);
  // gulp.task('validate', tasks.validate);
  // gulp.task('watch', tasks.watch);
  // tasks.default.push('watch');
  // gulp.task('default', tasks.default);

  // 
  // gulp.task('help', helptext({
  //   'default': 'Shows the help message',
  //   'help': 'This help message',
  //   'styles': 'Compiles stylus',
  //   'lint': 'Runs JSHint on your code',
  //   'server': 'Start the development server'
  // }));

};