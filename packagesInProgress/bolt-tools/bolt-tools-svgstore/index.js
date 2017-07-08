var gulp = require('gulp'),
    md5File = require('md5-file'),
    filter = require('gulp-filter'),
    fs = require('fs'),
    args = require('yargs').argv,
    del = require('del'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    svgmin = require('gulp-svgmin'),
    gulpif = require('gulp-if'),
    svgstore = require('gulp-svgstore'),
    cheerio = require('gulp-cheerio'),
    rename = require('gulp-rename'),
    merge = require('lodash.merge'),
    zip = require('gulp-zip'),
    cachedMD5 = '';

var defaultOptions = {
  src: args.src ? args.src : './source/images/icons/**.svg',
  dest: args.dest ? args.dest : './public/images/icons/',
  
  filename: args.filename ? args.filename : 'icons.svg',
  
  outputCacheBuster: args.outputCacheBuster ? args.outputCacheBuster : true,
  
  cacheBusterDest: args.cacheBusterDest ? args.cacheBusterDest : './source/scripts/libs/inline_svg_rev.js',
  
  includeSource: args.includeSource ? args.includeSource : 'true',
  
  keep_icon_colors: [
    "!**/*.colored.svg"
  ]
}

module.exports = function (gulp, config) {
  
  gulp.task('svgstore', 'Minify and combine a folder of SVG icons into a <symbol>-based SVG Spritesheet.', function(){
    
    //Merge together default options w/ passed in options
    svgConfig = merge(defaultOptions, config.icons);
    
    //Then override those with any inline arguments explicetly passed in
    svgConfig = merge(svgConfig, {
      src: args.src ? args.src : svgConfig.src,
      dest: args.dest ? args.dest : svgConfig.dest,
      filename: args.filename ? args.filename : svgConfig.filename,
      outputCacheBuster: args.outputCacheBuster ? args.outputCacheBuster : svgConfig.outputCacheBuster,
      cacheBusterDest: args.cacheBusterDest ? args.cacheBusterDest : svgConfig.cacheBusterDest,
      includeSource: args.includeSource ? args.includeSource : svgConfig.includeSource
    });
    
    var svgIconFilterConfig = '';
    if (svgConfig.keep_icon_colors){
      svgIconFilterConfig = svgConfig.keep_icon_colors;
    }
    var svgFilter = filter(svgIconFilterConfig, {restore: true});
    
    
    

    function runSVGStore(){
      
      var svgStream = gulp.src(svgConfig.src)
          .pipe(plumber({
            errorHandler: function(error) {
              console.log(error.message);
              this.emit('end');
            }
          }))
          
          //Minify all existing icons as-is, prior to making any changes.
          .pipe(svgmin())
          .pipe(gulpif(svgConfig.includeSource === 'true', gulp.dest(svgConfig.dest)))
          
          .pipe(svgFilter)
          .pipe(cheerio({
            run: function ($, file) {
              $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
          }))
          .pipe(svgFilter.restore)
          
          // @TODO: force unique ID's for multi-level icon folder directory
          // .pipe(rename(function (file) {
          //     var name = file.dirname.split(path.sep);
          //     name.push(file.basename);
          //     file.basename = name.join('-');
          // }))
          .pipe(svgstore({
            inlineSvg: true
          }))
          .pipe(rename(svgConfig.filename))
          .pipe(cheerio({
            run: function ($, file) {
              $('svg').attr('style', 'display: none !important;');
            },
            parserOptions: { xmlMode: true }
          }))
          .pipe(gulp.dest(svgConfig.dest));

      
        var downloadAllIcons = function(){
          gulp.src(svgConfig.src)
            .pipe(zip('all-' + svgConfig.filename.substr(0, svgConfig.filename.lastIndexOf('.')) + '.zip'))
            .pipe(gulp.dest(svgConfig.dest));
        }
        
        

        //Generate an md5 hash of the latest icon sprite. This is exported as a variable which our JavaScript SVG loader pulls in to manage caching. 
        var getSVGRevision = function(){
          var hash = md5File.sync(svgConfig.dest + svgConfig.filename);
          hash = hash.substring(0,6);
          hash = parseInt(hash, 16);
          
          // Only write out the md5 data change to the file system if we either don't know what the previous hash value was OR if the value has changed.
          if (hash !== cachedMD5){
            fs.writeFileSync(svgConfig.cacheBusterDest, 'module.exports = { revision:' + hash + '}');
            cachedMD5 = hash;
          } else {
            return;
          }
        }
        
        // Once the stream of file changes has finished, regenerate the md5 information.
        svgStream.on('end', function() {
          downloadAllIcons();
          getSVGRevision();
        });
    }
    
    if (fs.existsSync(svgConfig.dest)) {
      del([svgConfig.dest + '*.svg']).then(paths => {
        runSVGStore();
      });
    } else {
      runSVGStore();
    }
    
    
  }, {
    options: {
      'src="./source/images/icons/*.svg"': 'Change source location of your original icon assets.',
      
      'dest="./public/images/icons/"': 'Change the destination of where your icon assets will be moved to, once built.',
      
      'filename="icons.svg"': 'The name of the file created after merging together the collection of SVG icon assets.',
      
      'cacheBusterDest="./source/scripts/libs/inline_svg_rev.js"': 'The destination of where you want to store the cache-busting JavaScript file created when the icon set is updated / changed.',
      
      'includeSource=false': 'Option to enable / disable if you want to copy over the minified but not combined SVG icon assets that make up the SVG sprite, prior to being combined together.',
      
      'outputCacheBuster=true': 'Option to disable the cache busting JS hash from getting automatically created / output.'
    }
  });
};