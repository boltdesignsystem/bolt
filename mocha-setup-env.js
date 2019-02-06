// shim Node.js env for testing web components + using DOM-sensitive libs like lit-html

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

let customElements = new CustomElementRegistry();
let document = new Document(customElements);

const window = global;
window.customElements = new CustomElementRegistry();
window.document = new Document(window.customElements);
window.window = window;
window.HTMLElement = HTMLElement;
window.HTMLUnknownElement = HTMLUnknownElement;
window.Node = Node;
window.Text = Node;
global.window = window;
