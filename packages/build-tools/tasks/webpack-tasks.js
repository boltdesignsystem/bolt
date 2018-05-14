const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const chokidar = require('chokidar');
const createWebpackConfig = require('../create-webpack-config');
const formatWebpackMessages = require('../utils/formatWebpackMessages');
const stringify = require('json-stringify-safe');
const serve = require('webpack-serve');
const WebSocket = require('ws');

const events = require('../utils/events');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');
const ora = require('ora');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const path = require('path');
const timer = require('../utils/timer');

const config = getConfig();
const webpackConfig = createWebpackConfig(config);

function compile() {
  return new Promise((resolve, reject) => {
    const webpackSpinner = ora(chalk.blue('Compiling Webpack for the first time...')).start();
    const startTime = timer.start();
    if (config.webpackStats) {
      webpackConfig.profile = true;
      webpackConfig.parallelism = 1;
    }
    const spinFailed = () => webpackSpinner.fail(chalk.red('Initial Webpack compile failed!'));
    webpack(webpackConfig).run(async (err, stats) => {
      if (err) {
        spinFailed();
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        spinFailed();
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        const prettyError = messages.errors.join('\n\n');

        return reject(config.verbosity > 2 ? new Error(prettyError) : prettyError);
      }
      webpackSpinner.succeed(chalk.green(`Compiled Webpack in ${timer.end(startTime)}`));
      let output;
      // Stats config options: https://webpack.js.org/configuration/stats/
      output = stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true,   // Shows colors in the console
        modules: false, // Hides built modules making output less verbose
      });

      if (messages.warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(messages.warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.',
        );
        console.log(
          'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n',
        );
      }


      if (config.verbosity > 2) {
        console.log('---');
        console.log(output);
        console.log('===\n');
      }

      if (config.webpackStats) {
        const statsFilePath = path.join(config.buildDir, 'webpack-stats.json');
        await writeFile(statsFilePath, JSON.stringify(stats.toJson(), null, '  '));
        log.info(`Wrote WebPack stats json file to "${path.relative(process.cwd(), statsFilePath)}"`);
      }

      // log.taskDone('build: webpack');
      return resolve(output);
    });
  });

}

compile.description = 'Compile Webpack';
compile.displayName = 'webpack:compile';


function server() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    const webpackSpinner = ora(chalk.blue('Recompiling Webpack...'));
    let startTime;
    const spinFailed = () => webpackSpinner.fail(chalk.red('Recompiling Webpack failed!'));

    serve({
      config: webpackConfig,
      compiler,
      logTime: false,
      logLevel: 'silent',
      hot: {
        logLevel: 'silent',
        hot: true,
      },
      content: [
        path.resolve(process.cwd(), config.wwwDir),
      ],
      dev: {
        logLevel: 'silent',
        publicPath: webpackConfig.devServer.publicPath,
        hot: true,
        stats: webpackConfig.devServer.stats,
        watchContentBase: webpackConfig.devServer.watchContentBase,
        contentBase: webpackConfig.devServer.contentBase,
        writeToDisk: true,
      },
    }).then((server) => {

      server.on('build-started', () => {
        webpackSpinner.start();
        startTime = timer.start();
      });

      server.on('build-finished', ({
        stats,
      }) => {
        const messages = formatWebpackMessages(stats.toJson({}, true));

        if (messages.errors.length) {
          spinFailed();
          // Only keep the first error. Others are often indicative
          // of the same problem, but confuse the reader with noise.
          if (messages.errors.length > 1) {
            messages.errors.length = 1;
          }
          const prettyError = messages.errors.join('\n\n');
          console.log(config.verbosity > 2 ? new Error(prettyError) : prettyError);
        } else {
          // Stats config options: https://webpack.js.org/configuration/stats/
          const output = stats.toString({
            chunks: false,  // Makes the build much quieter
            colors: true,   // Shows colors in the console
            modules: false, // Hides built modules making output less verbose
            version: false,
          });

          webpackSpinner.succeed(chalk.green(`Recompiled Webpack in ${timer.end(startTime)}`));
          if (config.verbosity > 3) {
            console.log('---');
            console.log(output);
            console.log('===\n');
          }
        }
      });
    });

  });
}
server.description = 'Webpack Dev Server';
server.displayName = 'webpack:server';

module.exports = {
  compile,
  server,
};
