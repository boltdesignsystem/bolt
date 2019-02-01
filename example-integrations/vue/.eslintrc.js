
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    '../../packages/config-presets/config-eslint/index.js',
    'plugin:vue/recommended', // @todo: re-enable when time permits to clean up the Vue CLI's default HelloWorld.vue component
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/require-default-prop': 'off',
  }
};
