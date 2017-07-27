// const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const exportJson = require('node-sass-export');
const npmSass = require('npm-sass');
const postcss = require('gulp-postcss');
const magicImporter = require('node-sass-magic-importer');
// const scssSyntax = require('postcss-scss');
// const immutableCss = require('immutable-css');

// const postCssImport = require('postcss-import');
// const duration = require('gulp-duration');
// const size = require('gulp-size');
// const cleanCSS = require('gulp-clean-css');
// const path = require('path');
// const discardComments = require('postcss-discard-comments');
// const importPostcss = require('import-postcss');


const postcssReporter = require('postcss-reporter');
// const atImport = require('postcss-import');
const stylelint = require('stylelint');
const scssSyntax = require('postcss-scss');
const merge = require('merge');
const defaultConfig = require('./config.default');
const autoprefixer = require('autoprefixer');
// const precss = require('precss');


module.exports = (gulp, userConfig) => {
  const tasks = {};
  const config = merge({
    postcss: [

    ]
  }, defaultConfig, userConfig);


  const processors = [
    stylelint(),
    postcssReporter({ clearReportedMessages: true }),
    autoprefixer()
  ];

  function lintCSS() {
    gulp.src([
      'packages/**/*.scss',
      '!packages/_*/**/*'
    ])
      .pipe(plumber({
        errorHandler(error) {
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
        importer: [npmSass.importer, magicImporter],
        functions: exportJson(config.dataDest, 'json'),
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
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.dest))
      .on('end', () => {
        // core.events.emit('reload', join(config.dest, '**/*.css'));
        done();
      });
  }
  tasks.compile = compileCSS;


  function watchCSS() {
    const watchTasks = [compileCSS];
    if (config.lint === true) {
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
};
