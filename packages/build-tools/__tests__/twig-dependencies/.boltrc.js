const path = require('path');
const resolve = require('resolve');

const config = {
  esModules: true,
  compat: false,
  prod: true,
  env: 'drupal', // @todo: we really need to refactor this to allow running just whatever tasks you need (more easily / more intuitively)
  buildDir: './dist/build',
  dataDir: './dist/build/data',
  wwwDir: './dist',
  components: {
    global: ['@bolt/components-image'],
    individual: ['@bolt/components-carousel'],
  },
  images: {
    sets: [
      {
        base: './fixtures',
        glob: '*.{jpg,jpeg,png,svg}',
        dist: './dist/fixtures',
      },
    ],
  },
  alterTwigEnv: [
    {
      file: `${path.dirname(
        resolve.sync('@bolt/twig-renderer/package.json'),
      )}/SetupTwigRenderer.php`,
      functions: ['addBoltCoreExtensions'],
    },
  ],
};

module.exports = config;
