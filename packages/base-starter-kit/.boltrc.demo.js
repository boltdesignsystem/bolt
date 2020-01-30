const deepmerge = require('deepmerge');
const baseConfig = require('./.boltrc.js');
const path = require('path');

module.exports = deepmerge(baseConfig, {
  env: 'drupal',
  esModules: true,
  buildDir: './dist/build',
  dataDir: './dist/build/data',
  wwwDir: './dist',
  copy: [
    {
      from: path.join(__dirname, './demo.html'),
      to: path.join(__dirname, './dist/index.html'),
    },
  ],
});
