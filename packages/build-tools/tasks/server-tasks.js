const browserSync = require('browser-sync');
const events = require('../utils/events');
const config = require('../utils/config-store').getConfig();
const log = require('../utils/log');
const fetch = require('node-fetch');
const sh = require('../utils/sh');
const server = browserSync.create();

const phpServerPort = 8087; // @todo dynamically grab open port

function phpServer() {
  return new Promise((resolve, reject) => {
    sh(`php -S 127.0.0.1:${phpServerPort} renderTwigApi.php`, true, true, true)
        .then((output) => {
          console.log('---');
          console.log(output);
          console.log('===');
        })
        .catch((error) => {
          console.log('---Error:');
          console.log(error);
          console.log('===End: Error');
          reject(error);
        });
  });
}

// https://www.browsersync.io/docs/options
const serverConfig = {
  open: config.openServerAtStart,
  startPath: config.startPath, // Since `/` doesn't do anything and we want to avoid double browserSync notifications from the very beginning
  host: 'localhost',
  ghostMode: false,
  notify: false, // Hide notifications till we come up with a less disruptive refresh UI
  snippetOptions: {
    async: true,
    blacklist: ['/index.html', '/', '/?*'], // prevents double browsersync
    rule: {
      match: /<\/body>/i,
      fn (snippet, match) {
        return snippet + match;
      },
    },
  },
};

function getBody(request) {
  return new Promise((resolve, reject) => {
    let body = [];
    request.on('data', chunk => body.push(chunk));
    request.on('end', () => {
      body = Buffer.concat(body).toString();
      if (request.headers['content-type'] === 'application/json') {
        body = JSON.parse(body);
      }
      resolve(body);
    });
    request.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      reject(e.message);
    });
  });
}

if (config.hasTotallyAwesomeApi) {
  serverConfig.middleware = [
    {
      route: '/api',
      /**
       *
       * @param req {http.IncomingMessage}
       * @param res {http.ServerResponse}
       * @param next
       */
      handle: async (req, res, next) => {
        console.log('Received /api request');
        const { method, url } = req;
        // let body;
        // if (method === 'POST') {
        const body = await getBody(req);
        // }
        // @todo test with `GET` requests
        // @todo test with empty body
        console.log({ method, url, body });
        switch(url) {
          case '/render-twig':
            try {
              const renderResponse = await fetch(`http://localhost:${phpServerPort}`, {
                method: 'POST',
                body: JSON.stringify(body),
              }).then(res => res.json());
              console.log('/render-twig response:');
              console.log(renderResponse);
              // @todo take headers from `renderResponse`, put in `res`
              res.end(JSON.stringify(renderResponse));
            } catch (error) {
              log.errorAndExit('Error connecting to phpServer api endpoint', error);
            }
            break;
          default:
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              ok: false,
              message: `Not api route found at: ${url}`,
            }), 'utf8', () => console.log(`Responded to an unknown API endpoint request for ${method} to ${url}.`));
        }
      },
    },
  ]
}

if (config.webpackDevServer) {
  // proxy the Webpack Dev Server endpoint
  serverConfig.proxy = 'http://localhost:8080/';
  if (config.env === 'pl') {
    // https://www.browsersync.io/docs/options#option-server
    serverConfig.serveStatic = [];
    serverConfig.serveStatic.push(config.wwwDir);
  }
} else {
  serverConfig.server = [
    config.wwwDir,
  ];
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
  phpServer,
};
