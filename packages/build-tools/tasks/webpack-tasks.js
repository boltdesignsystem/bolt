const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const chokidar = require('chokidar');
const createWebpackConfig = require('../create-webpack-config');
const formatWebpackMessages = require('../utils/formatWebpackMessages');
const stringify = require('json-stringify-safe');
const serve = require('webpack-serve');
const WebSocket = require('ws');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

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
    const webpackSpinner = ora(chalk.blue('Building WebPack bundle...')).start();
    const startTime = timer.start();
    const spinFailed = () => webpackSpinner.fail(chalk.red('Building WebPack Failed'));
    if (config.webpackStats) {
      webpackConfig.profile = true;
      webpackConfig.parallelism = 1;
    }
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
      webpackSpinner.succeed(chalk.green(`Built WebPack bundle in ${timer.end(startTime)}`));
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

function watch() {
  return new Promise((resolve, reject) => {
    const webpackSpinner = ora(chalk.blue('Watch triggered WebPack re-bundle...'));
    let startTime;
    const spinFailed = () => webpackSpinner.fail(chalk.red('Watch triggered WebPack Failed'));

    const compiler = webpack(webpackConfig);

    // Fired when a watch triggers a compile
    compiler.plugin('compile', () => {
      webpackSpinner.start();
      startTime = timer.start();
    });

    compiler.watch({
      // https://webpack.js.org/configuration/watch/#watchoptions
      aggregateTimeout: 300,
    }, (err, stats) => {
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
        console.log(config.verbosity > 2 ? new Error(prettyError) : prettyError);
      } else {
        // Stats config options: https://webpack.js.org/configuration/stats/
        const output = stats.toString({
          chunks: false,  // Makes the build much quieter
          colors: true,   // Shows colors in the console
          modules: false, // Hides built modules making output less verbose
          version: false,
        });

        webpackSpinner.succeed(chalk.green(`Watch rebuilt WebPack bundle in ${timer.end(startTime)}`));
        if (config.verbosity > 3) {
          console.log('---');
          console.log(output);
          console.log('===\n');
        }
        events.emit('reload');
      }

    });
  });

}

watch.description = 'Watch & fast re-compile Webpack';
watch.displayName = 'webpack:watch';


function server() {
  return new Promise((resolve, reject) => {

    // Add HMR scripts required to entrypoint
    if (webpackConfig.devServer.hot && !config.prod) {
      webpackConfig.entry['bolt-global'].unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');
    }

    new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer).listen(webpackConfig.devServer.port, 'localhost', function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
    // if (!config.prod) {
    //   webpackConfig.entry['bolt-global'].unshift(hotMiddlewareScript);
    // }

    // serve({
    //   config: webpackConfig,
    //   content: [
    //     path.resolve(process.cwd(), config.wwwDir),
    //   ],
    //   dev: {
    //     stats: webpackConfig.devServer.stats,
    //     watchContentBase: webpackConfig.devServer.watchContentBase,
    //     contentBase: webpackConfig.devServer.contentBase,
    //   },
    //   // hot: {
    //   //   host: 'localhost',
    //   //   port: 8090,
    //   // },
    //   hot: true,
    //   add: (app, middleware, options) => {
    //     // since we're manipulating the order of middleware added, we need to handle
    //     // adding these two internal middleware functions.
    //     middleware.webpack();
    //     middleware.content();

    //     // router *must* be the last middleware added
    //     // app.use(router.routes());
    //   },
    //   logTime: true,
    //   // on: {
    //   //   listening(server) {
    //   //     const socket = new WebSocket('ws://localhost:8090');
    //   //     const watchPath = webpackConfig.devServer.contentBase;
    //   //     const options = {};
    //   //     const watcher = chokidar.watch(watchPath, options);

    //   //     watcher.on('change', (path) => {
    //   //       // log.info(`Wrote WebPack stats json file to "${path.relative(process.cwd(), statsFilePath)}"`);
    //   //       log.info(`File ${path} has changed. Reloading...`);
    //   //       console.log(Date());

    //   //       const data = {
    //   //         type: 'broadcast',
    //   //         data: {
    //   //           type: 'window-reload',
    //   //           data: {},
    //   //         },
    //   //       };

    //   //       socket.send(stringify(data));
    //   //     });

    //   //     server.on('close', () => {
    //   //       watcher.close();
    //   //     });
    //   //   },
    //   // },
    // });

    // new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer).listen(webpackConfig.devServer.port, 'localhost', function (err) {
    //   if (err) {
    //     return reject(err);
    //   }
    //   return resolve();
    // });

  });
}
server.description = 'Webpack Dev Server';
server.displayName = 'webpack:server';

module.exports = {
  compile,
  watch,
  server,
};
