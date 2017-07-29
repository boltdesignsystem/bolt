'use strict';

const gulp = require('gulp');
// Default config at `node_modules/@theme-tools/plugin-browser-sync/config.default.js`
const browserSyncTasks = require('@theme-tools/plugin-browser-sync')({
  baseDir: 'public',
  watchFiles: ['public'],
});
// Default config at `node_modules/@theme-tools/plugin-pattern-lab-php/config.default.js`
const jekyllTasks = require('@theme-tools/plugin-jekyll')({
  cwd: 'source',
  watch: [
    'source/**',
    //'!source/_site/**',
    '!source/.sass-cache/**',
  ],
});



var cssTasks = require('../../packages/build-tools/styles')(gulp, {
  root: '.',
  src: [
    'source/**/*.scss'
  ],
  dest: './public',
  jsonDest: './source/_data',
  extraWatches: '../../packages/*/*.scss'
  // lint: true
});

gulp.task('css', cssTasks.compile);
gulp.task('jekyll', jekyllTasks.build);
gulp.task('watch:jekyll', jekyllTasks.watch);

gulp.task('default', gulp.series([
  jekyllTasks.build,
  cssTasks.compile,
  gulp.parallel([
    jekyllTasks.watch,
    cssTasks.watch,
    browserSyncTasks.serve,
  ]),
]));
