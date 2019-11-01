import { declarativeClickHandler } from '@bolt/core/utils/declarative-click-handler';
import { watchForComponentMutations } from '@bolt/core/utils/watch-for-component-mutations';
import { supportsShadowDom } from './lib/utils';
import { BoltElement } from './BoltElement';

class BoltActionElement extends BoltElement {
  static get properties() {
    return {
      url: String,
      target: String,
      disabled: Boolean,
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

  constructor() {
    super();
    this.rootElementTags = [];
    this.clickHandler = this.clickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.addEventListener('click', this.clickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('click', this.clickHandler);

    if (supportsShadowDom && this.useShadow) {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  // Attach external events declaratively
  clickHandler() {
    declarativeClickHandler(this);
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
    if (supportsShadowDom && this.useShadow) {
      this.observer = watchForComponentMutations(this);

      this.observer.observe(this, {
        attributes: false,
        childList: true,
        characterData: false,
      });
    }
  }
}

export { BoltActionElement };
