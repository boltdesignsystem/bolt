import gulp from 'gulp';
import { compileCSS, watchCSS } from '@bolt/build-styles';

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
    // '!source/_site/**',
    '!source/.sass-cache/**',
  ],
});


const jekyllCssConfig = {
  // root: '.',
  // src: [
  //   'source/**/*.scss'
  // ],
  // dest: './public',
  // jsonDest: './source/_data',
  // extraWatches: '../../packages/*/*.scss'
  root: './',
  src: [
    './source/styles/**/*.scss'
  ],
  dest: './public/styles',
  jsonDest: './source/_data',
  extraWatches: '../../packages/**/*.scss'
  // lint: true
};

const compileJekyllCSS = compileCSS(jekyllCssConfig);
const watchJekyllCSS = watchCSS(jekyllCssConfig);


gulp.task('css', compileJekyllCSS);
gulp.task('jekyll', jekyllTasks.build);
gulp.task('watch:jekyll', jekyllTasks.watch);

gulp.task('default', gulp.series([
  jekyllTasks.build,
  compileJekyllCSS,
  gulp.parallel([
    jekyllTasks.watch,
    watchJekyllCSS,
    browserSyncTasks.serve,
  ]),
]));
