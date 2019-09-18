/**
 * Get array of HTMLElements from CSS selector
 * Fires `document.querySelectorAll` but returns an Array instead of a NodeList
 * @param {string} selector
 * @param {ParentNode} context [document] - Context to search inside (such as an HTML Element), defaults to whole page (`document`)
 * @return {HTMLElement[]}
 */
export function query(selector, context = document) {
  return Array.prototype.slice.call(context.querySelectorAll(selector));
}
