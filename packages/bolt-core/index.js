// Export non-Bolt dependencies shared across virtually all components
export { define, props, withComponent } from 'skatejs';
export { h, render } from 'preact';

// Export Bolt utils
export * from './utils/css';
export * from './utils/environment';
export { withPreact } from './utils/renderer-preact';

// Export Bolt data shared
export * from './data/spacing-sizes';

// Export polyfill loader
export * from './polyfills/polyfill-loader';


// Util to recursively look to see if parent is a specific HTML tag
export function findParentTag(el, tag) {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.tagName === tag)
      return el;
  }
  return null;
}
