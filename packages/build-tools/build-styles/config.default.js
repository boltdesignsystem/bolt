module.exports = (config) => {
  return {
    root: 'packages/bolt',
    eyeglass: {
      enableImportOnce: false
    },
    lint: false,
    sassdoc: {
      dest: './dist/sassdoc'
    },
    sourceMaps: process.env.NODE_ENV !== 'production',
    failAfterError: false,
    glob: false,
    extraWatches: [
      './src/_patterns/**/*.scss',
      '!./src/_patterns/**/tests/**',
      '!**/node_modules/**'
    ],
    src: [
      './src/styles/bolt.scss'
    ],
    data: './src/_data',
    dest: './dist/styles'
  };
};
