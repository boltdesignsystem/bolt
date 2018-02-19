module.exports = {
  // Environmental variable / preset to use
  env: 'static',
  buildDir: 'www/build',
  srcDir: './content',
  wwwDir: 'www',
  images: {
    sets: [
      {
        base: './images',
        glob: '**',
        dist: './www/images/',
      },
    ],
  },
  components: {
    global: [
      './style.scss',
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-site',
      '@bolt/components-band',
      '@bolt/components-button',
      '@bolt/components-card',
      '@bolt/components-icon',
      '@bolt/components-headline',
      '@bolt/components-teaser',
      '@bolt/components-image'
    ],
    individual: [],
  },
};
