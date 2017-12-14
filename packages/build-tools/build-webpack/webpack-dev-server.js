const webpack = require('webpack');
const gutil = require('gulp-util');
const WebpackDevServer = require('webpack-dev-server');

module.exports = function (gulp, config) {
  gulp.task('webpack-dev-server', 'Hot swappable JavaScript modules for crazy fast local JS development.', done => gulp.task('webpack-dev-server', (callback) => {
    // modify some webpack config options
    const myConfig = Object.create(config);
    myConfig.devtool = 'eval';
    myConfig.debug = true;

    new WebpackDevServer(webpack(myConfig), {
      publicPath: `/${myConfig.output.publicPath}`,
      stats: {
        colors: true
      }
    }).listen(8081, 'localhost', (err) => {
      if (err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('[webpack-dev-server]', 'http://localhost:8081/webpack-dev-server/index.html');
    });
  }));
};
