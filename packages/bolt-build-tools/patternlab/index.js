import gulp from 'gulp';
import { notify, utils, events } from '@bolt/build-core';

const defaultConfig = require('./config.default');
const yaml = require('js-yaml');
const merge = require('merge').recursive;
const exec = require('gulp-exec');
const gulpConfig = require('../../../gulpconfig.js');
const browserSync = require('browser-sync');
const fs = require('fs-extra');
const path = require('path');
const join = require('path').join;
const debug = require('debug')('@bolt/build-tools-pattern-lab');
const plumber = require('gulp-plumber');

const patternLabConfig = yaml.safeLoad(
  fs.readFileSync(gulpConfig.patternLab.configFile, 'utf8')
);
const patternLabRoot = path.join(gulpConfig.patternLab.configFile, '../..');
const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);
const consolePath = path.join(patternLabRoot, 'core/console');
// const notify = require('./notifier.js');
// const patternLabPublic = path.join(patternLabRoot, patternLabConfig.publicDir);


const options = {
  continueOnError: false, // default = false, true means don't emit error event
  pipeStdout: false, // default = false, true means stdout is written to file.contents
  // customTemplatingThing: 'test' // content passed to gutil.template()
};
const reportOptions = {
  err: true, // default = true, false means don't write err
  stderr: true, // default = true, false means don't write stderr
  stdout: true // default = true, false means don't write stdout
};


// Build Pattern Lab via CLI command -- can exit or not based on 2nd param passed in
function patternLab(done, errorShouldExit) {
  notify.sh(`php ${consolePath} --generate`, errorShouldExit, (err) => {
    // browserSync.reload;
    events.emit('reload');
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

// Recompile PL -- doesn't exit if error
function recompilePatternLab() {
  function recompilePatternLabTask(done, errorShouldExit) {
    patternLab(done, false);
  }
  recompilePatternLabTask.description = 'Recompile Pattern Lab w/ Error Handling';
  recompilePatternLabTask.displayName = 'patternlab:recompile';
  return recompilePatternLabTask;
}


// Watch PL for changes
function watchPatternLab(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function watchPatternLabTask() {
    const watchedExtensions = config.watchedExtensions.join(',');
    const patternLabGlob = [path.normalize(`${patternLabSource}/**/*.{${watchedExtensions}}`)];
    const watchedSources = config.extraWatches
        ? [].concat(patternLabGlob, config.extraWatches)
        : patternLabGlob;

    gulp.watch(watchedSources, compileWithNoExit);
  }
  watchPatternLabTask.description = 'Watch and rebuild Pattern Lab';
  watchPatternLabTask.displayName = 'patternlab:watch';
  return watchPatternLabTask;
}

// events.on('symlinked', (files) => {
//   console.log('symlinked!');
//   debug('Event triggered: "symlinked"', files);
//   compileWithNoExit;
// });


export { compilePatternLab, recompilePatternLab, watchPatternLab };
