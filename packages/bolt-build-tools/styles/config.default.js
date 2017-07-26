module.exports = {
  root: 'packages/bolt',
  src: [
    'packages/bolt/bolt.scss'
  ],
  eyeglass: {
    enableImportOnce: false
  },
  dest: './packages/bolt',
  jsonDest: './packages/bolt',
  lint: false,
  sassdoc: {
    dest: 'sandbox/sassdoc'
  }
};
