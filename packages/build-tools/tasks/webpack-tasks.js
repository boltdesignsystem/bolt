const webpack = require('webpack');
const express = require('express');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const createWebpackConfig = require('../create-webpack-config');
const { getConfig } = require('../utils/config-store');
const { boltWebpackMessages } = require('../utils/webpack-helpers');
const { handleRequest } = require('../api');

let boltBuildConfig;

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
  boltBuildConfig = boltBuildConfig || (await getConfig());
  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  return new Promise((resolve, reject) => {
    const compiler = boltWebpackMessages(webpack(webpackConfig));
    const server = express();

    server.use(webpackDevMiddleware(compiler, webpackConfig[0].devServer));
    server.use(
      webpackHotMiddleware(compiler, {
        log: false,
        quiet: true,
        noInfo: true,
        logLevel: 'silent',
        reload: true,
      }),
    );

    server.use(express.static(boltBuildConfig.wwwDir));
    server.use('/api', handleRequest);

    server.listen(boltBuildConfig.port, '0.0.0.0', function onStart(err) {
      if (err) {
        console.log(err);
      }

      browserSync({
        proxy: 'localhost:' + boltBuildConfig.port,
        logLevel: 'info',
        ui: false,
        notify: false,
        open: boltBuildConfig.open,
        logFileChanges: false,
        reloadOnRestart: true,
        watchOptions: {
          ignoreInitial: true,
        },
        files: [
          `${boltBuildConfig.wwwDir}/**/*.css`,
          `${boltBuildConfig.wwwDir}/**/*.html`,
        ],
      });
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
