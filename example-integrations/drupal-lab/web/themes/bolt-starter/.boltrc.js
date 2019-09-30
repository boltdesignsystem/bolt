const argv = require('yargs').argv;

module.exports = {
  env: 'drupal',
  verbosity: 1,
  enableCache: argv.prod ? false : true, // workaround to Bolt's JSON data not always getting output from Webpack
  port: 8888,
  webpackDevServer: {
    enabled: true,
  },
  buildDir: './dist',
  dataDir: './dist/data',
  wwwDir: './dist',
  publicPath: '/themes/bolt-starter/dist/',
  components: {
    global: [
      '@bolt/global',
      '@bolt/components-button',
      '@bolt/components-headline',
      '@bolt/components-link',
      '@bolt/components-icon',
      '@bolt/components-navbar',
      '@bolt/components-sticky',
      './index.scss',
      './index.js',
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
