// Older method for generating a Japanese language-specific version of the build
const config = {
  lang: ['en', 'ja'],
  esModules: true,
  env: 'drupal', // @todo: we really need to refactor this to allow running just whatever tasks you need (more easily / more intuitively)
  buildDir: './dist-lang/build',
  dataDir: './dist-lang/build/data',
  wwwDir: './dist-lang',
  components: {
    global: [
      '@bolt/core',
      '@bolt/global',
      '@bolt/components-button',
      '@bolt/components-icon',
      '@bolt/components-figure',
      '@bolt/components-link',
      '@bolt/components-ratio',
    ],
    individual: [],
  },
};

module.exports = config;
