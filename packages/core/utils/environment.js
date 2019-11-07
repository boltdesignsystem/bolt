// Helper util to check the current node environment + check if the browser supports shadow DOM for shimming purposes

export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';

function supportsShadowDom() {
  if (
    bolt.isClient &&
    (('attachShadow' in Element.prototype &&
      'getRootNode' in Element.prototype) ||
      window.ShadyDOM)
  ) {
    return true;
  } else {
    return false;
  }
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
