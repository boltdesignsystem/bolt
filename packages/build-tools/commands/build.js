const log = require('../utils/log');

module.exports = async (config, options) => {
  const webpackTasks = require('../tasks/webpack-tasks')(config, options);
  const patternLabTasks = await require('../tasks/pattern-lab-tasks')(config, options);

  async function parallelBuild() {
    try {
      const pl = patternLabTasks.compile();
      const wp = webpackTasks.compile();

      await pl;
      await wp;
    } catch (error) {
      log.errorAndExit('build (parallel)', error);
    }
  }

  async function serialBuild() {
    try {
      // @todo figure out how to best conditionally run tasks based on environment
      // this is intentionally the only conditional task
      if (config.env === 'pl') {
        await patternLabTasks.compile();
      }
      await webpackTasks.compile();
    } catch (error) {
      log.errorAndExit('build (serial)', error);
    }
  }

  async function parallelWatch() {
    try {
      const pl = patternLabTasks.watch();
      const wp = webpackTasks.watch();
      await pl;
      await wp;
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
