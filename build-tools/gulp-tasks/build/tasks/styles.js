
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const exportSass = require('node-sass-export');
const assets = require('postcss-assets');
const es = require('event-stream');
const path = require('path');
const publicDir = path.resolve('public');

const processors = [
  assets({
    basePath: 'source/',
    loadPaths: ['fonts/', 'images/']
  }),
  atImport(),
  autoprefixer({
    browsers: ['> 1%', 'last 4 versions', 'ie 9', 'ie >= 10'],
  })
];

module.exports = (gulp, config, $) => {
  const sassConfig = {
    includePaths: ['node_modules', 'source/styles', 'bower_components'],
    outputStyle: 'expanded',
    functions: exportSass('./source/_data', 'jsonexport')
  };


  gulp.task('styles:watch', ['setWatch', 'styles'], () => {
    gulp.watch(['source/styles/**/*.scss'], ['styles']);
  });

  gulp.task('styles', (cb) => {
    es.concat(
      gulp.src([
        './source/styles/**/*.scss'
          // '!./source/styles/**/node_modules/*.scss'
      ])
        .pipe($.plumber({
          errorHandler(error) {
            $.notify.onError({
              title: 'CSS <%= error.name %> - Line <%= error.line %>',
              message: '<%= error.message %>'
            })(error);
          }
        }))
        // .pipe($.env.development($.gulpif(global.isWatching, $.cached('sass'))))
       // find files that depend on the files that have changed
        // .pipe($.env.development($.sassInheritance({ dir: 'source/styles/' })))
       // filter out internal imports (folders and files starting with "_" )
        // .pipe($.env.development($.filter(file => !/\/_/.test(file.path) || !/^_/.test(file.relative))))
        .pipe($.env.development($.sourcemaps.init({
          largeFile: false
        })))
        .pipe($.sass(sassConfig).on('error', $.sass.logError))
        .pipe($.postcss(processors))
        .pipe($.duration('CSS Compile Time'))
        .pipe($.size({ title: 'Total CSS Size' }))
        .pipe($.env.production($.cleanCSS({
          level: 2,
          compatibility: 'ie10'
        })))
        .pipe($.env.development($.sourcemaps.write('./')))
        .pipe(gulp.dest('./public/styles'))
        .pipe($.env.development($.connect.reload())),


      gulp.src([
        './source/styles/**/*.scss'
      ])
      .pipe($.plumber({
        errorHandler(error) {
          $.notify.onError({
            title: 'CSS <%= error.name %> - Line <%= error.line %>',
            message: '<%= error.message %>'
          })(error);
        }
      }))
      // .pipe($.env.development($.gulpif(global.isWatching, $.cached('sass'))))
     // find files that depend on the files that have changed
      // .pipe($.env.development($.sassInheritance({ dir: 'source/styles/' })))
     // filter out internal imports (folders and files starting with "_" )
      // .pipe($.env.development($.filter(file => !/\/_/.test(file.path) || !/^_/.test(file.relative))))
      .pipe($.sass(sassConfig).on('error', $.sass.logError))
      .pipe($.postcss(processors))
      .pipe($.rename({
        suffix: '.blessed',
        extname: '.css'
      }))
       .pipe(gulp.dest('./public/styles'))
      .pipe($.bless({
        suffix(index) {
          return `.${index}`;
        },
        imports: true
      }))
      .pipe($.env.production($.cleanCSS({
        compatibility: 'ie9',
        inline: ['none'],
        rebase: false
      })))
      .pipe($.replace('url(public/styles', 'url(/styles'))
      .pipe(gulp.dest('./public/styles'))



    ).on('end', cb);
  });

  gulp.task('setWatch', () => {
    global.isWatching = true;
  });

  gulp.task('styles:watch', ['setWatch', 'styles'], () => {
    gulp.watch(['source/styles/**/*.scss'], ['styles']);
  });
};
