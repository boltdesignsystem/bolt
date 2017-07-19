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

  console.log(config.browserSync.serverName);

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

  // const patternLabConfig = yaml.safeLoad(
  //   fs.readFileSync(config.configFile, 'utf8')
  // );
  // const plRoot = path.join(config.configFile, '../..');
  // const plSource = path.join(plRoot, plConfig.sourceDir);
  // const plPublic = path.join(plRoot, plConfig.publicDir);
  // const consolePath = path.join(plRoot, 'core/console');
  // console.log(consolePath);

  function buildPatternLab(done) {
    notify.sh(`php ${consolePath} --generate`, false, () => {
      if (config.browserSync.enabled) {
        browserSync.reload;
      }
      done();
    });
    // return gulp.src('.')
    //   .pipe(plumber({
    //     errorHandler: notify.onError({
    //       title: 'Pattern Lab Error',
    //       message: 'Error: <%= error.message %>'
    //     })
    //   }))
    //   .pipe(notify.sh(`php ${consolePath} --generate --gpn`, options))
    //   .pipe(exec.reporter(reportOptions))
    //   .on('end', () => {
    //     if (config.browserSync.enabled) {
    //       const server = browserSync.get(config.browserSync.serverName);
    //       if (server.active) {
    //         server.reload();
    //       }
    //     }
    //     // core.events.emit('reload', join(config.dest, '**/*.css'));
    //     done();
    //   });
    // .pipe($.exec.reporter(reportOptions));
    // shell.task(`php ${consolePath} --generate`, (err) => {
    //   // core.events.emit('reload');
    //   if (config.browserSync.enabled) {
    //     const server = browserSync.get(config.browserSync.serverName);
    //     if (server.active) {
    //       server.reload();
    //     }
    //   }
    //
    //   // done(err);
    // });
  }

  // function compile(done) {
  //   plBuild(done, true);
  // }
  // compile.description = 'Compile Pattern Lab';
  // compile.displayName = 'pattern-lab:compile';
  tasks.compile = buildPatternLab;

  return tasks;
};
