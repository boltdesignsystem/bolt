var exec = require('child_process').exec;
var colors = require('colors');

// Download Composer
console.log('Downloading local Composer...'.yellow);
exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', function (error, stdout) {
  console.log('Finished downloading local Composer!'.green);
  console.log('Installing Composer dependencies... (this may take a while)'.yellow);
  exec('php ./composer.phar install --no-dev', function (error, stdout) {
    console.log('Finished installing Composer dependencies!'.green);
    console.log('Deleting local Composer...'.yellow);
    exec('rm -f ./composer.phar', function () {
      console.log('Finished deleting local Composer!'.green);
    });
  });
});