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
  classNames,
} from './src/lib/utils';

export { convertInitialTags } from './src/lib/decorators';
export { css, html, unsafeCSS } from 'lit-element';
export { render } from 'lit-html';
export { ifDefined } from 'lit-html/directives/if-defined';
export { classMap } from 'lit-html/directives/class-map.js';
export { styleMap } from 'lit-html/directives/style-map.js';
export { unsafeHTML } from 'lit-html/directives/unsafe-html';

// tweak the original customElement decorator from lit-element to verify that a component hasn't been defined first before trying to register
const legacyCustomElement = (tagName, clazz) => {
  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, clazz);
  }
  // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // tslint:disable-next-line:no-any
  return clazz;
};
const standardCustomElement = (tagName, descriptor) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    // This callback is called once the class is otherwise fully defined
    finisher(clazz) {
      if (!window.customElements.get(tagName)) {
        window.customElements.define(tagName, clazz);
      }
    },
  };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * @param tagName the name of the custom element to define
 */
export const customElement = tagName => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyCustomElement(tagName, classOrDescriptor)
    : standardCustomElement(tagName, classOrDescriptor);
