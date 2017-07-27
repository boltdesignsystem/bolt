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
    '!source/_site/**',
    '!source/.sass-cache/**',
  ],
});

const cssTasks = require('@theme-tools/plugin-sass')({
  src: [
    'source/styles/**/*.scss',
  ],
  dest: 'public/styles',
  lint: {
    enabled: false,
  },
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
