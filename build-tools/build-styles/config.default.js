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
  sourceMaps: !util.env.prod,
  failAfterError: false,
  glob: false,
  extraWatches: [
    './src/_patterns/**/*.scss',
    '!./src/_patterns/**/tests/**',
    '!**/node_modules/**'
  ]
};
