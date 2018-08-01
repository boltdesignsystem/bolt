const webpack = require('webpack');
const serve = require('webpack-serve');
const chalk = require('chalk');
const Ora = require('ora');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const createWebpackConfig = require('../create-webpack-config');
const formatWebpackMessages = require('../utils/formatWebpackMessages');
const events = require('../utils/events');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');
const writeFile = promisify(fs.writeFile);
const timer = require('../utils/timer');
const webpackServeWaitpage = require('./webpack-serve-waitpage');

let config;

let webpackConfigs;
async function compile() {
  config = config || (await getConfig());
  config.devServer = false;

  if (!webpackConfigs) {
    webpackConfigs = await createWebpackConfig(config);
  }

  return new Promise((resolve, reject) => {
    const webpackSpinner = new Ora(
      chalk.blue('Compiling Webpack for the first time...'),
    ).start();
    const startTime = timer.start();
    const spinFailed = () =>
      webpackSpinner.fail(chalk.red('Initial Webpack compile failed!'));

    webpack(webpackConfigs).run(async (err, stats) => {
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

        return reject(
          config.verbosity > 2 ? new Error(prettyError) : prettyError,
        );
      }
      webpackSpinner.succeed(
        chalk.green(`Compiled Webpack in ${timer.end(startTime)}`),
      );
      let output;
      // Stats config options: https://webpack.js.org/configuration/stats/
      output = stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
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
        await writeFile(
          statsFilePath,
          JSON.stringify(stats.toJson(), null, '  '),
        );
        log.info(
          `Wrote WebPack stats json file to "${path.relative(
            process.cwd(),
            statsFilePath,
          )}"`,
        );
      }

      // log.taskDone('build: webpack');
      return resolve(output);
    });
  });
}

compile.description = 'Compile Webpack';
compile.displayName = 'webpack:compile';

async function watch() {
  const config = await getConfig();

  if (!webpackConfigs) {
    webpackConfigs = await createWebpackConfig(config);
  }

  return new Promise((resolve, reject) => {
    const webpackSpinner = new Ora(
      chalk.blue('Watch triggered WebPack re-bundle...'),
    );
    let startTime;
    const spinFailed = () =>
      webpackSpinner.fail(chalk.red('Watch triggered WebPack Failed'));

    const compiler = webpack(webpackConfigs);

    // Fired when a watch triggers a compile
    compiler.compilers.forEach(comp => {
      comp.plugin('compile', () => {
        webpackSpinner.start();
        startTime = timer.start();
      });
    });

    compiler.watch(
      {
        // https://webpack.js.org/configuration/watch/#watchoptions
        aggregateTimeout: 300,
      },
      (err, stats) => {
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
          console.log(
            config.verbosity > 2 ? new Error(prettyError) : prettyError,
          );
        } else {
          // Stats config options: https://webpack.js.org/configuration/stats/
          const output = stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true, // Shows colors in the console
            modules: false, // Hides built modules making output less verbose
            version: false,
          });

          webpackSpinner.succeed(
            chalk.green(
              `Watch rebuilt WebPack bundle in ${timer.end(startTime)}`,
            ),
          );
          if (config.verbosity > 3) {
            console.log('---');
            console.log(output);
            console.log('===\n');
          }
          events.emit('reload');
        }
      },
    );
  });
}

watch.description = 'Watch & fast re-compile Webpack';
watch.displayName = 'webpack:watch';

async function server(buildTime) {
  let initialBuild = true;
  config = config || (await getConfig());
  config.devServer = true;
  // const serverConfig = await getServerConfig(); // WIP: working on browsersync integration w/ Webpack

  if (!webpackConfigs) {
    webpackConfigs = await createWebpackConfig(config);
  }

  return new Promise((resolve, reject) => {
    let startTime;
    const compiler = webpack(webpackConfigs);

    serve(
      {
        logTime: false,
        logLevel: 'silent',
        open: config.openServerAtStart,
        hotClient: {
          logLevel: 'silent',
          hot: true,
          host: {
            client: '*',
            server: '0.0.0.0',
          },
        },
        content: path.resolve(process.cwd(), config.wwwDir),
        devWare: {
          logLevel: 'silent',
          publicPath: webpackConfigs[0].output.publicPath,
          hot: true,
          writeToDisk: true,
          stats: webpackConfigs[0].stats,
        },
      },
      {
        compiler,
        config: webpackConfigs[0],
        add: (app, middleware, options) => {
          app.use(
            webpackServeWaitpage(options, {
              title: 'Bolt Development Server',
              theme: 'bolt',
              proxyHeader: config.proxyHeader,
              redirectPath: `http://localhost:${config.port}/${
                config.startPath
              }`,
            }),
          );
        },
      },
    );
  });
}
server.description = 'Webpack Dev Server';
server.displayName = 'webpack:server';

module.exports = {
  compile,
  watch,
  server,
};
