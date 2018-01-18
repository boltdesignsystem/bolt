module.exports = {
  // Environmental variable / preset to use
  env: 'pl',
  srcDir: 'src',
  publicPath: '/build/',
  buildDir: 'build',
  wwwDir: 'www',
  plConfigFile: './config/config.yml',
  verbosity: 2,
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
      '@bolt/components-color-swatch',
      '@bolt/components-figure',
      '@bolt/components-link',
      '@bolt/components-nav-bar',
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
