module.exports = {
  namespace: 'pw',
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
      './pw-style.scss',
    ],
    individual: [],
  },
};
