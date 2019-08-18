// Util to recursively look to see if parent is a specific HTML tag
export function findParentTag(el, tag) {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.tagName === tag) return el;
  }
  return null;
}

export default findParentTag;
