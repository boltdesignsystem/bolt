/** @jsx h */
// Temp working version of @skatejs/renderer-preact till SkateJS fixes this upstream in the SkateJS monorepo

import { shadow } from 'skatejs';
import { h, render } from 'preact';
import { hasNativeShadowDomSupport } from '../utils/environment';

import { BoltComponent } from '@bolt/core/helper-components/bolt-component';

export class PreactComponent extends BoltComponent {
  get props() {
    // We override props so that we can satisfy most use
    // cases for children by using a slot.
    return {
      ...super.props,
      ...{ children: <slot /> },
    };
  }

  renderStyles(styles){
    if (styles){
      return (
        this.useShadow &&
        <style>{styles}</style>
      );
    }
  }

  renderer(renderRoot, renderCallback) {
    this._renderRoot = renderRoot;
    this._preactDom = render(
      renderCallback(),
      this._renderRoot,
      this._preactDom || this._renderRoot.children[0],
    );
  }
};
