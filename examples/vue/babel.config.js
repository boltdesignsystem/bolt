const config = require('@bolt/babel-preset-bolt')();

module.exports = {
  presets: config.presets,
  plugins: ['babel-plugin-transform-vue-jsx', ...config.plugins],
};
