import { events } from '@bolt/build-core';
import merge from 'merge';
import gulp from 'gulp';
import getDevelopmentCertificate from 'devcert-with-localhost';
import defaultConfig from './config.default';

const historyApiFallback = require('connect-history-api-fallback');
const autoClose = require('browser-sync-close-hook');
const browserSync = require('browser-sync');

const debug = require('debug')('@bolt/build-server');

function server(userConfig) {
  function serveTask() {
    const config = merge({}, defaultConfig, userConfig, {
      middleware: [
        // historyApiFallback()
      ]
    });


    config.files = config.files.map(pattern => {
      return {
        match: pattern,
        fn: event => {
          if (!['add', 'change'].includes(event)) {
            return;
          }
          browserSync.reload('*.html');
        }
      };
    });


    // browserSync.use({
    //   plugin() {},
    //   hooks: {
    //     'client:js': autoClose, // <-- important part
    //   },
    // });

    browserSync.create(config.serverName);
    // const browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync, 'localhost:3000');

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
  if (files){
    browserSync.reload(files);
  }
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
  console.log('Event triggered: "reload"', files);
  debug('Event triggered: "reload"', files);
  reloadBrowserSync(files);
});


export { server, reloadTask as reload };
