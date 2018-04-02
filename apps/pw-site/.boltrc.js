module.exports = {
  // Environmental variable / preset to use
  env: 'static',
  buildDir: './www/build/',
  srcDir: './content',
  wwwDir: './www',
  images: {
    sets: [],
  },
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-video',
      '@bolt/components-pw-video',
      '@bolt/components-button',
    ],
    individual: [],
  },
};
