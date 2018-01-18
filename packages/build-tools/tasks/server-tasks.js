const browserSync = require('browser-sync');
const events = require('../utils/events');
const config = require('../utils/config-store').getConfig();
const log = require('../utils/log');
const server = browserSync.create();

// https://www.browsersync.io/docs/options
const serverConfig = {
  open: config.openServerAtStart,
  startPath: '/index.html', // Since `/` doesn't do anything and we want to avoid double browserSync notifications from the very beginning
  host: 'localhost',
  port: 3000,

  // proxy the Webpack Dev Server endpoint
  // through BrowserSync
  proxy: 'http://localhost:8080/',
  snippetOptions: {
    blacklist: ['/index.html', '/', '/?*'] // prevents double browsersync
  }
};

if (config.env === 'pl') {
  // https://www.browsersync.io/docs/options#option-server
  serverConfig.serveStatic = [];
  serverConfig.serveStatic.push(config.srcDir);
  serverConfig.serveStatic.push(config.wwwDir);
}

function serve() {
  // https://www.browsersync.io/docs/api#api-init
  server.init(serverConfig, () => {
    if (config.verbosity > 3) {
      // log.info('BrowserSync set up and ready to go... (this notice may be redundant)');
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

events.on('reload', (files) => {
  if (config.verbosity > 4) {
    log.info('Event triggered: "reload"', files);
  }
  reload(files);
});


module.exports = {
  serve,
  reload,
};
