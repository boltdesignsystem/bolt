const webpack = require('webpack');
const chalk = require('chalk');
const createWebpackConfig = require('../create-webpack-config');
const formatWebpackMessages = require('../utils/formatWebpackMessages');
const events = require('../utils/events');
const log = require('../utils/log');

module.exports = (config, options) => {
  const webpackConfig = createWebpackConfig(config);

  function compile() {
    return new Promise((resolve, reject) => {
      log.taskStart('build: webpack');
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          return reject(err);
        }
        const messages = formatWebpackMessages(stats.toJson({}, true));
        if (messages.errors.length) {
          // Only keep the first error. Others are often indicative
          // of the same problem, but confuse the reader with noise.
          if (messages.errors.length > 1) {
            messages.errors.length = 1;
          }
          const prettyError = messages.errors.join('\n\n');

          return reject(options.verbosity > 2 ? new Error(prettyError) : prettyError);
        }
        // Stats config options: https://webpack.js.org/configuration/stats/
        console.log(stats.toString({
          chunks: false,  // Makes the build much quieter
          colors: true,   // Shows colors in the console
          modules: false, // Hides built modules making output less verbose
        }));

        if (messages.warnings.length) {
          console.log(chalk.yellow('Compiled with warnings.\n'));
          console.log(warnings.join('\n\n'));
          console.log(
            '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
          );
          console.log(
            'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
          );
        } else {
          console.log(chalk.green('Compiled successfully.\n'));
        }

        log.taskDone('build: webpack');
        return resolve();
      });
    });

  }

  compile.description = 'Compile Webpack';
  compile.displayName = 'webpack:compile';

  function watch() {
    return new Promise((resolve, reject) => {
      log.taskStart('watch: webpack');
      webpack(webpackConfig).watch({
        // https://webpack.js.org/configuration/watch/#watchoptions
        aggregateTimeout: 300,
      }, (err, stats) => {
        if (err) {
          return reject(err);
        }

        // Stats config options: https://webpack.js.org/configuration/stats/
        console.log(stats.toString({
          chunks: false,  // Makes the build much quieter
          colors: true,   // Shows colors in the console
          modules: false, // Hides built modules making output less verbose
          version: false,
        }));

        events.emit('reload');
        return resolve();
      });
    });

  }

  watch.description = 'Watch & fast re-compile Webpack';
  watch.displayName = 'webpack:watch';

  return {
    compile,
    watch,
  };
};
