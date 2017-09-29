/* eslint-disable */
// var browserSync = require('browser-sync').get('BrowserSync Server');
// var gulpUglify = require('gulp-uglify/minifier');
// var uglifyJS = require("uglify-js");
// var webpack = require( 'webpack' );

const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const webpack = require('webpack');
const config = require('../../webpack.config');
const releaseConfig = require('../../webpack.config.release');
const fs = require('fs');

const handleWebpackOutput = (err, stats) => {
  if (err) throw new gutil.PluginError('es6Pipeline', err);
  gutil.log('[es6Pipeline]', stats.toString({
    colors: true,
    chunks: false
  }));
};

const getDevCompiler = options => webpack(config(options));

const getReleaseCompiler = options => webpack(releaseConfig(options));

module.exports = function (gulp, config, $, webpackConfig) {

  gulp.task('webpack:build-swiper', 'Compile custom swiper build', function (cb) {
    process.chdir('node_modules/swiper');
    
    const reportOptions = {
      err: true,
      stderr: false,
      stdout: false
    };

    const swiperDepsExist = fs.existsSync('node_modules'),
          isCustomBuilt = fs.existsSync('custom/js/swiper.custom.js');
          
    return gulp.src('')
      .pipe($.plumber({
        errorHandler: $.notify.onError({
          title: 'Pattern Lab Error',
          message: 'Error: <%= error.message %>'
        })
      }))
      
      .pipe(gulpif(!swiperDepsExist, $.exec('npm install')))
      .pipe(gulpif(!isCustomBuilt, $.exec('gulp custom -zoom,effects,lazy-loading')))
      .pipe($.exec.reporter(reportOptions));
  });


  gulp.task('webpack:dev', 'Compile, and bundle JavaScript modules together using WebPack and Babel', (done) => {
    const compiler = getDevCompiler(webpackConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });

  gulp.task('webpack:prod', 'Compile, and bundle JavaScript modules together using WebPack and Babel, Optimized for Production', (done) => {
    const compiler = getReleaseCompiler(webpackConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });
};
