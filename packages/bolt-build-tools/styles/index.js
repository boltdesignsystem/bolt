import { events } from '@bolt/build-core';
import gulp from 'gulp';
import merge from 'merge';
import autoprefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import duration from 'gulp-duration';
import size from 'gulp-size';
import cleanCSS from 'gulp-clean-css';
import defaultConfig from './config.default';

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const exportJson = require('node-sass-export');
const npmSass = require('npm-sass');
const postcss = require('gulp-postcss');
const stylelint = require('stylelint');
const join = require('path').join;
const scssSyntax = require('postcss-scss');
const sassdoc = require('sassdoc');
const debug = require('debug')('@bolt/build-styles');
const eyeglass = require('eyeglass');
const sassGlob = require('gulp-sass-glob');
const rimraf = require('rimraf');
const gulpif = require('gulp-if');

const postCSS = [
  postcssReporter({ clearReportedMessages: true }),
  autoprefixer()
];

function compileCSS(userConfig) {
  const config = merge({
    postCSS
  }, defaultConfig, userConfig);

  function compileCssTask(done) {
    gulp.src(config.src)
     .pipe(plumber({
       errorHandler(error) {
         notify.onError({
           title: 'CSS <%= error.name %> - Line <%= error.line %>',
           message: '<%= error.message %>'
         })(error);
       }
     }))
    .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
     .pipe(sassGlob())
     .pipe(sass(eyeglass({
       includePaths: [
         'node_modules',
         'packages',
         'sandbox/pattern-library/node_modules',
         'sandbox/styleguide/node_modules'
       ],
       importer: [
         npmSass.importer
       ],
       functions: exportJson(config.dataDest, 'json'),
       outputStyle: 'expanded'
     })).on('error', sass.logError))
     .pipe(postcss(config.postCSS))
     .pipe(duration('CSS Compile Time'))
     .pipe(size({ title: 'Total CSS Size' }))
     .pipe(cleanCSS({
       aggressiveMerging: false,
       advanced: false,
       keepSpecialComments: 0,
       processImport: true
     }))
     .pipe(gulpif(config.sourceMaps, sourcemaps.write('./')))
     .pipe(gulp.dest(config.dest))
     .on('end', () => {
       events.emit('reload', join(config.dest, '**/*.css'));
       done();
     });
  }

  compileCssTask.displayName = 'styles:compile';
  compileCssTask.description = 'Compile Sass to CSS';

  return compileCssTask;
}


function watchCSS(userConfig) {
  function watchCssTask() {
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

    return gulp.watch(src, gulp.parallel(watchTasks));
  }

  watchCssTask.displayName = 'styles:watch';
  watchCssTask.description = 'Watch Sass files for changes to auto-recompile.';

  return watchCssTask;
}


function cleanStyles(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function cleanStylesTask(cb) {
    debug('CSS Cleaned');

    rimraf(`${config.dest}/*`, cb);
  }

  cleanStylesTask.description = 'Clean compiled CSS';
  cleanStylesTask.displayName = 'styles:clean';

  return cleanStylesTask;
}


function sassDoc(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function sassDocTask(cb) {
    gulp.src(['packages/**/*.scss', '!packages/**/node_modules/**/*'])
      .pipe(sassdoc(config.sassdoc))
      .on('end', () => {
        done();
      });
  }

  sassDocTask.description = 'Generate SassDoc docs';
  sassDocTask.displayName = 'styles:sassdoc';

  return sassDocTask;
}


function lintCSS(userConfig) {
  const config = merge({
    postCSS: [
      stylelint(),
      postcssReporter({ clearReportedMessages: true }),
      autoprefixer()
    ]
  }, defaultConfig, userConfig);


  function lintCssTask(done) {
    return gulp.src(config.src)
      .pipe(plumber({
        errorHandler(error) {
          notify.onError({
            title: 'CSS <%= error.name %> - Line <%= error.line %>',
            message: '<%= error.message %>'
          })(error);
        }
      }))
      .pipe(postcss(config.postCSS, {
        syntax: scssSyntax
      }))
      .on('end', () => {
        done();
      });
  }

  lintCssTask.displayName = 'styles:lint';
  lintCssTask.description = 'List CSS description';
  return lintCssTask;
}

export { compileCSS, watchCSS, lintCSS, sassDoc, cleanStyles as cleanCSS };
