const util = require('gulp-util');

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
    dest: './bolt-website/sassdoc'
  },
  sourceMaps: !util.env.production,
  failAfterError: false,
  glob: false
  // failAfterError: util.env.production
};
