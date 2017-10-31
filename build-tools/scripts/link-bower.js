const {resolve} = require('path');
const fs = require('fs-extra');

const REMOVE = process.argv.find(arg => arg === 'remove');

if (REMOVE) {
  fs.unlink(resolve('bower_components'));
} else {
  fs
    .unlink(resolve('bower_components'))
    .then(fs.symlink('node_modules', 'bower_components'))
    .catch(err => err.syscall === 'unlink' ? '' : console.error(err));
}
