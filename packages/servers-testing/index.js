const { handleRequest } = require('@bolt/api');
const { express } = require('@bolt/build-tools/webpack-dev-server');
const app = express();
const path = require('path');

const port = process.env.PORT || 4444;
const { getConfig } = require('@bolt/build-utils/config-store');
const webpackTasks = require('@bolt/build-tools/tasks/webpack-tasks');

let server;

getConfig().then(async boltConfig => {
  let config = boltConfig;
  await webpackTasks.compile();
  app.use(express.static(path.relative(process.cwd(), config.wwwDir)));

  app.use((req, res) => {
    res.send(
      `<html class="js-fonts-loaded">
        <head>
          <title>Test</title>
          <link rel="stylesheet" href="/build/bolt-global.css" />
          <script type="module" src="/build/bolt-global.modern.js"></script>
        </head>
        <body>
          <!-- set #root to inline-block so VRT screenshots are only as wide as the component vs are always full width -->
          <div id="root" style="display: inline-block"></div>
        </body>
      </html>`,
    );
  });

  app.get(['/docs', '/docs/', '/docs/index.html'], (req, res) => {
    res.redirect('/docs/getting-started/index.html');
  });

  app.get('/pattern-lab/splash-screen', (req, res) => {
    res.redirect('/pattern-lab');
  });

  app.get('/favicon.ico', (req, res) => {
    res.redirect('/pattern-lab/favicons/favicon.ico');
  });

  app.use('/api', handleRequest);

  server = app.listen(port, () => {
    console.log(`Express listening on http://localhost:${port}`);
  });

  app.redirect;
  // handle cleaning up + shutting down the server instance
  process.on('SIGTERM', shutDownSSRServer);
  process.on('SIGINT', shutDownSSRServer);
});

// console.log('Received kill signal, shutting down gracefully');
function shutDownSSRServer() {
  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    console.warn(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 5000);
}
