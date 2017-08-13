/* eslint no-unused-vars: ["error", { "args": "none" }]*/
import gulp from 'gulp';
import { notify, events } from '@bolt/build-core';

const merge = require('merge').recursive;
const defaultConfig = require('./config.default');


const path = require('path');


// module.exports = (userConfig) => {
  /**
   * Build Jekyll
   * @param done
   * @param errorShouldExit {Boolean} [false] - Should it stop the script if an error happens?
   * @param watchTask {Boolean} [false] - Is this a watch task?
   */
function build(done, userConfig, errorShouldExit, shouldWatch) {
  const config = merge(defaultConfig, userConfig);

  const cd = config.cwd ? `cd ${config.cwd} && ` : '';
    // core.utils.sh(`${cd}${config.commandPrefix} build --incremental${watchTask ? ' --watch' : ''}`, errorShouldExit, (err) => {
    //   done(err);
    // });

  notify.sh(`${cd}${config.commandPrefix} build ${config.incremental} ${shouldWatch ? ' --watch' : ''}`, errorShouldExit, (err) => {
    events.emit('reload');
    done(err);
  });
}

function compileJekyll(done, userConfig) {
  function compileJekyllTask(done, userConfig) {
    build(done, userConfig, true, false);
  }
  compileJekyllTask.description = 'Build Jekyll';
  compileJekyllTask.displayName = 'jekyll:compile';

  return compileJekyllTask;
}


function watchJekyll(done, userConfig) {
  function watchJekyllTask(done, userConfig) {
    build(done, userConfig, true, true);
  }
  watchJekyllTask.description = 'Watch Jekyll';
  watchJekyllTask.displayName = 'jekyll:watch';
  return watchJekyllTask;
}


export { compileJekyll, watchJekyll };
