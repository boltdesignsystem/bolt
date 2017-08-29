/* eslint no-unused-vars: ["error", { "args": "none" }]*/
import gulp from 'gulp';
import { notify, events } from '@bolt/build-core';

const merge = require('merge').recursive;
const defaultConfig = require('./config.default');
const join = require('path').join;
const path = require('path');


// module.exports = (userConfig) => {
  /**
   * Build Jekyll
   * @param done
   * @param errorShouldExit {Boolean} [false] - Should it stop the script if an error happens?
   * @param watchTask {Boolean} [false] - Is this a watch task?
   */


  //  gulp.task('jekyll', () => {
  //
  //  });



function build(done, config, errorShouldExit) {
  const cd = config.source ? `cd ${config.source} && ` : '';

  notify.sh(`${cd} jekyll build ${config.incremental ? '--incremental' : '' } ${config.drafts ? '--drafts' : '' } ${config.watch ? '--watch' : '' }`, errorShouldExit, (err) => {
    events.emit('reload');
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


//
// function rebuildJekyll(done, config){
//   build(done, config, true);
// }
//
//
// function watchJekyll(done, userConfig) {
//   function watchJekyllTask(done, userConfig) {
//     const config = merge(defaultConfig, userConfig, {
//       watch: true
//     });
//
//
//     gulp.watch(config.source + '**/*', gulp.parallel([rebuildJekyll]));
//   }
//   watchJekyllTask.description = 'Watch Jekyll';
//   watchJekyllTask.displayName = 'jekyll:watch';
//
//   return watchJekyllTask;
// }

//
// function recompileJekyll(done, userConfig) {
//   function recompileJekyllTask(done, userConfig) {
//     build(done, userConfig, false, false);
//   }
//   recompileJekyllTask.description = 'Rebuild Jekyll';
//   recompileJekyllTask.displayName = 'jekyll:recompile';
//
//   return recompileJekyllTask;
// }
//
//
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


export { compileJekyll, watchJekyll };
