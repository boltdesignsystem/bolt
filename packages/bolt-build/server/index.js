import { events } from '@bolt/build-core';
import merge from 'merge';
import getDevelopmentCertificate from 'devcert-with-localhost';
import browserSync from 'browser-sync';
import defaultConfig from './config.default';

const debug = require('debug')('@bolt/build-server');

function server(userConfig) {
  function serveTask() {
    const config = merge({}, defaultConfig, userConfig);

    browserSync.create(config.serverName);

    if (config.installCert) {
      getDevelopmentCertificate(config.certNames, {
        installCertutil: config.installCert
      }).then((ssl) => {
        config.https.key = ssl.keyPath;
        config.https.cert = ssl.certPath;

        browserSync.init(config);
      });
    } else {
      browserSync.init(config);
    }
  }

  serveTask.displayName = 'browsersync:serve';
  serveTask.description = 'Spin up a local server environment w/ live reloading.';

  return serveTask;
}


/**
  * Reload BrowserSync
  * @param {(string|string[])=} files - File paths to reload
  */
function reloadBrowserSync(files) {
  browserSync.reload(files);
}

function reloadTask(files) {
  function reload() {
    reloadBrowserSync(files);
  }

  reload.displayName = 'browsersync:reload';
  reload.description = 'Abstraction to reload BrowserSync when something changes';

  return reload;
}

events.on('reload', (files) => {
  debug('Event triggered: "reload"', files);
  reloadBrowserSync(files);
});


export { server, reloadTask as reload };
