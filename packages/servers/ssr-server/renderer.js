const jsdom = require('jsdom');
const resolve = require('resolve');
const requestAnimationFrame = require('raf');
const { JSDOM } = jsdom;
const fs = require('fs');
const { template } = require('./libs/template');
let dom;

const mutationObserverShim = fs.readFileSync(
  resolve.sync('mutationobserver-shim'),
  { encoding: 'utf-8' },
);

/**
 * contains a 1 line patch workaround that sets the IE8 check to always be false)
 * via the patch-package NPM library
 */
const customElementShim = fs.readFileSync(
  resolve.sync(
    'document-register-element/build/document-register-element.max.js',
  ),
  { encoding: 'utf-8' },
);

async function render(html, port, webpackAssets) {
  return new Promise(async (resolve, reject) => {
    dom = new JSDOM(`${template(html, port, webpackAssets)}`, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: `http://localhost:${port}`,
      beforeParse(window) {
        window.requestAnimationFrame = requestAnimationFrame;
      },
    });

    // add these to our JSOM instance to messing with the global Node.js env
    dom.window.eval(`${mutationObserverShim}`);
    dom.window.eval(`${customElementShim}`);

    dom.window.document.onload = async () => {
      // @todo: work out a way to get these web component tag names to be dynamically added
      const undefinedElements = dom.window.document.querySelectorAll([
        'bolt-button',
        'bolt-text',
        'bolt-icon',
      ]);

      const promises = [...undefinedElements].map(element =>
        dom.window.customElements.whenDefined(element.localName),
      );

      await Promise.all(promises);

      function stripScripts(s) {
        var div = dom.window.document.createElement('div');
        div.innerHTML = s;
        var scripts = div.getElementsByTagName('script');
        var i = scripts.length;
        while (i--) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }
        return div.innerHTML;
      }

      const code = dom.window.document.body.innerHTML;

      // strip out any lit-html comments in the rendered HTML before returning
      resolve(stripScripts(code).replace(/<!---->/g, ''));
    };
  });
}

module.exports = {
  render,
};
