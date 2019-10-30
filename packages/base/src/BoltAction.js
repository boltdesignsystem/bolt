/* eslint-disable lines-between-class-members */

import {
  // props,
  // define,
  declarativeClickHandler,
  hasNativeShadowDomSupport,
  // afterNextRender,
  watchForComponentMutations,
} from '@bolt/core/utils';
// import { withLitHtml } from '@bolt/core/renderers/renderer-lit-html';

// @define

import { property } from 'lit-element';
import { BoltElement } from './BoltElement';

class BoltAction extends BoltElement {
  @property({ type: String }) url; // = 'Hello World';
  @property({ type: String }) target;
  @property({ type: Boolean }) disabled;
  @property({
    type: String,
    attribute: 'on-click',
  })
  onClick;
  @property({
    type: String,
    attribute: 'on-click-target',
  })
  onClickTarget;

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

    if (hasNativeShadowDomSupport && this.useShadow) {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  // Attach external events declaratively
  clickHandler() {
    console.log('click');
    declarativeClickHandler(this);
  }

  firstUpdated(changedProperties) {
    // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
    if (hasNativeShadowDomSupport && this.useShadow) {
      this.observer = watchForComponentMutations(this);

      this.observer.observe(this, {
        attributes: false,
        childList: true,
        characterData: false,
      });
    }
    super.firstUpdated && super.firstUpdated(changedProperties);
  }
}

export { BoltAction };
