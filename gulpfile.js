const gulp = require('gulp');
require('./build-tools/gulp-tasks/gulpfile.js')(gulp);


const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');

gulp.task('patternlab:server', function () {
  connect.server({
    base: './'
  }, function _connected_callback() {
    console.log("PHP Development Server Connected.");
  });
});



gulp.task('patternkit:server', function () {
  connect.server({
    base: './server',
    port: '8080'
  }, function _connected_callback() {
    console.log("PHP Development Server Connected.");
  });
});