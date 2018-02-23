module.exports = {
  // Environmental variable / preset to use
  env: 'static',
  buildDir: '../../www/build/',
  srcDir: './content',
  wwwDir: '../../www',
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
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-site',
      '@bolt/components-band',
      '@bolt/components-blockquote',
      '@bolt/components-button',
      '@bolt/components-button-group',
      '@bolt/components-card',
      '@bolt/components-chip',
      '@bolt/components-chip-list',
      '@bolt/components-icon',
      '@bolt/components-headline',
      '@bolt/components-link',
      '@bolt/components-logo',
      '@bolt/components-teaser',
      '@bolt/components-image',
      './style.scss',
      './storefront.js',
    ],
    individual: [],
  },
};
