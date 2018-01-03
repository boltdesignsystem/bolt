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
const join = require('path').join;
const scssSyntax = require('postcss-scss');
const sassdoc = require('sassdoc');
// const debug = require('debug')('@bolt/build-styles');
const sassGlob = require('gulp-sass-glob');
const rimraf = require('rimraf');
const gulpif = require('gulp-if');
const path = require('path');
// const colorguard = require('./colorguard');
const colorguard = require('colorguard');
const kindOf = require('kind-of');
const rgb2Hex = require('rgb-hex');
const stylelint = require('gulp-stylelint');
const stylelintFormatter = require('stylelint-formatter-pretty');

const sassInheritance = require('gulp-sass-inheritance');
const cached = require('gulp-cached');
const filter = require('gulp-filter');
const debug = require('gulp-debug');
const flatten = require('gulp-flatten');
// const magicImporter = require('node-sass-magic-importer');

const postCSS = [
  autoprefixer(),
  postcssReporter({ clearReportedMessages: true })
  // stylelint()
  // colorguard2({
  //   threshold: 20,
  //   // whitelist: [allColors],
  //   logOk: true,
  //   allowEquivalentNotation: true
  // })
];


// console.log(colors);


// console.log(allColors);


// for (const key in colors) {
//   console.log(key); // key1 and etc...
//   console.log(colors[key]); // val1 and etc...
// }


function compileSassDoc(done, userConfig) {
  const config = merge(defaultConfig, userConfig);

  return gulp.src([
    'src/_patterns/**/*.scss',
    '!**/node_modules/**/*'
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
  const config = merge(defaultConfig, userConfig);

  function compileCssTask(done) {
    // const colors = require('../../website/user/themes/bolt/pattern-lab/source/_data/bolt-colors.json').bolt_colors;
    //
    // const allColors = [];
    //
    // for (const key of Object.keys(colors)) {
    //   const val = colors[key];
    //   // console.log(val);
    //
    //   if (kindOf(val) === 'object') {
    //     for (const nestedKey of Object.keys(val)) {
    //       const nestedVal = val[nestedKey];
    //       // console.log(val2);
    //
    //
    //       if (kindOf(nestedVal) === 'object') {
    //         for (const doubleNestedKey of Object.keys(nestedVal)) {
    //           const doubleNestedVal = nestedVal[doubleNestedKey];
    //           // doubleNestedVal = rgb2hex(doubleNestedVal);
    //           allColors.push(`#${rgb2Hex(doubleNestedVal)}`);
    //           // allColors.push(doubleNestedVal);
    //         }
    //       } else {
    //         allColors.push(`#${rgb2Hex(nestedVal)}`);
    //         // allColors.push(nestedVal);
    //       }
    //       //
    //     }
    //   } else {
    //     // val
    //     allColors.push(`#${rgb2Hex(val)}`);
    //     // allColors.push(val);
    //   }
    // }


    // rgb2Hex(colors.white.base)


    //     config.postCSS.concat([
    //       colorguard()
    //     ]);
    //
    //     console.log(config.postCSS);
    //
    // var plugins = old_array.concat(value1[, value2[, ...[, valueN]]])


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
      .pipe(gulpif(config.glob, sassGlob()))
      .pipe(stylelint({
        reporters: [{
          formatter: stylelintFormatter,
          console: true
        }],
        failAfterError: false
      }))
      .pipe(filter(file => !/\/_/.test(file.path) || !/^_/.test(file.relative)))
      // .pipe(debug({ title: 'Sass file: ' }))
      .pipe(sass({
        // includePaths: [
        //   'node_modules',
        //   'pattern-lab/node_modules'
        // ],
        // importer: require('npm-sass').importer,
        importer: require('npm-sass').importer,
        functions: exportJson(config.data, 'export_data'),
        outputStyle: 'expanded',
        precision: 2
      }).on('error', sass.logError))
      .pipe(postcss(
        postCSS.concat([
          // colorguard({
          //   threshold: 4,
          //   whitelist: [
          //     [`#${rgb2Hex(colors.gray.xlight)}`, `#${rgb2Hex(colors.white.base)}`],
          //     [`#${rgb2Hex(colors.warning.light)}`, `#${rgb2Hex(colors.yellow.xlight)}`]
          //   ],
          //   allowEquivalentNotation: true
          // })
        ])
      ))
      .pipe(duration('CSS Compile Time'))
      .pipe(size({ title: 'Total CSS Size' }))
      .pipe(cleanCSS({
        aggressiveMerging: false,
        advanced: false,
        keepSpecialComments: 0,
        processImport: true
      }))
      .pipe(gulpif(config.sourceMaps, sourcemaps.write('./')))
      .pipe(flatten())
      .pipe(gulp.dest(config.dest))
      .on('end', () => {
        core.events.emit('reload', join(config.dest, '**/*.css'));
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
    gulp.watch(src, gulp.parallel([
      compile(userConfig),
      docs(userConfig)
    ]));
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
  }

  cleanStylesTask.description = 'Clean compiled CSS';
  cleanStylesTask.displayName = 'styles:clean';

  return cleanStylesTask;
}
module.exports.clean = clean;


function lint(userConfig) {
  const config = merge({
    postCSS: [
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
      .pipe(stylelint({
        reporters: [{
          formatter: stylelintFormatter,
          console: true
        }],
        failAfterError: true
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
