const webpack = require('webpack');
const express = require('express');
const browserSync = require('browser-sync').create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const hasha = require('hasha');
const path = require('path');
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

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

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
  const webpackConfigs =
    customWebpackConfig || (await createWebpackConfig(boltBuildConfig));

  let patternLabIsCompiling = false;

  events.on('build-tasks/pattern-lab:precompiling', async () => {
    patternLabIsCompiling = true;
  });

  events.on('build-tasks/pattern-lab:compiling', async () => {
    patternLabIsCompiling = true;
  });

  events.on('build-tasks/pattern-lab:compiled', async () => {
    patternLabIsCompiling = false;
  });

  const browserSyncFileToWatch = [
    `${boltBuildConfig.wwwDir}/**/*.css`,
    `${boltBuildConfig.wwwDir}/**/*.html`,
    `!**/node_modules/**/*`,
    `!**/vendor/**/*`,
  ];

  console.log(process.cwd());

  // customize bs reload behavior based on the type of asset that's changed
  const filesToWatch = [
    // {
    //   match: [`${process.cwd()}/patternlab-config.json`],
    //   fn: async function(event, filePath) {
    //     // when the main PL config changes, clear Node's cache (so the JSON config is re-read) and trigger another PL build
    //     // this allows config changes to show up without restarting the build!
    //     Object.keys(require.cache).forEach(function(key) {
    //       delete require.cache[key];
    //     });

    //     const config = require(configPath);
    //     const pl = require('@pattern-lab/core')(config);

    //     pl.build({
    //       watch: false,
    //       cleanPublic: true,
    //     });
    //   },
    // },
    `${boltBuildConfig.wwwDir}/**/*.css`,
    `${boltBuildConfig.wwwDir}/**/*.js`,
    {
      match: [
        `${boltBuildConfig.wwwDir}/**/*.svg`,
        `${boltBuildConfig.wwwDir}/**/*.png`,
        `${boltBuildConfig.wwwDir}/**/*.jpg`,
      ],
      async fn() {
        browserSync.reload();
      },
    },
    // only reload the Webpack-generated HTML files when the contents have changed
    {
      match: [
        path.join(process.cwd(), `${boltBuildConfig.wwwDir}/**/*.html`),
        path.join(
          process.cwd(),
          `${boltBuildConfig.wwwDir}/styleguide/html/*.html`,
        ),
      ],
      async fn(event, filePath) {
        let updatedHash = false;

        if (fs.existsSync(path.resolve(__dirname, `../${filePath}`))) {
          const hash = await hasha.fromFile(
            path.resolve(__dirname, `../${filePath}`),
            { algorithm: 'md5' },
          );

          if (!fileHashes[filePath] || fileHashes[filePath] !== hash) {
            fileHashes[filePath] = hash;
            updatedHash = true;
          }

          if (updatedHash && !patternLabIsCompiling) {
            console.log(`reloading ${filePath}`);
            browserSync.reload(filePath);
          }
        }
      },
    },
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
          files: filesToWatch,
        },
        function (err, bs) {
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
        quiet: true,
        stats: 'errors-warnings',
        writeToDisk: true,
        logLevel: 'error',
        stats: statsPreset(webpackStats[boltBuildConfig.verbosity]),
      }),
    );

    app.use(express.static(boltBuildConfig.wwwDir));
    // app.use('/api', handleRequest); // Component Explorer being temporarily disabled until we've migrated our Twig Rendering Service to Now.sh v2

    if (fs.existsSync(`${boltBuildConfig.wwwDir}/integrations`)) {
      const integrationDirs = getDirectories(
        `${boltBuildConfig.wwwDir}/integrations`,
      );

      integrationDirs.map((item) => {
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
