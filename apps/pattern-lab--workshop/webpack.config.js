const createConfig = require('@bolt/build-tools/create-config');
const webpack = require('webpack');

const config = {
  dist: './dist/assets',
  entryPoint: './src/bolt',
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      // '@bolt/components-card',
      // '@bolt/components-nav-bar',
    ],
    individual: [
    ],
  },
};

module.exports = createConfig(config);
