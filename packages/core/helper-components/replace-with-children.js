// HyperHTML Renderer ported to SkateJS
import {
  HyperComponent,
  define,
  props,
} from '@bolt/core';

/**
 * The ReplaceWithChildren is a helper component used for prerendering components (ex. temp CSS
 * classes) that need to get removed when the component's JS kicks in. Once that happens, this
 * component automatically replaces itself with the component's child nodes.
 */

export class ReplaceWithChildren extends HyperComponent {
  static is = 'replace-with-children';

  constructor(self) {
    self = super(self);
    return self;
  }

  connecting() {
    this.replaceElementWithChildren();
  }

  replaceElementWithChildren() {
    const parentElement = this.parentElement;

    if (!parentElement) {
      Error('The <replace-with-children> element needs a parent element to append to!');
    }

    // Originally was this.replaceWith(...this.childNodes) but IE11 doesn't like that
    while (this.firstChild) {
      parentElement.appendChild(this.firstChild);
    }
    if (parentElement) {
      parentElement.removeChild(this);
    }
  }
}

customElements.define('replace-with-children', ReplaceWithChildren);
