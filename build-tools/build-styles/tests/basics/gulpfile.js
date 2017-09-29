const gulp = require('gulp');
const styles = require('@bolt/build-styles');

const config = {
  src: [
    'scss/**/*.scss',
    '!scss/**/_*.scss'
  ],
  dest: 'dest',
  sassdoc: {
    enabled: false,
  },
  glob: true
};


gulp.task('styles:compile', styles.compile(config));
gulp.task('styles:watch', styles.watch(config));
gulp.task('styles:clean', styles.clean(config));

gulp.task('compile', gulp.series([
  'styles:clean',
  'styles:compile',
]));

gulp.task('default', gulp.series([
  'styles:clean',
  gulp.parallel([
    'styles:compile',
  ]),
  'styles:watch',
]));
