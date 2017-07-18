const defaultConfig = require('./config.default');
const merge = require('merge').recursive;
const browserSync = require('browser-sync');
// var bs = require("browser-sync").create('BrowserSync Server');
// const autoClose = require('browser-sync-close-hook');

import getDevelopmentCertificate from 'devcert-with-localhost';
// brew install nss


module.exports = (gulp, userConfig) => {
  const tasks = {};
  const config = merge(defaultConfig, userConfig);

  browserSync.create(config.serverName);


  const options = {
    server: {
      baseDir: './sandbox/pattern-library/public'
    },
    httpModule: 'http2',
    https: {
      key: `${__dirname}/certs/key.pem`,
      cert: `${__dirname}/certs/cert.pem`
    }
  };

  function browserSyncServer() {
    getDevelopmentCertificate('bolt', { installCertutil: true }).then((ssl) => {
      options.https.key = ssl.keyPath;
      options.https.cert = ssl.certPath;

      browserSync.init(options);
    });
  }

  tasks.serve = browserSyncServer;


  return tasks;
};
