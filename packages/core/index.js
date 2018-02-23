// Export non-Bolt dependencies shared across virtually all components
export { define, props, withComponent, withUpdate } from 'skatejs';
export { h } from 'preact';

// Export Bolt utils
export * from './utils/css';
export { declarativeClickHandler } from './utils/declarative-click-handler';
export * from './utils/environment';

export { withPreact } from './renderers/renderer-preact';
export { withHyperHTML } from './renderers/renderer-hyperhtml';

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

export function sanitizeBoltClasses(elementToSanitize, prefixesToRemove = ['c-bolt-']) {
  let prefixes = Array.from(prefixesToRemove);
  // Remove any `c-bolt-` prefixed classes but leave the rest
  let remainingClasses;

  prefixes.forEach(function (prefix) {
    remainingClasses = elementToSanitize.className.split(' ').filter(function (c) {
      return c.lastIndexOf(prefix, 0) !== 0;
    });
  });

  return remainingClasses.join(' ').trim();
}