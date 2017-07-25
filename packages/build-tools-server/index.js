import merge from 'merge';
import getDevelopmentCertificate from 'devcert-with-localhost';
import browserSync from 'browser-sync';
import defaultConfig from './config.default';

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

export { server };
