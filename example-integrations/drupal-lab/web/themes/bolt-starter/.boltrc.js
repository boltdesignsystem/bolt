module.exports = {
  env: 'drupal',
  buildDir: './dist/',
  wwwDir: '../../',
  verbosity: 1,
  components: {
    global: [
      '@bolt/global',
      '@bolt/components-button',
      '@bolt/components-headline',
      '@bolt/components-link',
      '@bolt/components-icon',
    ],
    individual: [
    ],
  },
};
