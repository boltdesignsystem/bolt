const express = require('express');
const app = express();

const port = process.env.PORT || 2517;

async function init() {
  app.use(express.static('www/integrations/drupal-lab/'));

  app.get(['/'], (req, res) => {
    res.sendFile('index.html');
  });

  app.listen(port, () => {
    console.log(`Express listening on http://localhost:${port}`);
  });
}

init();
