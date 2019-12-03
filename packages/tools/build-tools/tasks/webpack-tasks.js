const webpack = require('webpack');
const express = require('express');
const browserSync = require('browser-sync').create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const chalk = require('chalk');
const opn = require('better-opn');
const { getConfig } = require('@bolt/build-utils/config-store');
const { boltWebpackMessages } = require('@bolt/build-utils/webpack-helpers');
const events = require('@bolt/build-utils/events');
const createWebpackConfig = require('../create-webpack-config');
const webpackDevServerWaitpage = require('./webpack-dev-server-waitpage');
const {
  webpackStats,
  statsPreset,
} = require('@bolt/build-utils/webpack-verbosity');

let boltBuildConfig;
let browserSyncIsRunning = false;
const app = express();

async function compile(customWebpackConfig) {
  boltBuildConfig = boltBuildConfig || (await getConfig());
  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  return new Promise((resolve, reject) => {
    const compiler = boltWebpackMessages(webpack(webpackConfig));
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
}

compile.description = 'Compile Webpack';
compile.displayName = 'webpack:compile';

async function watch(customConfig) {
  boltBuildConfig = boltBuildConfig || (await getConfig());
  const webpackConfig =
    customConfig || (await createWebpackConfig(boltBuildConfig));

  return new Promise((resolve, reject) => {
    const compiler = boltWebpackMessages(webpack(webpackConfig));

    compiler.watch({
      // https://webpack.js.org/configuration/watch/#watchoptions
      aggregateTimeout: 300,
    });
  });
}

watch.description = 'Watch & fast re-compile Webpack';
watch.displayName = 'webpack:watch';

async function server(customWebpackConfig) {
  const boltBuildConfig = await getConfig();
  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  const browserSyncFileToWatch = [
    `${boltBuildConfig.wwwDir}/**/*.css`,
    `${boltBuildConfig.wwwDir}/**/*.html`,
    `${boltBuildConfig.wwwDir}/**/*.js`,
    `!**/node_modules/**/*`,
    `!**/vendor/**/*`,
  ];

  const isUsingInternalServer =
    typeof boltBuildConfig.proxyHostname === 'undefined' &&
    typeof boltBuildConfig.proxyPort === 'undefined';

  return new Promise((resolve, reject) => {
    if (!browserSyncIsRunning) {
      browserSync.init(
        {
          proxy: !isUsingInternalServer
            ? `${boltBuildConfig.proxyHostname}:${boltBuildConfig.proxyPort}`
            : `${boltBuildConfig.hostname}:${boltBuildConfig.port}`,
          logLevel: 'info',
          ui: false,
          notify: false,
          open: false,
          // This can be temporarily toggled to solve IP access issues on a lan. https://www.browsersync.io/docs/options#option-tunnel
          tunnel: false,
          logFileChanges: false,
          reloadOnRestart: true,
          watchOptions: {
            ignoreInitial: true,
          },
          port: boltBuildConfig.port,
          files: browserSyncFileToWatch,
        },
        function(err, bs) {
          browserSyncIsRunning = true; // so we only spin this up once Webpack has finished up initially

          if (boltBuildConfig.openServerAtStart) {
            opn(`http://${boltBuildConfig.hostname}:${boltBuildConfig.port}`);
          }

          if (!isUsingInternalServer) {
            console.log(
              chalk.green(
                `\nBrowsersync is now proxying ${chalk.underline(
                  `http://${boltBuildConfig.proxyHostname}:${boltBuildConfig.proxyPort}`,
                )}.\nOpen ${chalk.underline(
                  `http://${boltBuildConfig.hostname}:${boltBuildConfig.port}`,
                )} to have your locally served pages automatically reload when HTML, CSS, and Javascript files are updated. \n`,
              ),
            );
          }
        },
      );
    }

    const compiler = boltWebpackMessages(webpack(webpackConfig));

    compiler.hooks.done.tap('AfterDonePlugin', (params, callback) => {
      events.emit('webpack-dev-server:compiled');
    });

    app.use(
      webpackDevServerWaitpage(compiler, {
        proxyHeader: boltBuildConfig.proxyHeader,
        redirectPath: `${boltBuildConfig.proxyHostname}:${
          boltBuildConfig.proxyPort
        }/${
          boltBuildConfig.startPath !== '/' ? boltBuildConfig.startPath : ''
        }`,
      }),
    );
    app.use(
      webpackDevMiddleware(compiler, {
        quiet: true,
        stats: 'errors-warnings',
        writeToDisk: true,
        logLevel: 'error',
        stats: statsPreset(webpackStats[boltBuildConfig.verbosity]),
      }),
    );

    app.use(express.static(boltBuildConfig.wwwDir));
    // app.use('/api', handleRequest); // Component Explorer being temporarily disabled until we've migrated our Twig Rendering Service to Now.sh v2

    app.listen(boltBuildConfig.port, boltBuildConfig.hostname, function onStart(
      err,
    ) {
      if (err) {
        console.log(err);
      }
    });
  });
}
server.description = 'Webpack Dev Server';
server.displayName = 'webpack:server';

module.exports = {
  compile,
  watch,
  server,
};
