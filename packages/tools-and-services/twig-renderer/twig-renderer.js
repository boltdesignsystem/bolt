const TwigRenderer = require('@basalt/twig-renderer');
const sleep = require('sleep-promise');
const { getTwigNamespaceConfig } = require('@bolt/build-utils/manifest');
const { getConfig } = require('@bolt/build-utils/config-store');
const path = require('path');

let twigNamespaces;
let twigRenderer;

const STATES = {
  NOT_STARTED: 'NOT_STARTED',
  STARTING: 'STARTING',
  READY: 'READY',
};
let state = STATES.NOT_STARTED;

/**
 * Initialize Twig Renderer instance
 * @param {Boolean} keepAlive - Optionally tell the Twig renderer service to keep alive to help speed up requests
 */
async function init(keepAlive = false) {
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
    maxConcurrency: 30,
    keepAlive, // only set this to be true when doing in-browser requests to avoid issues with this process not exiting when complete
  });
  state = STATES.READY;
}

/**
 * Stops any currently running Twig Renderer instances
 */
async function stop() {
  twigRenderer.stop();
}

async function prep(keepAlive) {
  switch (state) {
    case STATES.READY:
      return;
    case STATES.NOT_STARTED:
      return await init(keepAlive);
    case STATES.STARTING:
      while (state === STATES.STARTING) {
        await sleep(20); // eslint-disable-line no-await-in-loop
      }
  }
}

/**
 * Render Twig Template
 * @param {string} template - Template name (i.e. `@bolt/button.twig`)
 * @param {Object} data - Optional data to pass to template
 * @param {Boolean} keepAlive - Optionally tell the Twig renderer service to keep alive to help speed up requests
 * @return {Promise<{ ok: boolean, html: string, message: string }>} - Results of render
 */
async function render(template, data = {}, keepAlive = false) {
  await prep(keepAlive);
  const results = await twigRenderer.render(template, data);
  return results;
}

/**
 * Render Twig String
 * @param {string} templateString - String that is a Twig template (i.e. `<p>{{ text }}</p>`)
 * @param {Object} data - Optional data to pass to template
 * @param {Boolean} keepAlive - Optionally tell the Twig renderer service to keep alive to help speed up requests
 * @return {Promise<{ ok: boolean, html: string, message: string }>} - Results of render
 */
async function renderString(templateString, data = {}, keepAlive = false) {
  await prep(keepAlive);
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
  stop,
};
