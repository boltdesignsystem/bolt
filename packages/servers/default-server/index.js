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

  if (fs.existsSync(`/integrations`)) {
    const integrationDirs = getDirectories('/integrations');

    integrationDirs.map(item => {
      app.use(express.static(`/integrations/${item}`));
    });

    app.get(['/integrations'], (req, res) => {
      const generateList = integrationDirs.map(
        item => `<li><a href="${item}">${item}</a></li>`,
      );

      res.send(`
          <h2>Integrations:</h2>
          <ul>
            ${generateList}
          </ul>  
        `);
    });

    app.get(['/integrations/drupal-lab'], (req, res) => {
      res.sendFile('index.html');
    });
  }

  app.listen(port, () => {
    console.log(`Express listening on http://localhost:${port}`);
  });

  app.redirect;
}

init();
