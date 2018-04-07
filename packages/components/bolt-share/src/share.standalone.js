import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  withPreact,
  withHyperHTML,
  sanitizeBoltClasses,
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
    Promise.all([
      customElements.whenDefined('bolt-block-list'),
      customElements.whenDefined('bolt-tooltip'),
    ]).then(_ => {
      this.twitterShare = this.querySelector('.js-bolt-share__twitter');
      console.log(this.twitterShare);
    });
  }
}
