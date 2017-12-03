// var imagemin   = require('gulp-imagemin');
// var newer      = require('gulp-newer');
// var filter     = require('gulp-filter');
// var rename     = require('gulp-rename');
const merge = require('merge2');
const resize = require('./libs/resize-images').resize;
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const rename = require('gulp-rename');
const rimraf = require('rimraf');

const imageSizes = require('@bolt/core').imageSizes.sizes;


function resizeImages(gulp, defaultConfig) {
  const config = {
    src: './src/images/**/*',
    dest: './dist/images'
  }
  

  function resizeImagesTask() {
    const streams = imageSizes.map((el) => {
      return gulp.src([
        config.src
      ])
        .pipe(rename((file) => {
          if (file.extname && file.extname !== '.gif' && file.extname !== '.svg') {
            file.basename += `-${el}`;
          }
        }))
        .pipe(newer(config.dest))
        .pipe(resize({
          width: el,
          upscale: false
        }))
        .pipe(imagemin([
          imageminMozjpeg({
            quality: 75
          }),
          imagemin.gifsicle(),
          imagemin.optipng(),
          imagemin.svgo({
            plugins: [
              { removeViewBox: true },
              { cleanupIDs: false }
            ]
          })
        ]))
        .pipe(gulp.dest(config.dest));
    });

    streams.push(gulp.src(config.src)
      .pipe(newer(config.dest))
      .pipe(imagemin([
        imageminMozjpeg({
          quality: 75
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo()
      ]))
      .pipe(gulp.dest(config.dest)));

    return merge(streams);
  }
  resizeImagesTask.description = 'Resize and optimize images.';
  resizeImagesTask.displayName = 'images:resize';

  return resizeImagesTask;
}

module.exports.resize = resizeImages;


function cleanImages(gulp, config) {
  function cleanImagesTask(cb) {
    rimraf(`${config.dest}/**/*`, cb);
  }

  cleanImagesTask.description = 'Clean minified images';
  cleanImagesTask.displayName = 'images:clean';

  return cleanImagesTask;
}
module.exports.clean = cleanImages;
