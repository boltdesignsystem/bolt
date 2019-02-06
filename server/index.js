const { handleRequest } = require('@bolt/api');
const express = require('express');
const { join } = require('path');
const app = express();

const port = process.env.PORT || 3123;

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

app.use(express.static(join(__dirname, '../www')));

app.listen(port, () => {
  console.log(`Express listening on http://localhost:${port}`);
});

app.redirect;
