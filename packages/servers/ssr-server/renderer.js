const jsdom = require('jsdom');
const requestAnimationFrame = require('raf');
const { JSDOM } = jsdom;
const { template } = require('./libs/template');
let dom;

async function render(html, port, webpackAssets) {
  return new Promise(async (resolve, reject) => {
    /*
     ** 1. 1 line patch (workaround that sets the IE8 check to always be false) via patch-package
     */
    dom = new JSDOM(`${template(html, port, webpackAssets)}`, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: `http://localhost:${port}`,
      beforeParse(window) {
        global.window = window;
        global.document = window.document;
        global.requestAnimationFrame = requestAnimationFrame;
        require('mutationobserver-shim');
        require('document-register-element/build/document-register-element.max.js'); /* [1] */
        window.requestAnimationFrame = requestAnimationFrame;
      },
    });

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
