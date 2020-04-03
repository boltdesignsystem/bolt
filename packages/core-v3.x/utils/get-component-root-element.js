/**
 * Get the first matching element in list of nodes. Sanitize classes and attributes, and return the element.
 *
 * @param {NodeList} nodeList - A list of nodes in the DOM tree.
 * @param {(string|string[])} tags - A tag name or a list of tag names.
 * @returns {Element} - The first matching element
 */

import { sanitizeBoltClasses } from './sanitize-classes';

export function getComponentRootElement(nodeList, tags) {
  let rootElement;

  if (typeof tags === 'string') {
    tags = [tags];
  } else if (!Array.isArray(tags)) {
    return null;
  }

  tags = tags.map((name) => name.toUpperCase());

  nodeList.forEach((childElement, i) => {
    if (
      childElement.tagName &&
      tags.includes(childElement.tagName) &&
      rootElement === undefined
    ) {
      if (childElement.className) {
        childElement.className = sanitizeBoltClasses(childElement);
      }

      if (
        childElement.getAttribute('is') &&
        childElement.getAttribute('is') === 'shadow-root'
      ) {
        childElement.removeAttribute('is');
      }

      rootElement = childElement;
    }
  });

  return rootElement;
}
