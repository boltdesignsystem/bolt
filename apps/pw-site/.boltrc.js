module.exports = {
  namespace: 'pw',
  env: 'static',
  buildDir: './www/build/',
  srcDir: './src/content',
  templatesDir: [
    './src/templates'
  ],
  wwwDir: './www',
  images: {
    sets: [],
  },
  components: {
    global: [
      // @todo: break out ratio object into separate component-level package
      '@bolt/global', // Needed for Ratio Object.
      '@bolt/components-video',
    ],
    individual: [
      {
        name: 'pw',
        scss: './src/index.scss',
        js: './src/index.js'
      },
    ],
  },
};
