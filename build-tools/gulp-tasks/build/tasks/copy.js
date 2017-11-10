'use strict';


module.exports = function (gulp, config, $) {
  
  gulp.task('copy:fonts', 'Copies over fonts from the source to public folder.', function(done){
  
    return gulp.src([
    './source/fonts/**/*'
    ])
    .pipe(gulp.dest('./public/fonts'));
    
  });
};



