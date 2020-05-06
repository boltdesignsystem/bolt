import { ReplaceWithChildren } from '../replace-with-children';

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

if (!customElements.get('replace-with-grandchildren')) {
  customElements.define('replace-with-grandchildren', ReplaceWithGrandchildren);
}

export { ReplaceWithGrandchildren };
