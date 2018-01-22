module.exports = {
  // Environmental variable / preset to use
  env: 'pl',
  srcDir: 'src',
  buildDir: 'www/build',
  wwwDir: 'www',
  plConfigFile: './config/config.yml',
  verbosity: 1,
  plTwigNamespaces: {
    'bolt-assets': {
      recursive: true,
      paths: ['www/build'],
    },
    utils: {
      recursive: true,
      paths: ['src/_includes'],
    },
  },
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-action-blocks',
      '@bolt/components-background',
      '@bolt/components-background-shapes',
      '@bolt/components-blockquote',
      '@bolt/components-button',
      '@bolt/components-button-group',
      '@bolt/components-card',
      '@bolt/components-chip',
      '@bolt/components-chip-list',
      '@bolt/components-color-swatch',
      '@bolt/components-figure',
      '@bolt/components-headline',
      '@bolt/components-image',
      '@bolt/components-link',
      '@bolt/components-logo',
      '@bolt/components-ordered-list',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-site',
      '@bolt/components-teaser',
      '@bolt/components-unordered-list',
    ],
    individual: [
    ],
  },
};
