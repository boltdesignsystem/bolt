// temp workaround to auto-injected polyfills not getting bundled when Webpack DLL plugin is run outside of the Bolt Build tools
import '@bolt/polyfills';
export { BoltElement } from './src/BoltElement';
export { BoltActionElement } from './src/BoltActionElement';
export { Slotify } from './src/Slotify';

export {
  hasNativeShadowDomSupport, // deprecated, use supportsShadowDom instead
  shouldUseShadowDom,
  supportsShadowDom,
  findParentTag,
} from './src/lib/utils';

export { spread } from '@open-wc/lit-helpers';
export { convertInitialTags } from './src/lib/decorators';
export { css, html, unsafeCSS } from 'lit-element';
export { render } from 'lit-html';
export { ifDefined } from 'lit-html/directives/if-defined';
export { classMap } from 'lit-html/directives/class-map.js';
export { styleMap } from 'lit-html/directives/style-map.js';
export { unsafeHTML } from 'lit-html/directives/unsafe-html';

export { customElement } from './custom-element';
