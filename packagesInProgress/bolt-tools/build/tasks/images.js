// var imagemin   = require('gulp-imagemin');
// var newer      = require('gulp-newer');
// var filter     = require('gulp-filter');
// var rename     = require('gulp-rename');
var merge      = require('merge2');
var resize     = require('../libs/resize-images')

var options = [
  { width: 50, upscale: false },
  { width: 100, upscale: false },
  { width: 200, upscale: false },
  { width: 320, upscale: false },
  { width: 480, upscale: false },
  { width: 640, upscale: false },
  { width: 800, upscale: false },
  { width: 1024, upscale: false },
  { width: 1366, upscale: false },
  { width: 1536, upscale: false },
  { width: 1920, upscale: false },
  { width: 2560, upscale: false }
]

module.exports = function (gulp, config, $) {

  gulp.task('images', 'CMS-less responsive images. Minifies and intelligently creates resized versions of image assets.', function(done){

    var streams =  options.map(function(el) {
      return gulp.src(['./source/images/**/*', '!./source/images/**/*.svg'])
        .pipe($.rename(function(file) {
          if(file.extname) {
            file.basename += '-' + el.width
          }
        }))
        .pipe($.newer('./public/images'))
        .pipe(resize(el))
        .pipe($.imagemin())
        .pipe(gulp.dest('public/images'));
    });

    streams.push(gulp.src('./source/images/**/*')
      .pipe($.newer('./public/images'))
      .pipe($.imagemin())
      .pipe(gulp.dest('./public/images')));

    return merge(streams);
      
  });

};
// });


