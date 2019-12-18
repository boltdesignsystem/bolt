import { customElement } from '@bolt/element';
import { ReplaceWithChildren } from '../replace-with-children';

@customElement('replace-with-grandchildren')
class ReplaceWithGrandchildren extends ReplaceWithChildren {
  connectedCallback() {
    if (bolt.isServer) {
      return false;
    } else {
      const childHtmlTag = this.children[0];

      if (childHtmlTag) {
        // Originally was this.replaceWith(...this.childNodes) but IE11 doesn't like that
        while (childHtmlTag.firstChild) {
          this.appendChild(childHtmlTag.firstChild);
        }
        this.removeChild(childHtmlTag);
      }
      super.connectedCallback();
    }
  }
}

export { ReplaceWithGrandchildren };
