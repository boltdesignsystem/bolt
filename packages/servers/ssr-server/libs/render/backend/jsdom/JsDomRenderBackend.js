const fs = require('fs');
const jsdom = require('jsdom');
const resolve = require('resolve');
const requestAnimationFrame = require('raf');
const { JSDOM } = jsdom;
const { template } = require('./template');
const { RenderBackend } = require('../../RenderBackend');
const { FilesystemResourceLoader } = require('./FilesystemResourceLoader');

class JsDomRenderBackend extends RenderBackend {
  constructor(config, assets, resourceLoader) {
    super();
    this.config = config;
    this.assets = assets;
    this.dom = null;
    this.resourceLoader =
      resourceLoader || new FilesystemResourceLoader(config);
  }

  async start() {
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

    let dom = new JSDOM(`${template(this.assets)}`, {
      runScripts: 'dangerously',
      resources: this.resourceLoader,
      beforeParse(window) {
        window.requestAnimationFrame = requestAnimationFrame;
      },
    });

    // add these to our JSOM instance to messing with the global Node.js env
    dom.window.eval(`${mutationObserverShim}`);
    dom.window.eval(`${customElementShim}`);

    this.dom = dom;
  }

  async getWindow() {
    return this.dom.window;
  }
}

module.exports = {
  JsDomRenderBackend,
};
