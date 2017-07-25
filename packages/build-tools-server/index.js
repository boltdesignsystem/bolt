import merge from 'merge';
import getDevelopmentCertificate from 'devcert-with-localhost';
import browserSync from 'browser-sync';
import defaultConfig from './config.default';
import { utils, events } from '@bolt/build-core';

const debug = require('debug')('@bolt/build-server');

function server(userConfig) {
  function serveTask() {
    const config = merge({}, defaultConfig, userConfig);

    browserSync.create(config.serverName);

    getDevelopmentCertificate(config.certNames, {
      installCertutil: config.installCert
    }).then((ssl) => {
      config.https.key = ssl.keyPath;
      config.https.cert = ssl.certPath;

      browserSync.init(config);
    });
  }

  serveTask.displayName = 'browsersync:serve';
  serveTask.description = 'Spin up a local server environment w/ live reloading.';

  return serveTask;
}


/**
  * Reload BrowserSync
  * @param {(string|string[])=} files - File paths to reload
  */
function _reload(files) {
  browserSync.reload(files);
}

function reload(files) {
  function reloadTask() {
    _reload(files);
  }

  reloadTask.displayName = 'browsersync:reload';
  reloadTask.description = 'Abstraction to reload BrowserSync when something changes';

  return reloadTask;
}

events.on('reload', (files) => {
  debug('Event triggered: "reload"', files);
  _reload(files);
});


export { server, reload };
