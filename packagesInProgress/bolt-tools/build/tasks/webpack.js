'use strict';
var browserSync = require("browser-sync").get('BrowserSync Server');
// var gulpUglify = require('gulp-uglify/minifier');
// var uglifyJS = require("uglify-js");
var stream = require('webpack-stream');



module.exports = function (gulp, config, $, webpackConfig) {
  
  //var webpackConfig = require('../../webpack.config.js');
  
  var myConfig = Object.create(webpackConfig);
  // myConfig.devtool = "eval";
  myConfig.debug = true;
  
  
  gulp.task('webpack', 'Minify, compile, and bundle JavaScript modules together using WebPack, Babel and UglifyJS.', function(done){
    return gulp.task('webpack', [], function() {
      return gulp.src(['source/scripts/**/*.js']) // gulp looks for all source files under specified path
      .pipe($.plumber({
        errorHandler: $.notify.onError({
          title: "Webpack Error",
          message: "Error: <%= error.message %>"
        })
      }))
      .pipe($.env.development($.sourcemaps.init())) // creates a source map which would be very helpful for debugging by maintaining the actual source code structure
      .pipe(stream(webpackConfig)) // blend in the webpack config into the source files
      // .pipe(uglifyJS({
      //   
      // }))// minifies the code for better compression
      .pipe($.env.development($.sourcemaps.write()))
      .pipe(gulp.dest('public/scripts'))
      .pipe($.env.development(browserSync.reload({stream: true})));
    });
  });
  
  
};