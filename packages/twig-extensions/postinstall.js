const exec = require('child_process').exec;
const colors = require('colors');

// Download Composer
console.log('Downloading local Composer...'.yellow);
exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', (error, stdout) => {
  console.log('Finished downloading local Composer!'.green);
  console.log('Installing Composer dependencies... (this may take a while)'.yellow);
  exec('php ./composer.phar install --no-dev', (error, stdout) => {
    console.log('Finished installing Composer dependencies!'.green);
    console.log('Deleting local Composer...'.yellow);
    exec('rm -f ./composer.phar', () => {
      console.log('Finished deleting local Composer!'.green);
    });
  });
});
