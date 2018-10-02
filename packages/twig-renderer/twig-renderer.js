const TwigRenderer = require('@basalt/twig-renderer');
const { getTwigNamespaceConfig } = require('@bolt/build-tools/utils/manifest');
const { getConfig } = require('@bolt/build-tools/utils/config-store');
const path = require('path');

let isReady = false;
let twigNamespaces;
let twigRenderer;

async function init() {
  const config = await getConfig();
  const relativeFrom = path.dirname(config.configFileUsed);
  // console.log({ config });
  twigNamespaces = await getTwigNamespaceConfig(
    relativeFrom,
    config.extraTwigNamespaces,
  );
  twigRenderer = new TwigRenderer({
    relativeFrom,
    src: {
      roots: [relativeFrom],
      namespaces: TwigRenderer.convertLegacyNamespacesConfig(twigNamespaces),
    },
    debug: true,
    alterTwigEnv: config.alterTwigEnv,
    hasExtraInfoInResponses: false, // Will add `info` onto results with a lot of info about Twig Env
  });
  isReady = true;
}

/**
 * Render Twig Template
 * @param {string} template - Template name (i.e. `@bolt/button.twig`)
 * @param {Object} data - Optional data to pass to template
 * @return {Promise<{{ ok: boolean, html: string, message: string}}>} - Results of render
 */
async function render(template, data = {}) {
  if (!isReady) {
    await init();
  }
  const results = await twigRenderer.render(template, data);
  // console.log({ results });
  return results;
}

/**
 * Render Twig String
 * @param {string} templateString - String that is a Twig template (i.e. `<p>{{ text }}</p>`)
 * @param {Object} data - Optional data to pass to template
 * @return {Promise<{{ ok: boolean, html: string, message: string}}>} - Results of render
 */
async function renderString(templateString, data = {}) {
  if (!isReady) {
    await init();
  }
  const results = await twigRenderer.renderString(templateString, data);
  // console.log({ results });
  return results;
}

// Both `render` and `renderString` will return something like this on success:
//   {
//     ok: true,
//     html: '<p>Hello World</p>',
//   }
// And something like this on failure:
//   {
//     ok: false,
//     message: 'The confabulator was not configured correctly',
//   }

module.exports = {
  render,
  renderString,
};
