import { customElement } from '@bolt/element';

@customElement('replace-with-children')
class ReplaceWithChildren extends HTMLElement {
  connectedCallback() {
    const parentElement = this.parentElement;

    if (bolt.isServer) {
      return;
    }

    if (!parentElement) {
      Error(
        'The <replace-with-children> element needs a parent element to append to!',
      );
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

export { ReplaceWithChildren };
