'use strict';
const webpack = require('webpack');
const gutil = require('gulp-util');
const WebpackDevServer = require("webpack-dev-server");

module.exports = function (gulp, config) {

  //var webpackConfig = require('../../webpack.config.js');

  gulp.task('webpack-dev-server', 'Hot swappable JavaScript modules for crazy fast local JS development.', function(done){

    return gulp.task("webpack-dev-server", function(callback) {
      // modify some webpack config options
        var myConfig = Object.create(config);
        myConfig.devtool = "eval";
        myConfig.debug = true;

        new WebpackDevServer(webpack(myConfig), {
          publicPath: "/" + myConfig.output.publicPath,
          stats: {
            colors: true
          }
        }).listen(8081, "localhost", function(err) {
          if (err) throw new gutil.PluginError("webpack-dev-server", err);
          gutil.log("[webpack-dev-server]", "http://localhost:8081/webpack-dev-server/index.html");
        });
    });

  });
}
