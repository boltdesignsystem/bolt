export function findParentTag(el, tag) {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.tagName === tag) return el;
  }
  return null;
}

// global URL query flags & overrides for debugging & testing
const isDebugMode =
  (window.localStorage && window.localStorage.getItem('bolt-debug')) || false;
let shouldUseShadowDom = supportsShadowDom();

if (window.localStorage && window.localStorage.getItem('bolt-enable-shadow')) {
  shouldUseShadowDom = true;
} else if (
  window.localStorage &&
  window.localStorage.getItem('bolt-disable-shadow')
) {
  shouldUseShadowDom = false;
}

export const hasNativeShadowDomSupport = isDebugMode
  ? shouldUseShadowDom
  : supportsShadowDom();

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
