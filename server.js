const express = require('express');
const { join } = require('path');
const app = express();

const port = process.env.PORT || 3123;

app.use(express.static(join(__dirname, './www')));

app.listen(port, () => {
  console.log(`Express listening on http://localhost:${port}`);
});
