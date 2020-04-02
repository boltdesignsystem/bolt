/* eslint-disable no-unused-expressions */
import { supportsAdoptingStyleSheets } from 'lit-element/lib/css-tag.js';
import { Slotify } from './Slotify.js';
import {
  renderAndRenderedEvents,
  // lazyStyles,
  conditionalShadowDom,
} from './lib/decorators';

@renderAndRenderedEvents()
// @lazyStyles()
@conditionalShadowDom()
class BoltElement extends Slotify {
  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    // Check if any `<ssr-keep>` elements have registered themselves here. If so, kick off the one-time hydration prep task.
    if (this.ssrKeep && !this.ssrPrepped) {
      this.ssrHydrationPrep();
    }
  }

  /**
   * Replace server-side rendered HTML with only the markup needed to hydrate web component, as marked by `<ssr-keep>` elements.
   */
  ssrHydrationPrep() {
    this.nodesToKeep = [];

    this.ssrKeep.forEach(item => {
      while (item.firstChild) {
        this.nodesToKeep.push(item.firstChild); // track the nodes that will be preserved
        this.appendChild(item.firstChild);
      }
    });

    // Remove all children not in the "keep" array
    Array.from(this.children)
      .filter(item => !this.nodesToKeep.includes(item))
      .forEach(node => {
        node.parentElement.removeChild(node);
      });

    this.ssrPrepped = true;
  }

  // patch to https://github.com/Polymer/lit-element/blob/master/src/lit-element.ts#L208
  // as a temp workaround to constructible stylesheets not working when
  // rendering inside + outside an iframe. Filing a bug with lit-element shortly!
  update(changedProperties) {
    super.update(changedProperties);

    // double-check if any `<ssr-keep>` elements have registered anything after connectedCallback fired.
    // this extra check addresses a bug encountered where components like accordions connect BEFORE <ssr-keep> fires
    if (this.ssrKeep && !this.ssrPrepped) {
      this.ssrHydrationPrep();
    }

    // When native Shadow DOM is used but adoptedStyles are not supported
    // (or can't be used -- ex. attached to more than one document), insert
    // styling after rendering to ensure adoptedStyles have highest priority.
    if (
      supportsAdoptingStyleSheets &&
      this.renderRoot.adoptedStyleSheets &&
      this.renderRoot.adoptedStyleSheets.length === 0
    ) {
      this._needsShimAdoptedStyleSheets = false;
      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
}

export { BoltElement };
