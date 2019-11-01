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
    elem.constructor.useShadow === false ||
    elem.constructor.noShadow ||
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
