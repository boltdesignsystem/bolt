const log = require('../utils/log');
const run = require('../utils/run');

module.exports = async (options) => {
  const webpackTasks = require('../tasks/webpack-tasks')();
  const patternLabTasks = await require('../tasks/pattern-lab-tasks')();
  const serverTasks = require('../tasks/server-tasks');
  // @todo figure out how to best conditionally run tasks based on environment (`pl`, `drupal`)

  async function parallelBuild() {
    try {
      run.parallel([
        webpackTasks.compile,
        patternLabTasks.compile,
      ]);
    } catch (error) {
      log.errorAndExit('build (parallel)', error);
    }
  }

  async function serialBuild() {
    try {
      run.series([
        webpackTasks.compile,
        patternLabTasks.compile,
      ]);
    } catch (error) {
      log.errorAndExit('build (serial)', error);
    }
  }

  async function parallelWatch() {
    try {
      run.parallel([
        webpackTasks.server,
        patternLabTasks.compile,
        serverTasks.serve,
        patternLabTasks.watch,
      ]);
    } catch (error) {
      log.errorAndExit('watch', error);
    }
  }

  if (options.watch) {
    parallelWatch();
  } else {
    if (options.parallel) {
      parallelBuild();
    } else {
      serialBuild();
    }
  }
};
