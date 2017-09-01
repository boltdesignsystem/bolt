const core = require('@bolt/build-core');
const gulp = require('gulp');
const merge = require('merge').recursive;
const postcssReporter = require('postcss-reporter');
const duration = require('gulp-duration');
const size = require('gulp-size');
const cleanCSS = require('gulp-clean-css');
// import postcssReporter from 'postcss-reporter';
// import duration from 'gulp-duration';
// import size from 'gulp-size';
// import cleanCSS from 'gulp-clean-css';
// import defaultConfig from './config.default';
const defaultConfig = require('./config.default');
const autoprefixer = require('autoprefixer');
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
const sassGlob = require('gulp-sass-glob');
const rimraf = require('rimraf');
const gulpif = require('gulp-if');
const path = require('path');

// const packageImporter = require('node-sass-package-importer');

const postCSS = [
  postcssReporter({ clearReportedMessages: true }),
  autoprefixer()
];


function compileSassDoc(done, userConfig) {
  const config = merge(defaultConfig, userConfig);

  return gulp.src(['packages/**/*.scss', '!packages/**/node_modules/@bolt/**/*'
  ])
    .pipe(sassdoc(config.sassdoc))
    .on('end', () => {
      done();
    });
}

function docs(userConfig) {
  function sassDocTask(done) {
    compileSassDoc(done, userConfig);
  }
  sassDocTask.description = 'Generate SassDoc docs';
  sassDocTask.displayName = 'styles:sassdoc';
  return sassDocTask;
}
module.exports.docs = docs;


function compile(userConfig) {
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
    // .pipe($.env.development($.sourcemaps.init()))
    // .pipe(sourcemaps.init())
      .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
      .pipe(sassGlob())
      // .pipe(sass(eyeglass({
      .pipe(sass({
        // includePaths: [
        //   'node_modules',
        //   'packages',
        //   'sandbox/pattern-library/node_modules',
        //   'packages/bolt-toolkit/node_modules',
        //   'sandbox/styleguide/node_modules'
        // ],
        // importer: moduleImporter(),
        // importer: magicImporter({
        //   disableImportOnce: true
        // }),
        // importer: packageImporter({
        //   disableImportOnce: true
        // }),
        importer: require('npm-sass').importer,
        //         importer: [
        // magicImporter()
        //           // npmSass.importer
        //         //  moduleImporter(),
        //         //  glopImporter()
        //         ],
        functions: exportJson(config.data, 'export_data'),
        outputStyle: 'expanded',
        precision: 2
      }).on('error', sass.logError))
      .pipe(postcss(config.postCSS))
      .pipe(duration('CSS Compile Time'))
      .pipe(size({ title: 'Total CSS Size' }))
      // .pipe(cleanCSS({
      //   aggressiveMerging: false,
      //   advanced: false,
      //   keepSpecialComments: 0,
      //   processImport: true
      // }))
    // .pipe(sourcemaps.write('./'))
      .pipe(gulpif(config.sourceMaps, sourcemaps.write('./')))
      .pipe(gulp.dest(config.dest))
      .on('end', () => {
        // core.events.emit('reload', join(config.dest, '**/*.css'));
        done();
      });
  }

  compileCssTask.displayName = 'styles:compile';
  compileCssTask.description = 'Compile Sass to CSS';

  return compileCssTask;
}
module.exports.compile = compile;


function watch(userConfig) {
  function watchCssTask() {
    const config = merge({
      postCSS
    }, defaultConfig, userConfig);

    // const watchTasks = [compile(userConfig)];


    if (config.sassdoc !== false) {
      // watchTasks.push(sassDoc(userConfig));
    }
    const src = config.extraWatches
      ? [].concat(config.src, config.extraWatches)
      : config.src;
    // console.log(watchTasks);

    // console.log(src);
    const watcher = gulp.watch(src, gulp.parallel(compile(userConfig)));

    watcher.on('change', (path, stats) => {
      console.log(`File ${path} was changed`);
    });

    // return gulp.watch(src, gulp.parallel(watchTasks));
  }

  watchCssTask.displayName = 'styles:watch';
  watchCssTask.description = 'Watch Sass files for changes to auto-recompile.';

  return watchCssTask;
}
module.exports.watch = watch;


function clean(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function cleanStylesTask(cb) {
    debug('CSS Cleaned');

    rimraf(`${config.dest}/*`, cb);
    // return del().then((paths) => {
    //   console.log('Cleaning out old CSS:\n', paths.join('\n'));
    // });

    // pathExists('foo.js').then((exists) => {
    //   console.log(exists);
    //     //= > true
    // });
  }

  cleanStylesTask.description = 'Clean compiled CSS';
  cleanStylesTask.displayName = 'styles:clean';

  return cleanStylesTask;
}
module.exports.clean = clean;


function lint(userConfig) {
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
module.exports.lint = lint;
