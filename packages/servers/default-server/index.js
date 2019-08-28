const { getConfig } = require('@bolt/build-tools/utils/config-store.js');
const { handleRequest } = require('@bolt/api');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3123;

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

async function init() {
  const config = await getConfig();

  // enable CORS to allow other Bolt deployments / instances to use the same Twig rendering service
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET',
      );
      return res.status(200).json({});
    }
    next();
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

  app.use(express.static(path.relative(process.cwd(), config.wwwDir)));

  if (fs.existsSync(`${config.wwwDir}/integrations`)) {
    const integrationDirs = getDirectories(`${config.wwwDir}/integrations`);

    integrationDirs.map(item => {
      app.use(express.static(`${config.wwwDir}/integrations/${item}`));
    });

    app.get(['/drupal-lab'], (req, res) => {
      const options = {
        root: `${config.wwwDir}/integrations/drupal-lab`,
      };

      res.sendFile('index.html', options);
    });
  }

  app.listen(port, () => {
    console.log(`Express listening on http://localhost:${port}`);
  });

  app.redirect;
}

init();
