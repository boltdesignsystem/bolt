const core = require('@bolt/build-core');
const merge = require('merge').recursive;
const defaultConfig = require('./config.default');
const browserSync = require('browser-sync');
const htmlInjector = require('bs-html-injector');
const debug = require('debug')('@bolt/build-server');

function server(userConfig) {
  function serveTask() {
    const config = merge({}, defaultConfig, userConfig, {
      server: './bolt-website',
      baseDir: ['./bolt-website', 'bolt-website/'],
      notify: false,
    });

    browserSync.create(config.serverName);
    browserSync.use(htmlInjector, {
      files: './bolt-website/**/*.html'
    });
    browserSync.init(config);
  }

  serveTask.displayName = 'browsersync:serve';
  serveTask.description = 'Spin up a local server environment w/ live reloading.';

  return serveTask;
}
module.exports.server = server;


/**
  * Reload BrowserSync
  * @param {(string|string[])=} files - File paths to reload
  */
function reloadBrowserSync(files) {
  if (files) {
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

core.events.on('reload', (files) => {
  debug('Event triggered: "reload"', files);
  reloadBrowserSync(files);
});

module.exports.reload = reloadTask;
