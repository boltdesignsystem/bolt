const core = require('@bolt/build-core');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const exportJson = require('node-sass-export');
const npmSass = require('npm-sass');
const postcss = require('gulp-postcss');
const stylelint = require('stylelint');
const join = require('path').join;
const debug = require('debug')('@bolt/build-styles');

import { utils, events } from '@bolt/build-core';
import gulp from 'gulp';
import merge from 'merge';
import autoprefixer from 'autoprefixer';
import defaultConfig from './config.default';
import postcssReporter from 'postcss-reporter';
import duration from 'gulp-duration';
import size from 'gulp-size';

import cleanCSS from 'gulp-clean-css';
// const magicImporter = require('node-sass-magic-importer');
// const scssSyntax = require('postcss-scss');


// const atImport = require('postcss-import');
// const scssSyntax = require('postcss-scss');
// const immutableCss = require('immutable-css');

// const postCssImport = require('postcss-import');

// const path = require('path');
// const discardComments = require('postcss-discard-comments');
// const importPostcss = require('import-postcss');


// const precss = require('precss');
// const config = core.utils.merge({}, defaultConfig, userConfig);
//

const postCSS = [
  // stylelint(),
  postcssReporter({ clearReportedMessages: true }),
  autoprefixer()
];


// let default

// const defaultConfig = require('./config.default');


// module.exports = (userConfig) => {
//   const config = core.utils.merge({}, defaultConfig, userConfig);
//
// }


function compileCSS(userConfig) {
  const config = merge({
    postCSS
  }, defaultConfig, userConfig);

  function _compileCSS(done) {
    gulp.src(config.src)
     .pipe(plumber({
       errorHandler(error) {
         notify.onError({
           title: 'CSS <%= error.name %> - Line <%= error.line %>',
           message: '<%= error.message %>'
         })(error);
       }
     }))
       // .pipe($.env.development($.sourcemaps.init()))
     .pipe(sourcemaps.init())
     .pipe(sass({
       includePaths: ['node_modules', 'packages'],
       importer: [npmSass.importer],
       functions: exportJson(config.dataDest, 'json'),
       outputStyle: 'expanded'
     }).on('error', sass.logError))
     .pipe(postcss(config.postCSS))
     .pipe(duration('CSS Compile Time'))
     .pipe(size({ title: 'Total CSS Size' }))
     .pipe(cleanCSS({
       aggressiveMerging: false,
       advanced: false,
       keepSpecialComments: 0,
       processImport: true
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest(config.dest))
     .on('end', () => {
       events.emit('reload', join(config.dest, '**/*.css'));
       done();
     });
  }


  function compileCssTask(done) {
    _compileCSS(done);
  }
  compileCssTask.displayName = 'styles:compile';
  compileCssTask.description = 'Compile Sass to CSS';

  return compileCssTask;
}


function watchCSS(userConfig) {
  function watchCssTask(done) {
    const config = merge({
      postCSS
    }, defaultConfig, userConfig);

    const watchTasks = [compileCSS(userConfig)];


    // if (config.lint === true) {
    //   watchTasks.push(lintCSS);
    // }
    const src = config.extraWatches
      ? [].concat(config.src, config.extraWatches)
      : config.src;
    // console.log(watchTasks);

    return gulp.watch(src, gulp.parallel(watchTasks));
  }

  watchCssTask.displayName = 'styles:watch';
  watchCssTask.description = 'Watch Sass files for changes to auto-recompile.';

  return watchCssTask;
}


export { compileCSS, watchCSS };


// export { Styles as default };
//
// module.exports = (userConfig) => {
//   const tasks = {};
//   const config = merge({
//     postcss: [
//
//     ]
//   }, defaultConfig, userConfig);
//
//
//   function lintCSS() {
//     gulp.src([
//       'packages/**/*.scss',
//       '!packages/_*/**/*'
//     ])
//       .pipe(plumber({
//         errorHandler(error) {
//           notify.onError({
//             title: 'CSS <%= error.name %> - Line <%= error.line %>',
//             message: '<%= error.message %>'
//           })(error);
//         }
//       }))
//       .pipe(postcss(processors, {
//         syntax: scssSyntax
//       }));
//     // .on('end', () => {
//     //   done();
//     // });
//   }
//   lintCSS.description = 'List CSS description';
//   // tasks.lint = lintCSS;
//
//
//   function compileCSS(done) {
//
//   compileCSS.description = 'Compile CSS';
//   compileCSS.displayName = 'styles:compile';
//   // tasks.compile = compileCSS;
//

//   watchCSS.description = 'Watch CSS for changes';
//   // tasks.watch = watchCSS;
//
//
//   return {
//     lintCSS,
//     compileCSS,
//     watchCSS
//   };
// };


//
//
//
//
// export function compile() {
//
// }
