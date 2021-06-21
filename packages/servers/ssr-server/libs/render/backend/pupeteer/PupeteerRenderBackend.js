// original puppeteer based SSR implementation prior to porting over to JSDOM

import puppeteer from 'puppeteer';

const { RenderBackend } = require('../../RenderBackend');

class PupeteerRenderBackend extends RenderBackend {
  constructor(port) {
    super();
    this.port = port;
  }

  async start() {
    const url = `http://localhost:${this.port}/ssr`;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(url);
    await page.content(); // serialized HTML of page DOM.

    const html = await page.evaluate(() => {
      // strip out any <script> tags from the SSR-rendered body HTML
      function stripScripts(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        var scripts = div.getElementsByTagName('script');
        var i = scripts.length;
        while (i--) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }
        return div.innerHTML;
      }

      const code = document.body.innerHTML;

      // strip out any lit-html comments in the rendered HTML before returning
      return stripScripts(code).replace(/<!---->/g, '');
    });

    await browser.close();

    return html;
  }
}

module.exports = {
  PupeteerRenderBackend,
};
