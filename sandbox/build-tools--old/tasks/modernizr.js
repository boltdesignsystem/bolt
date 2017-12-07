import modernizrConfig from '../modernizr.config';

module.exports = function (gulp, config, $) {
  gulp.task('modernizr', 'Custom modernizr build', done => gulp.src(['source/scripts/*.js'])
      .pipe($.modernizr('modernizr.custom.js', modernizrConfig))
      .pipe(gulp.dest('source/scripts/libs')));
};
