const webpack = require('webpack');
const deepmerge = require('deepmerge');
const baseConfig = require('./.boltrc.js');
const path = require('path');

module.exports = deepmerge(baseConfig, {
  // env: 'drupal',
  buildDir: './dist/build',
  dataDir: './dist/build/data',
  wwwDir: './dist',
  sourceMaps: false,
  copy: [
    {
      from: path.join(__dirname, './demo.html'),
      to: path.join(__dirname, './dist/index.html'),
    },
  ],
  configureWebpack: {
    // plugins: [
    //   new webpack.optimize.LimitChunkCountPlugin({
    //     maxChunks: 1,
    //   }),
    // ],
    // output: {
    //   chunkLoading: false,
    // },
  },
});
