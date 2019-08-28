const path = require('path');
const resolve = require('resolve');
const argv = require('yargs').argv;

const config = {
  openServerAtStart: true,
  env: 'drupal',
  buildDir: '../www/build',
  dataDir: '../www/build/data',
  wwwDir: '../www',
  startPath: '/',
  verbosity: 2,
  webpackDevServer: {
    enabled: true,
  },
  sourceMaps: false,
  enableCache: false,
  components: {
    global: [
      resolve.sync('./sass-compile-test.scss'),
    ],
    individual: [
      
    ],
  }
};

module.exports = config;
