const path = require('path');

module.exports = {
  // Environmental variable / preset to use
  env: 'pl',
  buildDir: '../../www/pattern-lab/build',
  wwwDir: '../../www/',
  startPath: 'pattern-lab/index.html',
  plConfigFile: './config/config.yml',
  verbosity: 1,
  webpackDevServer: true,
  extraTwigNamespaces: {
    'bolt': {
      recursive: true,
      paths: [
        './src',
        /* Example of including additional component paths to include in the main @bolt namespace */
        // path.relative(process.cwd(), path.dirname(require.resolve('@bolt/components-sticky/package.json'))),
      ],
    },
    /* Example of including a new component namesapce config / overriding an existing config */
    // 'bolt-components-sticky': {
    //   recursive: true,
    //   paths: [
    //     path.relative(process.cwd(), path.dirname(require.resolve('@bolt/components-sticky/package.json'))),
    //   ],
    // },
    'bolt-assets': {
      recursive: true,
      paths: ['../../www/pattern-lab/build'],
    },
    utils: {
      recursive: true,
      paths: ['src/_includes'],
    },
  },
  images: {
    sets: [
      {
        base: './src/assets/images',
        glob: '**',
        dist: '../../www/pattern-lab/images/',
      },
    ],
  },

  // Currently only supports a 'scss' key with an array of Sass partials to pull in.
  globalData: {
    'scss': [
      // './src/test-overrides.scss' // example of including an additional Sass partial to set / redefine additional default values, globally.
    ],
    'js': [
      // './src/global-data.js', // example of including a JS files with a default export to globally include extra data to all Bolt JS components
    ]
  },

  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-action-blocks',
      '@bolt/components-dropdown',
      '@bolt/components-background',
      '@bolt/components-background-shapes',
      '@bolt/components-band',
      '@bolt/components-block-list',
      '@bolt/components-blockquote',
      '@bolt/components-breadcrumb',
      '@bolt/components-button',
      '@bolt/components-button-group',
      '@bolt/components-card',
      '@bolt/components-chip',
      '@bolt/components-chip-list',
      '@bolt/components-copy-to-clipboard',
      '@bolt/components-device-viewer',
      '@bolt/components-figure',
      '@bolt/components-form',
      '@bolt/components-headline',
      '@bolt/components-icon',
      '@bolt/components-icons',
      '@bolt/components-image',
      '@bolt/components-link',
      '@bolt/components-nav',
      '@bolt/components-navbar',
      '@bolt/components-navlink',
      '@bolt/components-logo',
      '@bolt/components-ordered-list',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-share',
      '@bolt/components-site',
      '@bolt/components-smooth-scroll',
      '@bolt/components-sticky',
      '@bolt/components-teaser',
      '@bolt/components-tooltip',
      '@bolt/components-unordered-list',
      '@bolt/components-video',
    ],
    individual: [
      {
        name: 'pl',
        scss: './src/styles/pl.scss',
        js: './src/scripts/pl.js',
      },
      '@bolt/components-critical-fonts',
    ],
  },
};