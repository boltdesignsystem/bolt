module.exports = {
  // Environmental variable / preset to use
  env: 'storefront',
  buildDir: 'www/build',
  srcDir: './content',
  wwwDir: 'www',
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
