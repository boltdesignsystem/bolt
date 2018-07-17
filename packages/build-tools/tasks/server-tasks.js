const browserSync = require('browser-sync');
const path = require('path');
const resolve = require('resolve');
const events = require('../utils/events');
const { getConfig } = require('../utils/config-store');
const log = require('../utils/log');
const sh = require('../utils/sh');
const { handleRequest } = require('../api');
const server = browserSync.create();
const webpackServeWaitpage = require('./webpack-serve-waitpage');
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
    open: config.openServerAtStart,
    startPath: config.startPath, // Since `/` doesn't do anything and we want to avoid double browserSync notifications from the very beginning
    port: config.port,
    host: '127.0.0.1',
    ghostMode: false,
    baseDir: config.wwwDir,
    logFileChanges: false,
    logConnections: false,
    notify: false, // Hide notifications till we come up with a less disruptive refresh UI
    reloadOnRestart: true,
    files: [config.wwwDir + '**/*.css', config.wwwDir + '**/*.html'],
    snippetOptions: {
      async: true,
    },
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
    // proxy the Webpack Dev Server endpoint
    serverConfig.proxy = `http://localhost:${config.proxyPort}/`;
    if (config.env === 'pl' || config.env === 'hybrid') {
      // https://www.browsersync.io/docs/options#option-server
      serverConfig.serveStatic = [];
      serverConfig.serveStatic.push(config.wwwDir);
    }
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
