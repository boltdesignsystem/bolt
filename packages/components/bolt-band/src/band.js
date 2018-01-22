import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact
} from '@bolt/core';

class MyComponent extends withComponent(withLitHtml()) {
  renderCallback() {
    // @todo Have Salem review this to ensure it is correct
    return h`Hello, <slot />!`;
  }
}
