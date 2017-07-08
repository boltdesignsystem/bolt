'use strict';

module.exports = function (gulp, config, $) {
  
  gulp.task('download-all-icons', 'Generates zip files of all SVG icon assets.', function(done){
  
    var iconsPath = './source/images/icons/**/*.svg';
    
    return gulp.src(iconsPath)
      .pipe($.zip('all-icons.zip'))
      .pipe(gulp.dest('./public/images/icons/'));
     
  });
};
