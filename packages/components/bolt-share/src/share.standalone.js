import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  withPreact,
  withHyperHTML,
  sanitizeBoltClasses
} from '@bolt/core';

@define
export class BoltShare extends withHyperHTML() {
  static is = 'bolt-share';

  constructor() {
    super();
  }

  clickHandler(event) {
    event.preventDefault(); // Prevent the default link behavior
  }

  connecting() {

  }
}
