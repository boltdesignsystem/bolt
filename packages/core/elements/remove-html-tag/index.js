import { define } from '@bolt/core/utils';
import { html } from '@bolt/core/renderers/renderer-lit-html';
import { ReplaceWithChildren } from '@bolt/core/elements/replace-with-children';

@define
class RemoveHtmlTag extends ReplaceWithChildren {
  static is = 'remove-html-tag';

  constructor(self) {
    self = super(self);
    self.useShadow = false;
    return self;
  }

  connecting() {
    this.removeChildKeepGrandchildren();
    super.connecting();
  }

  removeChildKeepGrandchildren() {
    const childHtmlTag = this.children[0];

    // // Originally was this.replaceWith(...this.childNodes) but IE11 doesn't like that
    while (childHtmlTag.firstChild) {
      this.appendChild(childHtmlTag.firstChild);
    }
    this.removeChild(childHtmlTag);
  }

  render() {
    return html`
      ${this.slot('default')}
    `;
  }
}

export { RemoveHtmlTag };
