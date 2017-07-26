import gulp from 'gulp';
import { compileCSS, watchCSS, cleanCSS } from '../../index.js';

const config = {
  src: [
    'scss/**/*.scss',
    '!scss/**/_*.scss'
  ],
  dest: 'dest/',
  sassdoc: {
    enabled: false,
  }
};


gulp.task('styles:compile', compileCSS(config));
gulp.task('styles:watch', watchCSS(config));
gulp.task('styles:clean', cleanCSS(config));

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
