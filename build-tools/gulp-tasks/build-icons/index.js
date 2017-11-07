const plumber = require('gulp-plumber');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');

const merge = require('merge').recursive;
const path = require('path');
const gutil = require('gulp-util');
const through2 = require('through2');
const fs = require('fs-extra');
const md5File = require('md5-file');
const mkdirp = require('mkdirp');
// const filter = require('gulp-filter');
let cachedMD5 = '';


const defaultConfig = require('./config.default');

// module.exports = function (gulp, config) {


// const svgConf = function () {
//   return {
//     plugins: [{
//       cleanupIDs: {
//         prefix: 'icon-',
//         minify: true
//       },
//       cleanupEnableBackground: true,
//       removeViewBox: false,
//       removeEmptyAttrs: false,
//       removeUnknownsAndDefaults: false,
//       removeUnusedNS: false,
//       removeUselessStrokeAndFill: false,
//       convertColors: false
//       // sortAttrs: true
//     }]
//   };
// };




// Generate an md5 hash of the latest icon sprite. This is exported as a variable
// which our JavaScript SVG loader pulls in to manage caching.
// function iconCachebuster(userConfig) {

// function iconCachebusterTask(done) {

// }
// iconCachebusterTask.description = 'Cachebuster for SVG icon system';
// iconCachebusterTask.displayName = 'icons:cachebuster';
// return iconCachebusterTask;


// let hash = md5File.sync(config.dest './public/images/icons/icons.svg');
// hash = hash.substring(0, 6);
// hash = parseInt(hash, 16);

// // Only write out the md5 data change to the file system if we either don't
// // know what the previous hash value was OR if the value has changed.
// if (hash !== cachedMD5) {
//   mkdirp('./source/scripts/pk-critical-path/inline-svgs/', () => {
//     fs.writeFileSync('./source/scripts/pk-critical-path/inline-svgs/inline_svg_rev.js', `module.exports = { revision: ${hash} };\n`);
//     cachedMD5 = hash;
//   });
// } else {

// }
// };


function buildIcons(gulp, userConfig) {
  const config = merge(defaultConfig, userConfig);

  function buildIconsTask() {
    return gulp.src(config.src)
      .pipe(plumber({
        errorHandler(error) {
          console.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(svgmin())
      .pipe(cheerio({
        run($, file) {
          $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe(svgstore({
        fileName: 'icons.svg',
        inlineSvg: true
      }))
      .pipe(cheerio({
        run($, file) {
          $('svg').attr('style', 'display: none !important;');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe(rename('bolt-icons.svg'))
      .pipe(gulp.dest(config.dest));
  }
  buildIconsTask.description = 'Build and optimize SVG icons';
  buildIconsTask.displayName = 'icons:build';
  return buildIconsTask;
}
module.exports.build = buildIcons;


    // gulp.task('svgstore', 'Minify and combine a folder of SVG icons into a <symbol>-based SVG Spritesheet.', () => {
    //   const svgConfig = require('../svg-icon-config.json').keep_icon_colors;
    //   svgConfig.unshift('**');

      // const svgFilter = filter(svgConfig, { restore: true });

      // const svgStream = gulp.src([
      //   './source/images/icons/*.svg',
      //   './source/images/icons/resource-icons/*.svg',
      // ])
      // const svgStream =

        // Minify all existing icons as-is, prior to making any changes.
        // .pipe(gulp.dest('./public/images/icons'))
        // .pipe($.changed('./public/images/icons'))


        // .pipe(svgFilter)

        // .pipe(svgFilter.restore)







      // Once the stream of file changes has finished, regenerate the md5 information.
      // svgStream.on('end', () => {
      //   getSVGRevision();
      // });
    // });
  // };


// };
