module.exports = {
  // Environmental variable / preset to use
  env: 'storefront',
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
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-page-footer',
      '@bolt/components-page-header',
      '@bolt/components-site',
    ],
    individual: [
    ],
  },
};
