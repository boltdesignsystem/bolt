const { handleRequest } = require('@bolt/api');
const { express } = require('@bolt/build-tools/webpack-dev-server');
const app = express();
const path = require('path');

const port = process.env.PORT || 4444;

let server;

async function startServer(boltConfig) {
  app.use(
    express.static(path.relative(process.cwd(), boltConfig.wwwDir || './')),
  );

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

  app.redirect;

  server = await app.listen(`${port}`);

  return `http://localhost:${port}`;
}

async function stopServer() {
  await server.close();
}

module.exports = {
  startServer,
  stopServer,
};
