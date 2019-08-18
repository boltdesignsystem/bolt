const browserSync = require('browser-sync');
const path = require('path');
const resolve = require('resolve');
const { handleRequest } = require('@bolt/api');
const events = require('@bolt/build-utils/events');
const { getConfig } = require('@bolt/build-utils/config-store');
const log = require('@bolt/build-utils/log');
const sh = require('@bolt/build-utils/sh');
const server = browserSync.create();
let config;

async function phpServer() {
  config = config || (await getConfig());

  return new Promise((resolve, reject) => {
    console.log(
      'Starting up local php render twig api server at port ',
      config.renderingServicePort,
    );
    sh(
      'php',
      ['-S', `127.0.0.1:${config.renderingServicePort}`, 'TwigRendererApi.php'],
      true,
      true,
      true,
      true,
    )
      .then(output => {
        console.log('---');
        console.log(output);
        console.log('===');
      })
      .catch(error => {
        console.log('---Error:');
        console.log(error);
        console.log('===End: Error');
        reject(error);
      });
  });
}

async function getServerConfig() {
  config = config || (await getConfig());

  // https://www.browsersync.io/docs/options
  const serverConfig = {
    open: config.openServerAtStart ? config.openServerAtStart : false,
    startPath: config.startPath, // Since `/` doesn't do anything and we want to avoid double browserSync notifications from the very beginning
    port: config.port,
    host: '127.0.0.1',
    ghostMode: false,
    baseDir: config.wwwDir,
    logFileChanges: false,
    logConnections: false,
    notify: false, // Hide notifications till we come up with a less disruptive refresh UI
    reloadOnRestart: true,
    ui: false,
    files: [config.wwwDir + '**/*.html'],
  };

  if (config.renderingService) {
    serverConfig.middleware = [
      {
        route: '/api',
        handle: handleRequest,
      },
    ];
  }

  if (config.webpackDevServer) {
    // proxy the Webpack Server endpoint + set header so Webpack knows if it should redirect or not.
    serverConfig.proxy = {
      target: `http://localhost:${config.proxyPort}/`,
      proxyReq: [
        function(proxyReq) {
          proxyReq.setHeader(`${config.proxyHeader}`, 'true');
        },
      ],
    };
  } else {
    serverConfig.server = [config.wwwDir];
  }

  return serverConfig;
}

async function serve() {
  config = config || (await getConfig());
  const serverConfig = await getServerConfig();

  // https://www.browsersync.io/docs/api#api-init
  server.init(serverConfig, () => {
    if (config.verbosity > 3) {
      log.info(
        'BrowserSync set up and ready to go... (this notice may be redundant)',
      );
    }
  });
}

/**
 * Reload BrowserSync
 * @param {string[] | string} files - Files to reload. Optional.
 * @link https://www.browsersync.io/docs/api#api-reload
 */
function reload(files) {
  server.reload(files);
}

events.on('reload', async files => {
  config = config || (await getConfig());

  if (config.verbosity > 4) {
    log.info('Event triggered: "reload"', files);
  }
  reload(files);
});

module.exports = {
  getServerConfig,
  serve,
  reload,
  phpServer,
};
