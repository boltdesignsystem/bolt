const fs = require('fs');
const path = require('path');

module.exports = {
  port: 8080,
  watch: true,
  nodeResolve: true,
  babel: false,
  // appIndex: 'index.html',
  // moduleDirs: ['node_modules', 'web_modules'],
  'preserve-symlinks': true,
  responseTransformers: [
    async function transformJSON({ url, status, contentType, body }) {
      if (url.endsWith('.json')) {
        const transformedBody = `
          const json = ${JSON.stringify(body)};
          export default json;
        `;
        return { body: transformedBody, contentType: 'application/javascript' };
      }
    },
    async function transformCSS({ url, status, contentType, body }) {
      if (url.endsWith('.css')) {
        const transformedBody = `
          const stylesheet = new CSSStyleSheet();
          stylesheet.replaceSync(${JSON.stringify(body)});
          document.adoptedStyleSheets = [stylesheet];

          export default stylesheet;
        `;
        return { body: transformedBody, contentType: 'application/javascript' };
      }
    },
  ],
};
