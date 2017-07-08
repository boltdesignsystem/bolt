'use strict';

var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');

module.exports = function (gulp, config, $) {
  
  gulp.task('email-templates', 'Copy email template source files for local testing. Generates zip files of template assets.', function(done){
  
    function getFolders(dir){
        return fs.readdirSync(dir)
          .filter(function(file){
            return fs.statSync(path.join(dir, file)).isDirectory();
          });
    }
    
    var emailTemplatesPath = './source/_email-templates';
    var folders = getFolders(emailTemplatesPath);
    
    
    var copyRootFiles = gulp.src([
        emailTemplatesPath + '/*',
      ])
      .pipe(gulp.dest('./public/email-templates/'));
    
    var emailTemplates = folders.map(function(folder) {
        return gulp.src(path.join(emailTemplatesPath, folder, '/*'))
          .pipe(gulp.dest('./public/email-templates/' + folder))
          .pipe($.tar(folder + '.tar'))
          .pipe($.gzip())
          .pipe(gulp.dest('./public/email-templates/' + folder));
     });
     
     return merge(copyRootFiles, emailTemplates);
     
  });
};
