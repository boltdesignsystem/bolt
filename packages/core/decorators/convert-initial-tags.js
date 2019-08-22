/**
 * A Class decorator that extends the `connecting()` method to find the first matching element in the component root and assign it to `this.rootElement`.
 * Components can then check for `this.rootElement` and convert that element's attributes to props.
 * Example: `<bolt-link>` will convert attributes on an `<a>` into component props.
 *
 * @param {(string|string[])} tags - A tag name or a list of tag names.
 * @param {boolean} moveChildrenToRoot - If true, moves children of the root element to the custom element root.
 * @returns {Object} - The original Class with extended `connecting()` method.
 */

import { getComponentRootElement } from '@bolt/core/utils';

export function convertInitialTags(tags, moveChildrenToRoot = true) {
  return target => {
    return class extends target {
      connecting() {
        super.connecting && super.connecting();

        // Make sure the component ONLY ever reuses any existing HTML ONCE. This, in part, helps to prevent rendering diff errors in HyperHTML after booting up!
        if (this._wasInitiallyRendered === false) {
          // If the initial element contains a child node, break apart the original HTML so we can retain the a tag but swap out the inner content with slots.
          let rootElement = getComponentRootElement(this.childNodes, tags);

          if (rootElement) {
            this.rootElement = document.createDocumentFragment();

            if (moveChildrenToRoot) {
              // Take any child elements and move them to the root of the custom element
              while (rootElement.firstChild) {
                this.appendChild(rootElement.firstChild);
              }
            }

            this.rootElement.appendChild(rootElement);
          }
        }
      }
    };
  };
};
