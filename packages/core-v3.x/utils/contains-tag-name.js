/**
 * Loops through a list of nodes to check if it contains a specific tag name (or names).
 *
 * @param {NodeList} nodeList - A list of nodes in the DOM tree.
 * @param {(string|string[])} tags - A tag name or a list of tag names.
 * @returns {Boolean} - True if list contains any of the specified tags.
 */

export function containsTagName(nodeList, tags) {
  let hasElement = false;

  if (typeof tags === 'string') {
    tags = [tags];
  } else if (!Array.isArray(tags)) {
    return null;
  }

  tags = tags.map(name => name.toUpperCase());

  nodeList.forEach((childElement, i) => {
    if (childElement.tagName && tags.includes(childElement.tagName)) {
      hasElement = true;
    }
  });

  return hasElement;
}
