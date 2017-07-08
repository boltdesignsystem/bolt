
var svgConf = function() {
  return {
    plugins: [{
      cleanupIDs: {
        prefix: 'icon-',
        minify: true
      },
      cleanupEnableBackground: true,
      removeViewBox: false,
      removeEmptyAttrs: false,
      removeUnknownsAndDefaults: false,
      removeUnusedNS: false,
      removeUselessStrokeAndFill: false,
      convertColors: false
      // sortAttrs: true
    }]
  }
};

const md5File = require('md5-file');
var fs = require('fs');
var cachedMD5 = '';
const filter = require('gulp-filter');

module.exports = function (gulp, config, $) {
  
  gulp.task('svgstore', 'Minify and combine a folder of SVG icons into a <symbol>-based SVG Spritesheet.', function(){
    
    var svgConfig = require('../svg-icon-config.json').keep_icon_colors;
    svgConfig.unshift('**');
    
    var svgFilter = filter(svgConfig, {restore: true});
    
    var svgStream = gulp.src([
        './source/images/icons/*.svg',
        './source/images/icons/resource-icons/*.svg',
      ])
      .pipe($.plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        }
      }))
      
      //Minify all existing icons as-is, prior to making any changes.
      .pipe($.svgmin())
      .pipe(gulp.dest('./public/images/icons'))
      // .pipe($.changed('./public/images/icons'))
      
      
      .pipe(svgFilter)
      .pipe($.cheerio({
        run: function ($, file) {
          $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe(svgFilter.restore)
      
      
      .pipe($.svgstore({
        fileName: 'icons.svg',
        inlineSvg: true
      }))
      .pipe($.cheerio({
        run: function ($, file) {
          $('svg').attr('style', 'display: none !important;');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe(gulp.dest('./public/images/icons'));


      //Generate an md5 hash of the latest icon sprite. This is exported as a variable which our JavaScript SVG loader pulls in to manage caching. 
      var getSVGRevision = function(){
        var hash = md5File.sync('./public/images/icons/icons.svg');
        hash = hash.substring(0,6);
        hash = parseInt(hash, 16);
        
        // Only write out the md5 data change to the file system if we either don't know what the previous hash value was OR if the value has changed.
        if (hash !== cachedMD5){
          fs.writeFileSync('./source/scripts/libs/inline_svg_rev.js',       'module.exports = { revision:' + hash + '}');
          
          cachedMD5 = hash;
        } else {
          return;
        }

      }
      
      // Once the stream of file changes has finished, regenerate the md5 information.
      svgStream.on('end', function() {
        getSVGRevision();
      });
      
      
    });
};
