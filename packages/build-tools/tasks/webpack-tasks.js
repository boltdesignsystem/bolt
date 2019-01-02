const webpack = require('webpack');
const browserSync = require('browser-sync').create();
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

    // Add Hot Module Reloading scripts to Webpack entrypoint
    // if (webpackConfig[0].devServer.hot) {
    //   webpackConfig[0].entry['bolt-global'].unshift(
    //     `webpack-hot-middleware/client?noInfo=true&http://localhost:${
    //       webpackConfig[0].devServer.port
    //     }/`,
    //   );
    // }

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
      logLevel: 'info',
      ui: false,
      notify: false,
      open: boltBuildConfig.open,
      logFileChanges: false,
      port: webpackConfig[0].devServer.port,
      watchOptions: {
        ignoreInitial: true,
      },
      middleware: [
        {
          route: '/api',
          handle: handleRequest,
        },
      ],
      server: {
        baseDir: boltBuildConfig.wwwDir,
        middleware: [
          webpackDevMiddleware(compiler, webpackConfig[0].devServer),
          webpackHotMiddleware(compiler, {
            log: false,
            quiet: true,
            noInfo: true,
          }),
        ],
      },

      // no need to watch '*.js' here, webpack will take care of it for us,
      // including full page reloads if HMR won't work
      files: [
        `${boltBuildConfig.wwwDir}/**/*.css`,
        `${boltBuildConfig.wwwDir}/**/*.html`,
      ],
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
