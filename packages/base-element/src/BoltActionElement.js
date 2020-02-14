import { declarativeClickHandler } from '@bolt/core-v3.x/utils/declarative-click-handler';
import { watchForComponentMutations } from '@bolt/core-v3.x/utils/watch-for-component-mutations';
import { supportsShadowDom } from './lib/utils';
import { BoltElement } from './BoltElement';

// Subclass of BoltElement that's designed to handle link-like component behavior
class BoltActionElement extends BoltElement {
  static get properties() {
    return {
      url: { type: String },
      target: { type: String },
      disabled: {
        type: Boolean,
      },
      onClick: {
        type: String,
        attribute: 'on-click',
      },
      onClickTarget: {
        type: String,
        attribute: 'on-click-target',
      },
    };
  }

  constructor(self) {
    self = super(self);
    self.rootElementTags = [];
    self.delegateFocus = true;
    self.clickHandler = self.clickHandler.bind(self);
    return self;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.addEventListener('click', this.clickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('click', this.clickHandler);

    // @todo: update when refactoring the logic to handle injected slotted content
    //
    // if (supportsShadowDom && this.useShadow) {
    //   if (this.observer) {
    //     this.observer.disconnect();
    //   }
    // }
  }

  // Attach external events declaratively
  clickHandler() {
    declarativeClickHandler(this);
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    // @todo: update when refactoring the logic to handle injected slotted content
    //
    // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
    // if (supportsShadowDom && this.useShadow && !this.observer) {
    //   this.observer = watchForComponentMutations(this);

    //   this.observer.observe(this, {
    //     attributes: false,
    //     childList: true,
    //     characterData: false,
    //   });
    // }
  }
}

export { BoltActionElement };
