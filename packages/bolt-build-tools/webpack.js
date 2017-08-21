const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const webpack = require('webpack');
const config = require('../webpack.config');
const releaseConfig = require('../webpack.config.release');
const fs = require('fs');
const plumber = require('gulp-plumber');
const exec = require('gulp-exec');

const handleWebpackOutput = (err, stats) => {
  if (err) throw new gutil.PluginError('es6Pipeline', err);
  gutil.log('[es6Pipeline]', stats.toString({
    colors: true,
    chunks: false
  }));
};

const getDevCompiler = options => webpack(config(options));
const getReleaseCompiler = options => webpack(releaseConfig(options));


module.exports = function (gulp, webpackConfig) {

  gulp.task('webpack:dev', (done) => {
    const compiler = getDevCompiler(webpackConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });

  gulp.task('webpack:prod', (done) => {
    const compiler = getReleaseCompiler(releaseConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });
};
