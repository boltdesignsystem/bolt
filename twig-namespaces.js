const { resolve } = require('path');

module.exports = {
  roots: [resolve(__dirname, './patterns')],
  namespaces: [
    {
      id: 'mskds',
      recursive: false,
      paths: [resolve(__dirname, './patterns/')],
    },
  ],
};
