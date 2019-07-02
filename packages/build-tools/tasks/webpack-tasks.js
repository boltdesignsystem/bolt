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
  const useHotMiddleware =
    Array.isArray(boltBuildConfig.lang) && boltBuildConfig.lang.length > 1
      ? false
      : true;

  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  const browserSyncFileToWatch = [
    `${boltBuildConfig.wwwDir}/**/*.css`,
    `${boltBuildConfig.wwwDir}/**/*.html`,
  ];

  if (useHotMiddleware === false) {
    browserSyncFileToWatch.push(`${boltBuildConfig.wwwDir}/**/*.js`);
  }

  return new Promise((resolve, reject) => {
    if (!browserSyncIsRunning) {
      browserSync.init(
        {
          proxy: 'localhost:' + boltBuildConfig.port,
          logLevel: 'info',
          ui: false,
          notify: false,
          open: boltBuildConfig.openServerAtStart,
          logFileChanges: false,
          reloadOnRestart: true,
          watchOptions: {
            ignoreInitial: true,
          },
          files: browserSyncFileToWatch,
        },
        function(err, bs) {
          browserSyncIsRunning = true; // so we only spin this up once Webpack has finished up initially
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
        redirectPath: `http://localhost:${boltBuildConfig.port}/${
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
    app.use('/api', handleRequest);

    app.listen(boltBuildConfig.port, '0.0.0.0', function onStart(err) {
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
