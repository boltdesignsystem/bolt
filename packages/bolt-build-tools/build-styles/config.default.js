const util = require('gulp-util');

module.exports = {
  root: 'packages/bolt',
  src: [
    'packages/bolt/bolt.scss',
    'packages/bolt/bolt-critical-fonts.scss'
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
  failAfterError: false
  // failAfterError: util.env.production
};
