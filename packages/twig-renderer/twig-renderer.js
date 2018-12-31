const TwigRenderer = require('@basalt/twig-renderer');
const sleep = require('sleep-promise');
const { getTwigNamespaceConfig } = require('@bolt/build-tools/utils/manifest');
const { getConfig } = require('@bolt/build-tools/utils/config-store');
const path = require('path');

let twigNamespaces;
let twigRenderer;

const STATES = {
  NOT_STARTED: 'NOT_STARTED',
  STARTING: 'STARTING',
  READY: 'READY',
};
let state = STATES.NOT_STARTED;

async function init() {
  state = STATES.STARTING;
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
    maxConcurrency: 1,
    keepAlive: false, // setting this to true will cause subsequent template / page recompiles to not regenerate when the source files have changed
  });
  state = STATES.READY;
}

async function prep() {
  switch (state) {
    case STATES.READY:
      return;
    case STATES.NOT_STARTED:
      return await init();
    case STATES.STARTING:
      while (state === STATES.STARTING) {
        await sleep(100); // eslint-disable-line no-await-in-loop
      }
  }
}

/**
 * Render Twig Template
 * @param {string} template - Template name (i.e. `@bolt/button.twig`)
 * @param {Object} data - Optional data to pass to template
 * @return {Promise<{{ ok: boolean, html: string, message: string}}>} - Results of render
 */
async function render(template, data = {}) {
  await prep();
  const results = await twigRenderer.render(template, data);
  return results;
}

/**
 * Render Twig String
 * @param {string} templateString - String that is a Twig template (i.e. `<p>{{ text }}</p>`)
 * @param {Object} data - Optional data to pass to template
 * @return {Promise<{{ ok: boolean, html: string, message: string}}>} - Results of render
 */
async function renderString(templateString, data = {}) {
  await prep();
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
