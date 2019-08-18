import { define } from '@bolt/core/utils';
import { ReplaceWithChildren } from '../replace-with-children';

@define
class ReplaceWithGrandchildren extends ReplaceWithChildren {
  static is = 'replace-with-grandchildren';

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
