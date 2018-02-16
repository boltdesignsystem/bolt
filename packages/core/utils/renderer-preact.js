/** @jsx h */
// Temp working version of @skatejs/renderer-preact till SkateJS fixes this upstream in the SkateJS monorepo

import { shadow } from 'skatejs';
import { h, render } from 'preact';
import { hasNativeShadowDomSupport } from './environment';

export function withPreact(Base = HTMLElement) {
  return class extends Base {
    get props() {
      // We override props so that we can satisfy most use
      // cases for children by using a slot.
      return {
        ...super.props,
        ...{ children: <slot /> }
      };
    }

    get renderRoot() {
      if (hasNativeShadowDomSupport && this.useShadow === true) {
        return super.renderRoot || shadow(this);
      } else {
        return this;
      }
    }

    renderer(renderRoot, renderCallback) {
      this._renderRoot = renderRoot;
      this._preactDom = render(
        renderCallback(),
        this._renderRoot,
        this._preactDom || this._renderRoot.children[0]
      );
    }

    // updated(...args) {
    //   super.updated && super.updated(...args);
    //   this.rendering && this.rendering();
    //   this.renderer(this.renderRoot, () => this.render && this.render(this));
    //   this.rendered && this.rendered();
    // }

  }
};
