const gulp = require('gulp');
const merge = require('merge');
const defaultConfig = require('./config.default');
// const debug = require('debug')('@bolt/build-tools-symlinks');
// const changedInPlace = require('gulp-changed-in-place');

import { notify, utils, events } from '@bolt/build-core';


function lernaBootstrap(done, errorShouldExit) {
  notify.sh('npm run bootstrap', errorShouldExit, (err) => {
    events.emit('lerna bootstrap');
    done(err);
  });
}

function lernaReload(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function lernaReloadTask(done) {
    return gulp.watch(config.sources, () => {
      lernaBootstrap(done, false);
    });
  }

  lernaReloadTask.displayName = 'lerna:watch';
  lernaReloadTask.description = 'Watch for lerna-related files for changes';

  return lernaReloadTask;
}

export { lernaReload as lerna };
