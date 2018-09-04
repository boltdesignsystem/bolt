const path = require('path');
const resolve = require('resolve');
const argv = require('yargs').argv;

const config = {
  lang: ['en'],
  renderingService: true, // starts PHP service for rendering Twig templates
  openServerAtStart: false,
  webpackDevServer: true,
  // Environmental variable / preset to use
  env: 'static',
  startPath: '/',
  buildDir: '../../www/build/',
  srcDir: './content',
  wwwDir: '../../www',
  extraTwigNamespaces: {
    'bolt-assets': {
      recursive: true,
      paths: ['../../www/build'],
    },
    bolt: {
      recursive: true,
      paths: ['templates'],
    },
  },
  images: {
    sets: [
      {
        base: './images',
        glob: '**',
        dist: '../../www/images/',
      },
    ],
  },
  components: {
    global: [
      '@bolt/global',
      '@bolt/internal-schema-form',
      '@bolt/components-placeholder',
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
      '@bolt/components-code-snippet',
      '@bolt/components-copy-to-clipboard',
      '@bolt/components-device-viewer',
      '@bolt/components-figure',
      '@bolt/components-form',
      '@bolt/components-headline',
      '@bolt/components-icon',
      '@bolt/components-image',
      '@bolt/components-link',
      '@bolt/components-nav-indicator',
      '@bolt/components-nav-priority',
      '@bolt/components-navbar',
      '@bolt/components-navlink',
      '@bolt/components-logo',
      '@bolt/components-ordered-list',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-pagination',
      '@bolt/components-share',
      '@bolt/components-search-filter',
      '@bolt/components-site',
      '@bolt/components-smooth-scroll',
      '@bolt/components-sticky',
      '@bolt/components-teaser',
      '@bolt/components-text',
      '@bolt/components-tooltip',
      '@bolt/components-unordered-list',
      '@bolt/components-video',
      resolve.sync('./style.scss'),
    ],
    individual: [
      '@bolt/components-critical-fonts',
      '@bolt/components-critical-css-vars',
    ],
  },
  copy: [
    {
      from: `./assets/**/*`,
      to: `../../www/assets`,
      flatten: true,
    },
  ],
};

module.exports = config;
