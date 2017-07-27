const util = require('gulp-util');

module.exports = {
  root: 'packages/bolt',
  src: [
    'packages/bolt/bolt.scss'
  ],
  dest: './packages/bolt',
  jsonDest: './packages/bolt',
  eyeglass: {
    enableImportOnce: false
  },
  lint: false,
  sassdoc: {
    dest: 'sandbox/sassdoc',
    theme: 'flippant',
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true,
    },
    groups: {
      undefined: 'Ungrouped'
    },
    basePath: 'https://github.com/bolt-design-system/bolt'
  },
  sourceMaps: !util.env.production
};
