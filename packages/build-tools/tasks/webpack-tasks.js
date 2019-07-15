const webpack = require('webpack');
const express = require('express');
const browserSync = require('browser-sync').create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const chalk = require('chalk');
const { handleRequest } = require('@bolt/api');
const { getConfig } = require('@bolt/build-utils/config-store');
const { boltWebpackMessages } = require('@bolt/build-utils/webpack-helpers');
const events = require('@bolt/build-utils/events');
const createWebpackConfig = require('../create-webpack-config');
const webpackDevServerWaitpage = require('./webpack-dev-server-waitpage');

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
  const useHotMiddleware = !(
    Array.isArray(boltBuildConfig.lang) && boltBuildConfig.lang.length > 1
  );

  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  const browserSyncFileToWatch = [
    `${boltBuildConfig.wwwDir}/**/*.css`,
    `${boltBuildConfig.wwwDir}/**/*.html`,
  ];

  const isUsingInternalServer =
    typeof boltBuildConfig.proxyHostname === 'undefined' &&
    typeof boltBuildConfig.proxyPort === 'undefined';

  if (useHotMiddleware === false || isUsingInternalServer) {
    browserSyncFileToWatch.push(`${boltBuildConfig.wwwDir}/**/*.js`);
  }

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
          open: boltBuildConfig.openServerAtStart,
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
    app.use(webpackDevMiddleware(compiler, webpackConfig[0].devServer));

    // Don't use hot middleware when there's more than 1 language setup in the config -- workaround to prevent infinite loops when doing local dev
    if (useHotMiddleware) {
      app.use(
        webpackHotMiddleware(compiler, {
          log: false,
          quiet: true,
          noInfo: true,
          logLevel: 'silent',
          reload: true,
        }),
      );
    } else {
      console.log(
        chalk.yellow(
          '\n⚠️  Warning: disabling webpackHotMiddleware (HMR) to avoid infinite loops... falling back to a simple page reload. \n   To re-enable HMR, update your .boltrc config to only compile for one language at a time while doing local dev work.\n',
        ),
      );
    }

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
