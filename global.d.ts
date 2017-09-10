declare module '*.scss' {
  const _: string;
  export default _;
};
declare module '*.css' {
  const _: string;
  export default _;
};
declare module '*.json';
declare module '*.gif';

// Skate
declare module 'core-js';

declare namespace JSX {
  interface IntrinsicElement extends ShadyCSS.IntrinsicElements {
  }
}
declare namespace ShadyCSS {
  interface IntrinsicElements {
    'custom-style': HTMLElement,
  }

  interface ShadyCssStatic {
    prepareTemplate( template: HTMLTemplateElement, elementName: string, typeExtension?: string ),
    applyStyle( host: HTMLElement, overrideProps?: { [ propName: string ]: string } ),
    updateStyles( properties?: { [ propName: string ]: string } ),
  }
}


// Custom Elements
interface ElementCreationOptions {
  is: string;
}

interface Window {
  ShadyCSS: ShadyCSS.ShadyCssStatic,
}

interface Document {
  createElement( name: string, options: ElementCreationOptions ): HTMLElement;
  createElement( tagName: 'slot' ): HTMLSlotElement;
}

interface HTMLElement extends OnConnectedCallback, OnDisconnectedCallback, OnAdoptedCallback, OnAttributeChangedCallback {
  //   // shadow DOM API
  //   shadowRoot: HTMLElement,
  //   attachShadow( { mode:string } ): HTMLElement,
  //   assignedNodes( { flatten }?:{flatten?: boolean} ): NodeList,
  //   assignedSlot: string|void,
  // @FIXME remove this once https://github.com/skatejs/skatejs/pull/1022 is merged
  role?: string,
}

interface HasAttributes {
  readonly observedAttributes: string[] | void;
}

interface OnConnectedCallback {
  connectedCallback(): void;
}

interface OnDisconnectedCallback {
  disconnectedCallback(): void;
}

interface OnAdoptedCallback {
  adoptedCallback( oldDocument: any, newDocument: any ): void;
}

interface OnAttributeChangedCallback {
  attributeChangedCallback( name: string, oldValue: any, newValue: any ): void;
}

// ShadowDom
interface Text {
  readonly assignedSlot: HTMLSlotElement | null;
}

interface EventInit {
  scoped?: boolean;  // default false
}

interface Event {
  deepPath(): EventTarget[];
  readonly scoped: boolean;
}

interface Document {
  createElement( tagName: 'slot' ): HTMLSlotElement;
}

// Tests
// we are not using Chai anymore. We use Expect which has Jest style assertions
// @TODO remove this once all test are refactored to use `expect` instead of chai
declare var expect: Chai.ExpectStatic;
