module.exports = {
  // Environmental variable / preset to use
  env: 'pl',
  srcDir: 'src',
  buildDir: 'www/build',
  wwwDir: 'www',
  plConfigFile: './config/config.yml',
  verbosity: 1,
  extraTwigNamespaces: {
    'bolt-assets': {
      recursive: true,
      paths: ['www/build'],
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
        dist: './www/images/',
      },
    ],
  },
  components: {
    global: [
      './src/styles/pl.scss',
      './src/scripts/pl.js',
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-action-blocks',
      '@bolt/components-background',
      '@bolt/components-background-shapes',
      '@bolt/components-band',
      '@bolt/components-blockquote',
      '@bolt/components-breadcrumb',
      '@bolt/components-button',
      '@bolt/components-button-group',
      '@bolt/components-card',
      '@bolt/components-chip',
      '@bolt/components-chip-list',
      '@bolt/components-device-viewer',
      '@bolt/components-figure',
      '@bolt/components-headline',
      '@bolt/components-icon',
      '@bolt/components-icons',
      '@bolt/components-image',
      '@bolt/components-link',
      '@bolt/components-nav-bar',
      '@bolt/components-logo',
      '@bolt/components-ordered-list',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-site',
      '@bolt/components-smooth-scroll',
      '@bolt/components-sticky',
      '@bolt/components-teaser',
      '@bolt/components-unordered-list',
    ],
    individual: [
      '@bolt/components-critical-fonts'
    ],
  },
};
