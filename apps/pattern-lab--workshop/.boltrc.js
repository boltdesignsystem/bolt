module.exports = {
  env: 'pl',
  plConfigFile: './config/config.yml',
  dist: './dist/assets',
  server: './dist',
  verbosity: 3,
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
      '@bolt/components-chip',
      '@bolt/components-chip-list',
      '@bolt/components-figure',
      '@bolt/components-link',
      '@bolt/components-ordered-list',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-site',
      '@bolt/components-teaser',
      '@bolt/components-unordered-list'
    ],
    individual: [
    ],
  },
};
