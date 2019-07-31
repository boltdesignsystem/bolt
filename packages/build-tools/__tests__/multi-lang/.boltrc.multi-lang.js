// Older method for generating a Japanese language-specific version of the build
const config = {
  lang: ['en', 'ja'],
  env: 'drupal', // @todo: we really need to refactor this to allow running just whatever tasks you need (more easily / more intuitively)
  buildDir: './dist-lang/build',
  dataDir: './dist-lang/build/data',
  wwwDir: './dist-lang',
  components: {
    global: [
      '@bolt/components-button',
      '@bolt/global',
    ],
    individual: [],
  }
};

module.exports = config;
