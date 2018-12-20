import {
  props,
  define,
  declarativeClickHandler,
  getComponentRootElement,
  hasNativeShadowDomSupport,
  afterNextRender,
  watchForComponentMutations,
} from '@bolt/core/utils';
import {
  withLitHtml,
} from '@bolt/core/renderers/renderer-lit-html';

@define
class BoltAction extends withLitHtml() {
  static props = {
    url: props.string,
    target: props.string,
    disabled: props.boolean,
    onClick: props.string, // Managed by base class
    onClickTarget: props.string, // Managed by base class
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.rootElementTags = [];
    return self;
  }

  connecting() {
    // Make sure the component ONLY ever reuses any existing HTML ONCE. This, in part, helps to prevent rendering diff errors in HyperHTML after booting up!
    if (this._wasInitiallyRendered === false) {

      // If the initial element contains a child node, break apart the original HTML so we can retain the a tag but swap out the inner content with slots.
      let rootElement = getComponentRootElement(this.childNodes, this.rootElementTags);

      if (rootElement) {
        this.rootElement = document.createDocumentFragment();

        // Take any child elements and move them to the root of the custom element
        while (rootElement.firstChild) {
          this.appendChild(rootElement.firstChild);
        }

        this.rootElement.appendChild(rootElement);
      }
    }

    // When possible, use afterNextRender to defer non-critical work until after first paint.
    afterNextRender(this, function() {
      this.addEventListener('click', this.clickHandler);
    });
  }

  disconnecting() {
    this.removeEventListener('click', this.clickHandler);

    if (hasNativeShadowDomSupport && this.useShadow) {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  // Attach external events declaratively
  clickHandler(event) {
    declarativeClickHandler(this);
  }

  rendered() {
    super.rendered(); // ensure any events emitted by the Bolt Base class fire as expected

    // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
    if (hasNativeShadowDomSupport && this.useShadow) {
      this.observer = watchForComponentMutations(this);

      this.observer.observe(this, {
        attributes: false,
        childList: true,
        characterData: false,
      });
    }
  }

}

export { BoltAction };
