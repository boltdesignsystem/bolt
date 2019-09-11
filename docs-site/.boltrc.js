const path = require('path');
const resolve = require('resolve');
const argv = require('yargs').argv;

const config = {
  // array of languages to compile the design system. note, these are ignored when the --i18n flag is set to false
  // Note: if lang is defined, the first item is currently the one used by default in the Pattern Lab build, pending further iterations on this!
  // lang: ['en', 'ja'],

  renderingService: false, // starts PHP service for rendering Twig templates
  openServerAtStart: true,
  // Environmental variable / preset to use
  env: 'pwa',
  srcDir: './src/pages',
  buildDir: '../www/build',
  dataDir: '../www/build/data',
  iconDir: [],
  wwwDir: '../www',
  startPath: '/',
  plConfigFile: './config/config.yml',
  verbosity: 2,
  schemaErrorReporting: 'cli',
  webpackDevServer: {
    enabled: true,
  },
  sourceMaps: !(process.env.TRAVIS || argv.prod),
  enableCache: !(process.env.TRAVIS || argv.prod),
  enableSSR: false, // temp disabled till Travis issue fixed
  extraTwigNamespaces: {
    bolt: {
      recursive: true,
      paths: ['src/templates', '../packages/components'],
    },
    pl: {
      recursive: true,
      paths: [
        './src/pages/pattern-lab',
        /* Example of including additional component paths to include in the main @bolt namespace */
        // path.relative(process.cwd(), path.dirname(require.resolve('@bolt/components-sticky/package.json'))),
      ],
    },
    'bolt-assets': {
      recursive: true,
      paths: ['../www/build'],
    },
    utils: {
      recursive: true,
      paths: ['./src/components/pattern-lab-utils'],
    },
    'bolt-site': {
      recursive: true,
      paths: ['src/templates', 'src/components'],
    },
  },
  images: {
    sets: [
      {
        base: './src/assets/images',
        glob: '**',
        dist: '../www/images',
      },
    ],
  },

  // Currently only supports a 'scss' key with an array of Sass partials to pull in.
  globalData: {
    scss: [
      // './src/test-overrides.scss' // example of including an additional Sass partial to set / redefine additional default values, globally.
    ],
    js: [
      // './src/global-data.js', // example of including a JS files with a default export to globally include extra data to all Bolt JS components
    ],
  },

  components: {
    global: [
      '@bolt/components-radio-switch',
      '@bolt/components-carousel',
      '@bolt/global',
      '@bolt/components-animate',
      '@bolt/docs-search',
      // '@bolt/schema-form', // Component Explorer being temporarily disabled until we've migrated our Twig Rendering Service to Now.sh v2
      '@bolt/analytics-autolink',
      '@bolt/analytics-autotrack',
      '@bolt/components-placeholder',
      '@bolt/components-accordion',
      '@bolt/components-action-blocks',
      '@bolt/components-banner',
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
      '@bolt/components-list',
      '@bolt/components-modal',
      '@bolt/components-nav-indicator',
      '@bolt/components-nav-priority',
      '@bolt/components-navbar',
      '@bolt/components-navlink',
      '@bolt/components-logo',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-pagination',
      '@bolt/components-share',
      '@bolt/components-search-filter',
      '@bolt/components-site',
      '@bolt/components-smooth-scroll',
      '@bolt/components-sticky',
      '@bolt/components-stack',
      '@bolt/components-table',
      '@bolt/components-teaser',
      '@bolt/components-text',
      '@bolt/components-tooltip',
      '@bolt/components-trigger',
      '@bolt/components-ul',
      '@bolt/components-ol',
      '@bolt/components-video',
      '@bolt/components-grid',
      '@bolt/micro-journeys',
      '@bolt/components-editor',
      /**
       * note: resolving these paths isn't typically required when
       * the .boltrc config is run through the bolt CLI tool (ie.
       * normal, default usage).
       *
       * Resolving these IS sometimes needed however when running
       * a build task completely on it's own (ex. running
       * webpack-cli directly using Bolt's webpack config)
       */
      // Keeping PL specific assets here so we can remove an extra JS + CSS request from the site
      resolve.sync('./src/index.scss'),
      resolve.sync('./src/index.js'),
    ],
    individual: [
      '@bolt/components-critical-fonts',
      '@bolt/components-critical-css',
      '@bolt/components-critical-css-vars',
    ],
  },
  copy: [
    {
      from: require.resolve(`@bolt/critical-path-polyfills`),
      to: path.join(__dirname, '../www/build'),
    },
    {
      from: `src/assets/bolt-sketch.zip`,
      to: path.join(__dirname, '../www/assets'),
      flatten: true,
    },
    {
      from: `src/assets/videos`,
      to: path.join(__dirname, '../www/videos'),
      flatten: true,
    },
    {
      from: `${path.dirname(
        resolve.sync('@bolt/global/package.json')
      )}/favicons/bolt`,
      to: path.join(__dirname, '../www/'),
      flatten: true,
    },
  ],
  alterTwigEnv: [
    {
      file: `${path.dirname(
        resolve.sync('@bolt/twig-renderer/package.json')
      )}/SetupTwigRenderer.php`,
      functions: ['addBoltCoreExtensions', 'addBoltExtraExtensions'],
    },
  ],
};

module.exports = config;
