/**
 * Demo for testing out Bolt config updates that fall back to
 * using https://github.com/davidtheclark/cosmiconfig if a .boltrc
 * config file isn't already specified or initialized.
 *
 * This means that a .boltrc config in a parent folder would
 * automatically get used if a more local one can't be found --
 *
 * For example, we can now use Webpack's vanilla CLI as-is!
 *
 * ```bash
 *   cd packages/build-tools
 *   npx webpack-cli --config="create-webpack-config.js" --progress
 * ```
 */
const path = require('path');
const globby = require('globby');
const baseBoltDir = path.join(__dirname, './docs-site');
const siteConfig = require(path.join(baseBoltDir, '.boltrc'));
const resolve = require('resolve');

// Paths that are relative to `baseBoltDir` must now be relative to this directory (i.e. `__dirname`)
const adjustRelativePath = thePath =>
  path.relative(__dirname, path.resolve(baseBoltDir, thePath));

// Gather directories for any/all image fixtures and consolidate for the image resizing task
const imageFixtureDirs = globby
  .sync(
    path.join(
      __dirname,
      './packages/components/**/fixtures/**/*.{jpg,jpeg,png,svg}',
    ),
  )
  .map(file => path.dirname(file));
const imageSets = [];

imageFixtureDirs.forEach(fixturePath => {
  imageSets.push({
    base: fixturePath,
    glob: '*.{jpg,jpeg,png,svg}',
    dist: path.join(adjustRelativePath(siteConfig.wwwDir), 'fixtures'),
  });
});

const nonImageFixtures = globby.sync([
  './packages/components/**/fixtures/**/*',
  '!./packages/components/**/fixtures/**/*.{jpg,jpeg,png}',
  './packages/components/**/fixtures/videos/**/*',
]);
const itemsToCopy = [];

const allComponentPackages = globby
  .sync(path.join(__dirname, './packages/components/*/package.json'))
  .map(pkgPath => require(pkgPath))
  .map(pkg => pkg.name);

nonImageFixtures.forEach(fixturePath => {
  itemsToCopy.push({
    from: path.join(__dirname, fixturePath),
    to: path.join(
      __dirname,
      adjustRelativePath(siteConfig.wwwDir),
      'fixtures/videos',
    ),
    flatten: true,
  });
});

module.exports = {
  esModules: true,
  wwwDir: adjustRelativePath(siteConfig.wwwDir),
  buildDir: adjustRelativePath(siteConfig.buildDir),
  iconDir: [],
  components: {
    global: [
      ...allComponentPackages,
      '@bolt/components-animate',
      '@bolt/micro-journeys',
      '@bolt/analytics-autolink',
    ],
  },
  images: {
    sets: imageSets,
  },
  prod: true,
  sourceMaps: false,
  enableCache: false,
  verbosity: 1,
  copy: [...itemsToCopy],
  alterTwigEnv: [
    {
      file: `${path.dirname(
        resolve.sync('@bolt/twig-renderer/package.json'),
      )}/SetupTwigRenderer.php`,
      functions: ['addBoltCoreExtensions'],
    },
  ],
};
