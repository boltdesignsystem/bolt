module.exports = {
  env: 'drupal',
  buildDir: './dist',
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-band',
      '@bolt/components-button',
      '@bolt/components-button-group',
      '@bolt/components-card',
    ],
    individual: [
      '@bolt/components-device-viewer',
      '@bolt/components-nav-bar',
      '@bolt/components-smooth-scroll',
    ],
  },
};
