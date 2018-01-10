const gulp = require('gulp');
const config = {
  env: 'pl',
  plConfigFile: './config/config.yml',
  dist: './dist/assets',
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-button'
    ],
    individual: [
    ],
  },
};

const tasks = require('@bolt/build-tools')(config, gulp);

tasks.register();
