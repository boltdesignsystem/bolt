'use strict';
var browserSync = require("browser-sync").get('BrowserSync Server');
// var gulpUglify = require('gulp-uglify/minifier');
// var uglifyJS = require("uglify-js");
var webpack = require('webpack');

var WebpackDevServer = require("webpack-dev-server");

module.exports = function (gulp, config, $, webpackConfig) {
  
  //var webpackConfig = require('../../webpack.config.js');
  
  gulp.task('webpack-dev-server', 'Hot swappable JavaScript modules for crazy fast local JS development.', function(done){
  
    return gulp.task("webpack-dev-server", function(callback) {
      // modify some webpack config options
        var myConfig = Object.create(webpackConfig);
        myConfig.devtool = "eval";
        myConfig.debug = true;
        
        new WebpackDevServer(webpack(myConfig), {
          publicPath: "/" + myConfig.output.publicPath,
          stats: {
            colors: true
          }
        }).listen(8081, "localhost", function(err) {
          if (err) throw new $.util.PluginError("webpack-dev-server", err);
          $.util.log("[webpack-dev-server]", "http://localhost:8081/webpack-dev-server/index.html");
        });
    });
    
  });
}