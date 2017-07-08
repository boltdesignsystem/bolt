var gulp = require('gulp'),
          args = require('yargs').argv,
          merge = require('lodash.merge'),
          fs = require('fs'),
          del = require('del');

var defaultOptions = {
  src: args.src ? args.src : ['./packages/pk-assets-fonts/src/fonts/**/*'],
  dest: args.dest ? args.dest : './public/fonts',
}

module.exports = function (gulp, config) {
  
  gulp.task('copy:fonts', 'Copies over fonts from the source to public folder.', function(){
    
    //Merge together default options w/ passed in options
    var fontConfig = merge(defaultOptions, config.fonts);
    
    //Then override those with any inline arguments explicetly passed in
    fontConfig = merge(fontConfig, {
      src: args.src ? args.src : fontConfig.src,
      dest: args.dest ? args.dest : fontConfig.dest,
    });
    
    function copyFonts(){
      return gulp.src(fontConfig.src)
      .pipe(gulp.dest(fontConfig.dest));
    }
    
    if (fs.existsSync(fontConfig.dest)) {
      del([fontConfig.dest]).then(paths => {
        copyFonts();
      });
    } else {
      copyFonts();
    }
    
    
  }, {
    options: {
      'src="./source/fonts/**/*"': 'Location to copy font assets from.',
      
      'dest="./public/fonts"': 'Destination to copy your font assets to.',
    }
  });
};