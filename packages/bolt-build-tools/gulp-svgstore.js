const md5File = require('md5-file');
const fs = require('fs');
const plumber = require('gulp-plumber');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const svgstore = require('gulp-svgstore');
const args = require('yargs').argv;
const gutil = require('gulp-util');
let cachedMD5 = '';



module.exports = function (gulp) {

  function copyPublic(suffix) {
  	if (args['copy-dist'] !== undefined) {
  		return gulp.dest(args['copy-dist'] + "/" + suffix);
  	} else {
  		return gutil.noop();
  	}
  }

  gulp.task('svgstore', () => {
    const svgStream = gulp.src([
      './src/images/pl-icons/**/*.svg'
    ])
      .pipe(plumber({
        errorHandler(error) {
          console.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(svgmin())
      .pipe(cheerio({
        run($, file) {
          $('svg').attr('style', 'display: none !important;');
          $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(gulp.dest('./dist/images/icons'))
      .pipe(copyPublic('styleguide/images/icons'));


      // Generate an md5 hash of the latest icon sprite. This is exported as a variable which our JavaScript SVG loader pulls in to manage caching.
    const getPatternLabSVGRevision = function () {
      let hash = md5File.sync('./dist/images/icons/pl-icons.svg');
      hash = hash.substring(0, 6);
      hash = parseInt(hash, 16);

        // Only write out the md5 data change to the file system if we either don't know what the previous hash value was OR if the value has changed.
      if (hash !== cachedMD5) {
        fs.writeFileSync('./src/scripts/libs/inline_pl_svg_rev.js', `module.exports = { revision: ${hash} };\n`);

        cachedMD5 = hash;
      } else {

      }
    };

      // Once the stream of file changes has finished, regenerate the md5 information.
    svgStream.on('end', () => {
      getPatternLabSVGRevision();
    });
  });
};
