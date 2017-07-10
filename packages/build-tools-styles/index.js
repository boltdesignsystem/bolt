'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
// const postcss = require('gulp-postcss');
// const duration = require('gulp-duration');
// const size = require('gulp-size');
// const cleanCSS = require('gulp-clean-css');
const magicImporter = require('node-sass-magic-importer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const jsonExporter = require('node-sass-export');
// const path = require('path');

module.exports = (gulp, config, $) => {
  
  const tasks = {};
  // var onlyPath = require('path').dirname(config.src[0]);
  // console.log(process.cwd());

  var magicImporterOptions = {
    // Defines the path in which your node_modules directory is found.
    cwd: config.root || process.cwd(),
    // Paths in which to search for imported files.
    includePaths: [
      // process.cwd(), 
      // process.cwd() + '/' + 'packages'
      config.root || process.cwd()
    ],
    // Allowed extensions.
    extensions: [
      '.scss',
      '.sass'
    ],
    // Define the package.json keys and in which order to search for them.
    packageKeys: [
      'sass',
      'scss',
      'style',
      'css',
      'main.sass',
      'main.scss',
      'main.style',
      'main.css',
      'main'
    ],
    // You can set the special character for indicating a module resolution.
    prefix: '~',
    // Disable console warnings.
    disableWarnings: false,
    // Disable importing files only once.
    disableImportOnce: true
  };
  
  
  
  
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
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules', 'packages'],
      importer: [magicImporter(magicImporterOptions)],
      outputStyle: 'expanded',
      // functions: jsonExporter(config.jsonDest, 'jsonexport')
    }).on('error', sass.logError))
    // .pipe(postcss(processors))
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
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .on('end', () => {
      // core.events.emit('reload', join(config.dest, '**/*.css'));
      done();
    });
  }
  tasks.compile = compileCSS;
  
  
  
  function watchCSS() {
    gulp.watch('packages/**/*.scss', gulp.parallel(compileCSS));
  }
  tasks.watch = watchCSS;
  
  
  return tasks;
}