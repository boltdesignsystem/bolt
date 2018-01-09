module.exports = {
  dist: './dist/assets',
  entryPoint: './src/bolt',
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
