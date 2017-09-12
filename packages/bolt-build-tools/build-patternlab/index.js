/* eslint no-unused-vars: ["error", { "args": "none" }] */
const gulp = require('gulp');
const core = require('@bolt/build-core');
const defaultConfig = require('./config.default');
const yaml = require('js-yaml');
const merge = require('merge').recursive;
const gulpConfig = require('../../../gulpconfig.js');
const fs = require('fs-extra');
const path = require('path');

const patternLabConfig = yaml.safeLoad(
  fs.readFileSync(gulpConfig.patternLab.configFile, 'utf8')
);
const patternLabRoot = path.join(gulpConfig.patternLab.configFile, '../..');
const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);
const consolePath = path.join(patternLabRoot, 'core/console');
// const patternLabPublic = path.join(patternLabRoot, patternLabConfig.publicDir);


// Build Pattern Lab via CLI command -- can exit or not based on 2nd param passed in
function patternLab(done, errorShouldExit) {
  core.notify.sh(`php ${consolePath} --generate`, errorShouldExit, (err) => {
    core.events.emit('reload');
    done(err);
  });
}

// Used by watches
function compileWithNoExit(done) {
  patternLab(done, false);
}


// Initial PL build - exits if error
function compilePatternLab() {
  function compilePatternLabTask(done, errorShouldExit) {
    patternLab(done, true);
  }
  compilePatternLabTask.description = 'Compile Pattern Lab -- Exit If Error';
  compilePatternLabTask.displayName = 'patternlab:compile';
  return compilePatternLabTask;
}
module.exports.compile = compilePatternLab;

// Recompile PL -- doesn't exit if error
function recompilePatternLab() {
  function recompilePatternLabTask(done, errorShouldExit) {
    patternLab(done, false);
  }
  recompilePatternLabTask.description = 'Recompile Pattern Lab w/ Error Handling';
  recompilePatternLabTask.displayName = 'patternlab:recompile';
  return recompilePatternLabTask;
}
module.exports.recompile = recompilePatternLab;


// Watch PL for changes
function watchPatternLab(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function watchPatternLabTask() {
    const watchedExtensions = config.watchedExtensions.join(',');
    const patternLabGlob = [
      path.normalize(`${patternLabSource}/**/*.{${watchedExtensions}}`),
      '!**/package.json'
    ];
    const watchedSources = config.extraWatches
      ? [].concat(patternLabGlob, config.extraWatches)
      : patternLabGlob;

    gulp.watch(watchedSources, compileWithNoExit);
  }
  watchPatternLabTask.description = 'Watch and rebuild Pattern Lab';
  watchPatternLabTask.displayName = 'patternlab:watch';
  return watchPatternLabTask;
}
module.exports.watch = watchPatternLab;
