module.exports = {
  env: 'pl',
  plConfigFile: './config/config.yml',
  dist: './dist/assets',
  verbosity: 3,
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-background-shapes',
      '@bolt/components-button'
    ],
    individual: [
    ],
  },
};
