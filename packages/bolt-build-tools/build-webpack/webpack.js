const gutil = require('gulp-util');
const webpack = require('webpack');

module.exports.devConfig = require('./webpack.config');
module.exports.releaseConfig = require('./webpack.config.release');
module.exports.critialPathConfig = require('./webpack.config.critical');

// const devConfig = require('webpack.config');
// const releaseConfig = require('webpack.config.release');

function webpackTask(gulp, devConfig, releaseConfig, critialPathConfig) {
  const getDevCompiler = options => webpack(devConfig(options));
  const getReleaseCompiler = options => webpack(releaseConfig(options));

  const handleWebpackOutput = (err, stats) => {
    if (err) throw new gutil.PluginError('es6Pipeline', err);
    gutil.log('[es6Pipeline]', stats.toString({
      colors: true,
      chunks: false
    }));
  };


  gulp.task('webpack:dev', (done) => {
    const compiler = getDevCompiler(devConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });


  if (critialPathConfig) {
    const getCriticalCompile = options => webpack(critialPathConfig(options));

    gulp.task('webpack:critical', (done) => {
      const compiler = getCriticalCompile(critialPathConfig);
      compiler.run((err, stats) => {
        handleWebpackOutput(err, stats);
        done();
      });
    });
  }


  gulp.task('webpack:prod', (done) => {
    const compiler = getReleaseCompiler(releaseConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });
}
module.exports.webpack = webpackTask;
