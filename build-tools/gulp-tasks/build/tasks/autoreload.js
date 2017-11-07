'use strict';
// Gulp restart when gulpfile is changed
var spawn = require('child_process').spawn;

module.exports = function (gulp, config, $) {
  
  gulp.task('autoreload', 'Restarts Gulp when any config options or tasks are updated.', function(done){
    
    // Store current process if any
    var process;
    
    gulp.watch(['gulpfile.babel.js', 'build/**/*.js', 'webpack.config.js', 'gulp.config.js'], restart);

    function restart(e) {
      
      if(process) {
        $.util.log('Restarting gulp...');
        process.kill(); 
      }
      
      process = spawn('gulp', ['serve'], {stdio: 'inherit'});
      
      $.util.log($.util.colors.green('Waiting for changes to gulp...'));
      
      process.on('close', function(code) {
        if (code === 8) {
          $.util.log('Error detected, waiting for changes...');
        }
      });
    }

    restart();
    
  });
};
