/** @jsx h */
// Temp working version of @skatejs/renderer-preact till SkateJS fixes this upstream in the SkateJS monorepo

import { h, render } from 'preact';

export function withPreact(Base = HTMLElement){
  return class extends Base {
    get props() {
      // We override props so that we can satisfy most use
      // cases for children by using a slot.
      return {
        ...super.props,
        ...{ children: <slot /> },
      };
    }

    // get state() {
    //   // We override props so that we can satisfy most use
    //   // cases for children by using a slot.
    //   return {
    //     ...super.state
    //   };
    // }

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

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
      // Preact hack https://github.com/developit/preact/issues/53
      const Nothing = () => null;
      this._preactDom = render(<Nothing />, this._renderRoot, this._preactDom);
    }
  }
};
