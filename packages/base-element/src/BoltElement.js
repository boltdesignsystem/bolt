/* eslint-disable no-unused-expressions */
import { LitElement } from 'lit-element';
import { supportsAdoptingStyleSheets } from 'lit-element/lib/css-tag.js';
import { Slotify } from './Slotify.js';
import {
  renderAndRenderedEvents,
  lazyStyles,
  conditionalShadowDom,
} from './lib/decorators';

@renderAndRenderedEvents()
@lazyStyles()
@conditionalShadowDom()
class BoltElement extends Slotify(LitElement) {
  // patch to https://github.com/Polymer/lit-element/blob/master/src/lit-element.ts#L208
  // as a temp workaround to constructible stylesheets not working when
  // rendering inside + outside an iframe. Filing a bug with lit-element shortly!
  update(changedProperties) {
    super.update(changedProperties);

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
