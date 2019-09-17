const KnapsackTwigRenderer = require('@knapsack/renderer-twig');
const TwigRenderer = require('@basalt/twig-renderer');
const { dirname, resolve } = require('path');
// const twigNamespacesConfig = require('./twig-namespaces');
const twigNamespacesConfig = require('../www/build/data/twig-namespaces.bolt');
// const designTokens = require('./src/core/dist/knapsack-design-tokens');
const { version } = require('../package');

/** @type {knapsackUserConfig} */
const config = {
  patterns: ['../packages/components/**'],
  // designTokens: {
  //   createCodeSnippet: token => `$${token.name}`,
  //   data: designTokens,
  // },
  designTokens: {
    data: {
      tokens: [
        {
          name: 'foo',
          value: 'blue',
          category: 'test',
          code: '$foo',
          comment: 'a comment',
          tags: ['tag-a', 'tag-b'],
          meta: {
            foo: 'bar',
          },
        },
      ],
    },
  },
  // docsDir: './src/pages/docs',
  dist: './dist',
  public: '../www',
  data: '../knapsack-data',
  assetSets: [
    {
      id: 'bolt',
      title: 'Bolt',
      // inlineJs: `document.body.setAttribute('data-color-scheme', '${id}');`,
      assets: [
        { src: '../www/build/bolt-global.css' },
        { src: '../www/build/bolt-global.js' },
      ],
    },
  ],
  templateRenderers: [
    // docs on config that can be passed in: https://github.com/basaltinc/twig-renderer/blob/master/config.schema.json
    new KnapsackTwigRenderer({
      src: {
        roots: [resolve(__dirname)],
        namespaces: TwigRenderer.convertLegacyNamespacesConfig(
          twigNamespacesConfig,
        ),
      },
      alterTwigEnv: [
        {
          // file: `${dirname(
          //   resolve('@bolt/twig-renderer/package.json'),
          // )}/SetupTwigRenderer.php`,
          file: '../packages/twig-renderer/SetupTwigRenderer.php',
          functions: ['addBoltCoreExtensions', 'addBoltExtraExtensions'],
        },
      ],
    }),
  ],
  changelog: '../CHANGELOG.md',
  version: `v${version}`,
};

module.exports = config;
