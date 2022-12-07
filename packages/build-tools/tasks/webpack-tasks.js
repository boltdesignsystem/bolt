const webpack = require('webpack');
const express = require('express');
const browserSync = require('browser-sync').create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const chalk = require('chalk');
const opn = require('better-opn');
const { handleRequest } = require('@bolt/api');
const { getConfig } = require('@bolt/build-utils/config-store');
const { boltWebpackMessages } = require('@bolt/build-utils/webpack-helpers');
const events = require('@bolt/build-utils/events');
const {
  webpackStats,
  statsPreset,
} = require('@bolt/build-utils/webpack-verbosity');
const fs = require('fs');
const createWebpackConfig = require('../create-webpack-config');
const webpackDevServerWaitpage = require('./webpack-dev-server-waitpage');

let boltBuildConfig;
let browserSyncIsRunning = false;
const app = express();

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

async function compile(customWebpackConfig) {
  boltBuildConfig = boltBuildConfig || (await getConfig());
  const webpackConfig =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  return new Promise((resolve, reject) => {
    const compiler = boltWebpackMessages(webpack(webpackConfig));
    compiler.run((err, stats) => {
      // Don't forget to close the compiler
      // @see https://webpack.js.org/api/node/#run
      compiler.close();
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

    compiler.watch(
      {
        // https://webpack.js.org/configuration/watch/#watchoptions
        aggregateTimeout: 300,
        poll: 1000,
      },
      (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(
          stats.toString(statsPreset(webpackStats[boltBuildConfig.verbosity])),
        );
      },
    );
  });
}

watch.description = 'Watch & fast re-compile Webpack';
watch.displayName = 'webpack:watch';

async function server(customWebpackConfig) {
  const boltBuildConfig = await getConfig();
  const webpackConfigs =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  const browserSyncFileToWatch = [
    `${boltBuildConfig.wwwDir}/**/*.css`,
    `${boltBuildConfig.wwwDir}/**/*.html`,
    `!**/node_modules/**/*`,
    `!**/vendor/**/*`,
  ];

  browserSyncFileToWatch.push(`${boltBuildConfig.wwwDir}/**/*.js`);

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

    const compiler = boltWebpackMessages(webpack(webpackConfigs));

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
        writeToDisk: true,
        stats: statsPreset(webpackStats[boltBuildConfig.verbosity]),
      }),
    );

    app.use(express.static(boltBuildConfig.wwwDir));
    // app.use('/api', handleRequest); // Component Explorer being temporarily disabled until we've migrated our Twig Rendering Service to Now.sh v2

    if (fs.existsSync(`${boltBuildConfig.wwwDir}/integrations`)) {
      const integrationDirs = getDirectories(
        `${boltBuildConfig.wwwDir}/integrations`,
      );

      integrationDirs.map(item => {
        app.use(
          express.static(`${boltBuildConfig.wwwDir}/integrations/${item}`),
        );
      });

      app.get(['/drupal-lab'], (req, res) => {
        const options = {
          root: `${boltBuildConfig.wwwDir}/integrations/drupal-lab`,
        };

        res.sendFile('index.html', options);
      });
    }

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
