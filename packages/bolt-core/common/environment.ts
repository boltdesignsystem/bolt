export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';

const { attachShadow } = HTMLElement.prototype;

export const hasNativeShadowDomSupport = attachShadow && attachShadow.toString().indexOf( 'native code' ) > -1;
