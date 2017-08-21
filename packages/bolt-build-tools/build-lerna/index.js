import { notify, events } from '@bolt/build-core';
import gulp from 'gulp';
import merge from 'merge';
import * as defaultConfig from './config.default';

function lernaBootstrap(done, errorShouldExit) {
  notify.sh('npm run bootstrap', errorShouldExit, (err) => {
    events.emit('lerna bootstrap');
    done(err);
  });
}

function lerna(userConfig) {
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

export { lerna as default };
