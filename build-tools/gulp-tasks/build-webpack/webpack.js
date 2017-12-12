const gutil = require('gulp-util');
const webpack = require('webpack');

module.exports.devConfig = require('./webpack.config');
module.exports.releaseConfig = require('./webpack.config.release');
// module.exports.releaseConfig.es6 = require('./webpack.config.release.es6');

// const devConfig = require('webpack.config');
// const releaseConfig = require('webpack.config.release');

function webpackTask(gulp, devConfig, releaseConfig) {
  const getDevCompiler = options => webpack(devConfig(options));
  const getReleaseCompiler = options => webpack(releaseConfig(options));

  const handleWebpackOutput = (err, stats, verbose) => {
    if (err) throw new gutil.PluginError('es6Pipeline', err);
    gutil.log('[es6Pipeline]', stats.toString({
      colors: true,
      chunks: false,
      assets: verbose,
      version: verbose,
      modules: verbose,
      timings: verbose,
    }));
  };


  gulp.task('webpack:dev', (done) => {
    const compiler = getDevCompiler(devConfig.webpack ? devConfig.webpack : devConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats, false);
      done();
    });
  });


  gulp.task('webpack:prod', (done) => {
    const compiler = getReleaseCompiler(releaseConfig.webpack ? releaseConfig.webpack : releaseConfig);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats, true);
      done();
    });
  });





  // Copy built js files to PL
  gulp.task('webpack:copypl', (done) => {
    gulp.src('src/components/bolt-*/dist/**/*.js')
      .pipe(gulp.dest('./dist/scripts'))
  });


  // Watch webpack-compiled files for changes
  gulp.task('webpack:watch-components', () => {
    gulp.watch([
      'src/components/bolt-*/dist/**/*.js'
    ], gulp.parallel([
      'webpack:copypl'
    ]));
  });





  // Watch webpack-compiled files for changes
  gulp.task('webpack:watch', () => {
    gulp.watch([
      'src/scripts/**/*.js',
      'src/_patterns/**/src/*.js'
    ], gulp.parallel([
      process.env.NODE_ENV === 'production' ? 'webpack:prod' : 'webpack:dev',
    ]));
  });
}
module.exports.webpack = webpackTask;
