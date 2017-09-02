const core = require('@bolt/build-core');
const gulp = require('gulp');
const merge = require('merge').recursive;
const defaultConfig = require('./config.default');

function lernaBootstrap(done, errorShouldExit) {
  core.notify.sh('npm run bootstrap', errorShouldExit, (err) => {
    core.events.emit('lerna bootstrap');
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
module.exports.lerna = lerna;
