'use strict';

var browserSync  = require( 'browser-sync' );
 
module.exports = function (gulp, config, $) {
  
  gulp.task('patternlab', 'Runs the Pattern Lab PHP commands for generating the Pattern Library & compiling Twig templates.', function(done){
  
    var reportOptions = {
     err: false, // default = true, false means don't write err 
     stderr: false, // default = true, false means don't write stderr 
     stdout: true // default = true, false means don't write stdout 
   }

    return gulp.src('', {read: false})
        .pipe($.plumber({
          errorHandler: $.notify.onError({
            title: "Pattern Lab Error",
            message: "Error: <%= error.message %>"
          })
        }))
        .pipe($.exec('cd pattern-lab && php core/console -gpn'))
        .pipe($.exec.reporter(reportOptions));
        
  });
  
    
};