'use strict';

require('gulp-connect');
const gulpConnectSsi = require('gulp-connect-ssi');


module.exports = function (gulp, config, $) {
  gulp.task('browsersync', 'Local web server. Live reloads when CSS, HTML, or JavaScript changes.', function(){

    $.connect.server({
      root: 'public',
      port: 3000,
      livereload: true
      // middleware: function(){
      //   return [gulpConnectSsi({
      //     baseDir: 'public',
      //     ext: '.html',
      //     // domain: 'http://example.com/',
      //     method: 'readOnLineIfNotExist'  // readOnLine|readLocal|readOnLineIfNotExist|downloadIfNotExist
      //   })];
      // }
    });
  });
};
