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
    this.twitterShare = this.querySelector('.js-bolt-share__twitter');
    // this.twitterShare.addEventListener('click', this.clickHandler);
    console.log(this.querySelector('.js-bolt-share__twitter'));
  }
}
