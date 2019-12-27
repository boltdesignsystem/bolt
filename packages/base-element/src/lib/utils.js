export function findParentTag(el, tag) {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.tagName === tag) return el;
  }
  return null;
}

export function shouldUseShadowDom(elem) {
  if (
    elem.useShadow === false ||
    elem.noShadow === true ||
    findParentTag(elem, 'FORM') ||
    elem.hasAttribute('no-shadow') === true
  ) {
    return false;
  } else {
    return hasNativeShadowDomSupport;
  }
}

export const hasNativeShadowDomSupport = supportsShadowDom();

// Helper util to check if the browser supports shadow DOM for conditional shimming / progressive rendering
export function supportsShadowDom() {
  if (
    ('attachShadow' in Element.prototype &&
      'getRootNode' in Element.prototype) ||
    window.ShadyDOM
  ) {
    return true;
  } else {
    return false;
  }
}

export function sanitizeBoltClasses(
  elementToSanitize,
  prefixesToRemove = ['c-bolt-'],
) {
  let prefixes = Array.from(prefixesToRemove);
  // Remove any `c-bolt-` prefixed classes but leave the rest
  let remainingClasses;

  prefixes.forEach(function(prefix) {
    remainingClasses = elementToSanitize.className
      .split(' ')
      .filter(function(c) {
        return c.lastIndexOf(prefix, 0) !== 0;
      });
  });

  return remainingClasses.join(' ').trim();
}

/**
 * Get the first matching element in list of nodes. Sanitize classes and attributes, and return the element.
 *
 * @param {NodeList} nodeList - A list of nodes in the DOM tree.
 * @param {(string|string[])} tags - A tag name or a list of tag names.
 * @returns {Element} - The first matching element
 */
export function getComponentRootElement(nodeList, tags) {
  let rootElement;

  if (typeof tags === 'string') {
    tags = [tags];
  } else if (!Array.isArray(tags)) {
    return null;
  }

  tags = tags.map(name => name.toUpperCase());

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
