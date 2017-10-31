/* eslint no-unused-vars: ["error", { "args": "none" }] */
const core = require('@bolt/build-core');
const merge = require('merge').recursive;
const defaultConfig = require('./config.default');

function build(done, config, errorShouldExit) {
  const cd = config.source ? `cd ${config.source} && ` : '';

  core.notify.sh(`${cd} jekyll build ${config.incremental ? '--incremental' : ''} ${config.drafts ? '--drafts' : ''} ${config.watch ? '--watch' : ''}`, errorShouldExit, (err) => {
    core.events.emit('reload');
    done(err);
  });
}

function compileJekyll(done, userConfig) {
  function compileJekyllTask(done, userConfig) {
    const config = merge(defaultConfig, userConfig, {
      watch: false
    });
    build(done, config, false);
  }
  compileJekyllTask.description = 'Build Jekyll';
  compileJekyllTask.displayName = 'jekyll:compile';

  return compileJekyllTask;
}
module.exports.compile = compileJekyll;


function watchJekyll(done, userConfig) {
  function watchJekyllTask(done, userConfig) {
    const config = merge(defaultConfig, userConfig, {
      watch: true,
      incremental: true
    });
    build(done, config, true);
  }
  watchJekyllTask.description = 'Watch Jekyll';
  watchJekyllTask.displayName = 'jekyll:watch';
  return watchJekyllTask;
}
module.exports.watch = watchJekyll;
