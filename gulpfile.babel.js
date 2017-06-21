'use strict';

const gulp = require('gulp');
// Default config at `node_modules/@theme-tools/plugin-sass/config.default.js`
// const cssTasks = require('@theme-tools/plugin-sass')({
//   src: [
//     'pattern-lab/source/_scss/**/*.scss'
//   ],
//   dest: 'assets',
//   lint: {
//     enabled: false
//   }
// });

// Default config at `node_modules/@theme-tools/plugin-browser-sync/config.default.js`
const browserSyncTasks = require('@theme-tools/plugin-browser-sync')({
  // startPath: 'pattern-lab/public'
  startPath: 'public'
});
// // Default config at `node_modules/@theme-tools/plugin-pattern-lab-php/config.default.js`
// const patternLabTasks = require('@theme-tools/plugin-pattern-lab-php')({
//   configFile: 'pattern-lab/config/config.yml'
// });

// const jsTasks = require('@theme-tools/plugin-js-concat-babel')({
//   src: [
//     'js/**/*.js'
//   ],
//   dest: 'assets',
//   babelConfig: {
//     presets: ['babel-preset-es2015'].map(require.resolve)
//   }
// });
// 
// gulp.task('validate:js', jsTasks.validate);
// gulp.task('js', jsTasks.compile);
// gulp.task('fix:js', jsTasks.fix);
// gulp.task('clean:js', jsTasks.clean);
// gulp.task('watch:js', jsTasks.watch);
// 
// gulp.task('css', cssTasks.compile);
// gulp.task('pl', patternLabTasks.compile);

// gulp.task('compile', gulp.series([
//   cssTasks.clean,
//   jsTasks.clean,
//   gulp.parallel([
//     'js',
//     'css',
//     'pl'
//   ])
// ]));

gulp.task('default', gulp.series([
  // 'compile',
  gulp.parallel([
    // patternLabTasks.watch,
    // cssTasks.watch,
    // jsTasks.watch,
    browserSyncTasks.serve
  ])
]));
