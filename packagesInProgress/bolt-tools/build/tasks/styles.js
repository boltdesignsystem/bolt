'use strict';
var browserSync = require("browser-sync").get('BrowserSync Server');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var atImport = require("postcss-import");
var reload = browserSync.reload;
var dups = require('postcss-discard-duplicates');
var export_sass = require('node-sass-export');
var assets  = require('postcss-assets');
// var sassdoc = require('sassdoc');

var processors = [
  assets({
    basePath: 'source/',
    loadPaths: ['fonts/', 'images/']
  }),
  atImport(),
  autoprefixer({
    browsers: ['> 1%', 'last 4 versions', 'ie 9', 'ie >= 10'],
  })
];


module.exports = function (gulp, config, $) {
  
  const cssFilter = $.filter('**/pegawww.css', {restore: true});
  
  gulp.task('styles', 'Compile Sass to CSS using Libsass with Autoprefixer and SourceMaps', function(done){
    return gulp.src([
    './source/styles/**/*.scss'
    ])
    .pipe($.plumber({
      errorHandler: function (error) {
        $.notify.onError({
          title: 'CSS <%= error.name %> - Line <%= error.line %>',
          message: '<%= error.message %>'
        })(error);
      }
    }))
    .pipe($.env.development($.sourcemaps.init()))
    .pipe($.sass({
      includePaths: ['node_modules', 'source/styles'],
      outputStyle: 'expanded',
      functions: export_sass('./source/_data', 'jsonexport')
    }).on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.duration('CSS Compile Time'))
    .pipe($.size({title: 'Total CSS Size'}))
    .pipe(gulp.dest('./public/styles'))
    .pipe($.cleanCSS({
      aggressiveMerging: false,
      advanced: false,
      keepSpecialComments: 0,
      processImport: true
    }))
    .pipe(gulp.dest('./public/styles'))
    .pipe($.env.production(cssFilter))
    .pipe($.env.production($.rename({
      suffix: ".blessed",
      extname: ".css"
    })))
    .pipe($.env.production($.bless({
      imports: true
    })))
    .pipe($.env.production($.rename(function (path) {
        path.basename = path.basename.replace('-blessed', '');
    })))
    .pipe($.env.production($.replace('-blessed', '')))
    .pipe($.env.production($.cleanCSS({
      aggressiveMerging: false,
      advanced: false,
      keepSpecialComments: 0,
      processImport: false
    })))
    .pipe($.env.production(gulp.dest('./public/styles')))
    .pipe($.env.production(cssFilter.restore))
    .pipe($.env.development($.sourcemaps.write('./')))
    .pipe(gulp.dest('./public/styles'))
    .pipe($.env.development(browserSync.stream({match: '**/*.css'})));
  });
  
  // tasks.clean.push('styles');
  // tasks.styles.push('styles');
  
  // gulp.task('clean:styles', 'Delete compiled CSS files', function(done) {
  //   del([
  //     config.styles.dest + '*.{css,css.map}'
  //   ]).then(function () {
  //     done();
  //   });
  // });
  // 
  // 
  // 
  // gulp.task('validate:css', 'Lint Scss files', function () {
  //   var src = config.css.src;
  //   if (config.css.lint.extraSrc) {
  //     src = src.concat(config.css.lint.extraSrc);
  //   }
  //   return gulp.src(src)
  //   .pipe(cached('validate:css'))
  //   .pipe(sassLint())
  //   .pipe(sassLint.format())
  //   .pipe(gulpif(config.css.lint.failOnError, sassLint.failOnError()));
  // });
  // 
  // gulp.task('docs:css', 'Build CSS docs using SassDoc', function () {
  //   return gulp.src(config.css.src)
  //   .pipe(sassdoc({
  //     dest: config.css.sassdoc.dest,
  //     verbose: config.css.sassdoc.verbose,
  //     basePath: config.css.sassdoc.basePath,
  //     exclude: config.css.sassdoc.exclude,
  //     theme: config.css.sassdoc.theme,
  //     sort: config.css.sassdoc.sort
  //   }));
  // });
  // 
  // gulp.task('clean:docs:css', 'Delete compiled CSS docs', function(done) {
  //   del([config.css.sassdoc.dest]).then(function () {
  //     done();
  //   });
  // });
  // 
  // 
  // gulp.task('watch:css', function () {
  //   var tasks = ['css'];
  //   if (config.css.lint.enabled) {
  //     tasks.push('validate:css');
  //   }
  //   if (config.css.sassdoc.enabled) {
  //     tasks.push('docs:css');
  //   }
  //   return gulp.watch(config.css.src, tasks);
  // });
  // 
  // tasks.watch.push('watch:css');
  // 
  // var cssDeps = [];
  // if (config.icons.enabled) {
  //   cssDeps.push('icons');
  // }
  // 
  // gulp.task('css:full', false, cssDeps, function(done) {
  //   cssCompile(done, true);
  // });
  // tasks.compile.push('css:full');
  // 
  // if (config.css.lint.enabled) {
  //   tasks.validate.push('validate:css');
  // }
  // 
  // if (config.css.sassdoc.enabled) {
  //   tasks.compile.push('docs:css');
  //   tasks.clean.push('clean:docs:css');
  // }
  // 
  // tasks.clean.push('clean:css');
  
};



