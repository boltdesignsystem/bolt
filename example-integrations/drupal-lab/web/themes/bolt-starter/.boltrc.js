module.exports = {
  env: 'drupal',
  buildDir: './dist/',
  wwwDir: '../../',
  verbosity: 1,
  enableCache: true,
  components: {
    global: [
      '@bolt/global',
      '@bolt/components-button',
      '@bolt/components-headline',
      '@bolt/components-link',
      '@bolt/components-icon',
      '@bolt/components-navbar',
      '@bolt/components-sticky',
    ],
    individual: [
      // example specifying a standalone component's CSS and JS individually
      // {
      //   name: 'bolt-theme',
      //   scss: ./src/index.scss',
      //   js: './src/index.js',
      // },
    ],
  },
};
