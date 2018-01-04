const createConfig = require('@bolt/build-tools/create-config');
const webpack = require('webpack');

const config = {
  dist: './dist/assets',
  entryPoint: './src/bolt',
};

module.exports = createConfig(config);
