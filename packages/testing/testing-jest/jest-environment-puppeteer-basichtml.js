const {
  CustomElementRegistry,
  CustomEvent,
  Document,
  Event,
  Node,
  Text,
  HTMLElement,
  HTMLTemplateElement,
  HTMLUnknownElement,
} = require('basichtml');

const raf = require('raf');
const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class BasicHTMLEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    const window = this.global;

    window.customElements = new CustomElementRegistry();
    window.document = new Document(window.customElements);
    window.HTMLElement = HTMLElement;
    window.HTMLUnknownElement = HTMLUnknownElement;
    window.Node = Node;
    window.Text = Text;
    window.window = window;

    this.global.navigator = {
      userAgent: 'node.js',
    };

    this.global.requestAnimationFrame = raf;
    // Ensure that the real global env has the document
    global.document = window.document;
  }

  async setup() {
    await super.setup();
    // get the wsEndpoint
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // connect to puppeteer
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  runScript(script) {
    return super.runScript(script);
  }

  async teardown() {
    await super.teardown();

    this.global.document = null;
    this.global.window = null;
    global.document = null;
  }
}

module.exports = BasicHTMLEnvironment;
