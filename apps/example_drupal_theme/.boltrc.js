module.exports = {
  env: 'drupal',
  buildDir: './dist',
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
    ],
    individual: [
      '@bolt/components-button',
    ],
  },
};
