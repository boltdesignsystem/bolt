const patternLabTasksBuilder = require('@theme-tools/plugin-pattern-lab-php');
const webpackTasksBuilder = require('./tasks/webpack-tasks');
const del = require('del');

module.exports = (config, gulp) => {
  const webpackTasks = webpackTasksBuilder(config);

  /**
   * Register Gulp Tasks
   */
  function register() {

    if (config.env === 'pl') {
      const patternLabTasks = patternLabTasksBuilder({
        configFile: config.plConfigFile,
      });

      gulp.task('clean', () => del([config.dist]));

      gulp.task('compile', gulp.series([
        'clean',
        webpackTasks.compile,
        patternLabTasks.compile,
      ]));

      gulp.task('default', gulp.series([
        'compile',
        gulp.parallel([
          webpackTasks.watch,
          patternLabTasks.watch,
        ]),
      ]));
    }
  }

  return {
    register,
  }
};
