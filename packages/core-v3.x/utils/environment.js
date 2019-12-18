import { hasNativeShadowDomSupport } from '@bolt/element/src/lib/utils';

// Helper util to check the current node environment + check if the browser supports shadow DOM for shimming purposes
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';

export { hasNativeShadowDomSupport };
