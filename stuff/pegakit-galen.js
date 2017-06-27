/* globals require */

var gulp = require('gulp'),
    connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    gulpGalen = require('gulp-galenframework');

module.exports = function(gulp, config, webpackConfig) {
  gulp.task('galen', 'Standalone Galen tests for local dev.', function(cb) {
    
  var app = connect().use(serveStatic('public')),
    server = http.createServer(app).listen(8888, function () {
      
      gulp.src('./test/visual/dev.test').pipe(
        gulpGalen.test({
          cwd: './test/visual',
          htmlreport: './test/visual/report',
          junitreport: './test/visual/report/TESTS-Galen.xml'
        })).on('end', function () {
        server.close(function () {
          cb();
        });
      });
      
    });
    
  });
};