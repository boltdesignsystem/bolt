const defaultConfig = require('./config.default');
const yaml = require('js-yaml');
const merge = require('merge').recursive;
const exec = require('gulp-exec');
const gulpConfig = require('../../gulpconfig.js');
const browserSync = require('browser-sync');
const fs = require('fs-extra');
const path = require('path');

const patternLabConfig = yaml.safeLoad(
  fs.readFileSync(gulpConfig.patternLab.configFile, 'utf8')
);
const patternLabRoot = path.join(gulpConfig.patternLab.configFile, '../..');
const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);
const consolePath = path.join(patternLabRoot, 'core/console');
const plumber = require('gulp-plumber');
const notify = require('./notifier.js');
// const patternLabPublic = path.join(patternLabRoot, patternLabConfig.publicDir);


module.exports = (gulp, userConfig) => {
  const tasks = {};
  const config = merge(defaultConfig, userConfig);

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
  function buildPatternLab(done, errorShouldExit) {
    notify.sh(`php ${consolePath} --generate`, errorShouldExit, (err) => {
      browserSync.reload;
      done(err);
    });
  }


  // Initial PL build - exits if error
  function compilePatternLab(done) {
    buildPatternLab(done, true);
  }
  compilePatternLab.description = 'Compile Pattern Lab -- Exit If Error';
  compilePatternLab.displayName = 'pattern-lab:compile';


  // Recompile PL -- doesn't exit if error
  function recompilePatternLab(done) {
    buildPatternLab(done, false);
  }
  recompilePatternLab.description = 'Recompile Pattern Lab w/ Error Handling';
  recompilePatternLab.displayName = 'pattern-lab:recompile';


  function watchPatternLab() {
    const watchedExtensions = config.watchedExtensions.join(',');
    const patternLabGlob = [path.normalize(`${patternLabSource}/**/*.{${watchedExtensions}}`)];
    const watchedSources = config.extraWatches
      ? [].concat(patternLabGlob, config.extraWatches)
      : patternLabGlob;
    gulp.watch(watchedSources, recompilePatternLab);
  }
  watchPatternLab.description = 'Watch and rebuild Pattern Lab';
  watchPatternLab.displayName = 'pattern-lab:watch';

  console.log(compilePatternLab);

  return {
    compilePatternLab,
    watchPatternLab,
  };

  // return tasks;
};
