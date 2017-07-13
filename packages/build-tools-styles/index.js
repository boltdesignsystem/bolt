'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const jsonExporter = require('node-sass-export');
const npmSass = require('npm-sass');
const postcss = require('gulp-postcss');
const path = require('path');
// const scssSyntax = require('postcss-scss');
// const immutableCss = require('immutable-css');

// const postCssImport = require('postcss-import');
// const duration = require('gulp-duration');
// const size = require('gulp-size');
// const cleanCSS = require('gulp-clean-css');
// const path = require('path');
const smartImport = require('postcss-smart-import');
// const discardComments = require('postcss-discard-comments');
// const importPostcss = require('import-postcss');


const postcssReporter = require('postcss-reporter');
// const atImport = require('postcss-import');
const stylelint = require('stylelint');
const scssSyntax = require('postcss-scss');
const easyImport = require("postcss-easy-import");
const merge = require('merge');
const defaultConfig = require('./config.default');
const autoprefixer = require('autoprefixer');
// const precss = require('precss');



module.exports = (gulp, userConfig, $) => {
  
  const tasks = {};
  const config = merge({
    postcss: [
      
    ]
  }, defaultConfig, userConfig);
  
  
  var processors = [
    stylelint(),
    postcssReporter({ clearReportedMessages: true })
  ];
  
  function lintCSS() {
    gulp.src([
      'packages/**/*.scss',
      '!packages/_*/**/*'
    ])
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title: 'CSS <%= error.name %> - Line <%= error.line %>',
          message: '<%= error.message %>'
        })(error);
      }
    }))
    .pipe(postcss(processors, {
      syntax: scssSyntax
    }));
    // .on('end', () => {
    //   done();
    // });
  }
  tasks.lint = lintCSS;
  
  
  
  function compileCSS(done) {
      
      gulp.src(config.src)
        .pipe(plumber({
          errorHandler: function (error) {
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
          importer: npmSass.importer,
          // importer: [magicImporter(magicImporterOptions)],
          outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(postcss(config.postcss))
        // .pipe(duration('CSS Compile Time'))
        
        // .pipe(size({title: 'Total CSS Size'}))
        // .pipe(gulp.dest('./styles'))
        // .pipe(cleanCSS({
        //   aggressiveMerging: false,
        //   advanced: false,
        //   keepSpecialComments: 0,
        //   processImport: true
        // }))
        // .pipe(gulp.dest('./'))
        .pipe(sourcemaps.write(config.dest))
        .pipe(gulp.dest(config.dest))
        .on('end', () => {
          // core.events.emit('reload', join(config.dest, '**/*.css'));
          done();
        });
  }
  tasks.compile = compileCSS;
  
  
  
  function watchCSS() {
    let watchTasks = [compileCSS];
    if (config.lint === true){
      watchTasks.push(lintCSS);
    }
    const src = config.extraWatches
        ? [].concat(config.src, config.extraWatches)
        : config.src;
    // console.log(watchTasks);
    
    return gulp.watch(src, gulp.parallel(watchTasks));
  }
  tasks.watch = watchCSS;
  
  
  return tasks;
}