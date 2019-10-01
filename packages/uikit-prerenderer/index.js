const promiseLimit = require('promise-limit');

const puppeteer = require('puppeteer');

const localChrome = require('local-chrome');

const waitForRender = function (options) {
  options = options || {};
  return new Promise((resolve, reject) => {
    // Render when an event fires on the document.
    if (options.renderAfterDocumentEvent) {
      if (window['__PRERENDER_STATUS'] && window['__PRERENDER_STATUS'].__DOCUMENT_EVENT_RESOLVED) resolve();
      document.addEventListener(options.renderAfterDocumentEvent, () => resolve()); // Render after a certain number of milliseconds.
    } else if (options.renderAfterTime) {
      setTimeout(() => resolve(), options.renderAfterTime); // Default: Render immediately after page content loads.
    } else {
      resolve();
    }
  });
};

class PuppeteerRenderer {
  constructor(rendererOptions) {
    this._puppeteer = null;
    this._rendererOptions = rendererOptions || {};
    if (this._rendererOptions.maxConcurrentRoutes == null) this._rendererOptions.maxConcurrentRoutes = 0;

    if (this._rendererOptions.inject && !this._rendererOptions.injectProperty) {
      this._rendererOptions.injectProperty = '__PRERENDER_INJECTED';
    }
  }

  async initialize() {
    try {
      // Workaround for Linux SUID Sandbox issues.
      if (process.platform === 'linux') {
        if (!this._rendererOptions.args) this._rendererOptions.args = [];

        if (this._rendererOptions.args.indexOf('--no-sandbox') === -1) {
          this._rendererOptions.args.push('--no-sandbox');

          this._rendererOptions.args.push('--disable-setuid-sandbox');
        }
      } // Puppeteer.launch({
      //   executablePath: localChrome
      // })


      if (localChrome) {
        this._rendererOptions = Object.assign(this._rendererOptions, {
          executablePath: localChrome
        });
      }

      this._puppeteer = await puppeteer.launch(this._rendererOptions); // if (this._rendererOptions.useLocalChrome) {
      // }
    } catch (e) {
      console.error(e);
      console.error('[Prerenderer - PuppeteerRenderer] Unable to start Puppeteer'); // Re-throw the error so it can be handled further up the chain. Good idea or not?

      throw e;
    }

    return this._puppeteer;
  }

  async handleRequestInterception(page, baseURL) {
    await page.setRequestInterception(true);
    page.on('request', req => {
      // Skip third party requests if needed.
      if (this._rendererOptions.skipThirdPartyRequests) {
        if (!req.url().startsWith(baseURL)) {
          req.abort();
          return;
        }
      }

      req.continue();
    });
  }

  async renderRoutes(routes, Prerenderer) {
    const rootOptions = Prerenderer.getOptions();
    const options = this._rendererOptions;
    const limiter = promiseLimit(this._rendererOptions.maxConcurrentRoutes);
    const pagePromises = Promise.all(routes.map((route, index) => limiter(async () => {
      const page = await this._puppeteer.newPage();

      if (options.consoleHandler) {
        page.on('console', message => options.consoleHandler(route, message));
      }

      if (options.inject) {
        await page.evaluateOnNewDocument(`(function () { window['${options.injectProperty}'] = ${JSON.stringify(options.inject)}; })();`);
      }

      const baseURL = `http://localhost:${rootOptions.server.port}`; // Allow setting viewport widths and such.

      if (options.viewport) await page.setViewport(options.viewport);
      await this.handleRequestInterception(page, baseURL); // Hack just in-case the document event fires before our main listener is added.

      if (options.renderAfterDocumentEvent) {
        page.evaluateOnNewDocument(function (options) {
          window['__PRERENDER_STATUS'] = {};
          document.addEventListener(options.renderAfterDocumentEvent, () => {
            window['__PRERENDER_STATUS'].__DOCUMENT_EVENT_RESOLVED = true;
          });
        }, this._rendererOptions);
      }

      const navigationOptions = options.navigationOptions ? {
        waituntil: 'networkidle0',
        ...options.navigationOptions
      } : {
        waituntil: 'networkidle0'
      };
      await page.goto(`${baseURL}${route}`, navigationOptions); // Wait for some specific element exists

      const {
        renderAfterElementExists
      } = this._rendererOptions;

      if (renderAfterElementExists && typeof renderAfterElementExists === 'string') {
        await page.waitForSelector(renderAfterElementExists);
      } // Once this completes, it's safe to capture the page contents.


      await page.evaluate(waitForRender, this._rendererOptions);
      const result = {
        originalRoute: route,
        route: await page.evaluate('window.location.pathname'),
        html: await page.content()
      };
      await page.close();
      return result;
    })));
    return pagePromises;
  }

  destroy() {
    this._puppeteer.close();
  }

}

module.exports = PuppeteerRenderer;
