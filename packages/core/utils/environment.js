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

export const hasNativeShadowDomSupport = supportsShadowDom();
