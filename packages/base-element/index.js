export { BoltElement } from './src/BoltElement';
export { BoltActionElement } from './src/BoltActionElement';
export { Slotify } from './src/Slotify';

export {
  hasNativeShadowDomSupport, // deprecated, use supportsShadowDom instead
  shouldUseShadowDom,
  supportsShadowDom,
  findParentTag,
} from './src/lib/utils';

export { convertInitialTags } from './src/lib/decorators';
export { customElement, unsafeCSS } from 'lit-element';
export { render, html } from 'lit-html';
export { ifDefined } from 'lit-html/directives/if-defined';
export { classMap } from 'lit-html/directives/class-map.js';
export { styleMap } from 'lit-html/directives/style-map.js';
export { unsafeHTML } from 'lit-html/directives/unsafe-html';
