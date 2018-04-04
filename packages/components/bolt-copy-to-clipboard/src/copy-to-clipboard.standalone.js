import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  withPreact,
  BoltComponent,
  sanitizeBoltClasses
} from '@bolt/core';

import ClipboardJS from 'clipboard';

@define
export class BoltCopyToClipboard extends BoltComponent() {
  static is = 'bolt-copy-to-clipboard';

  constructor() {
    super();
  }

  clickHandler(event) {
    event.preventDefault(); // Prevent the default link behavior
  }

  connecting() {
    this.copyLink = this.querySelector('.js-bolt-copy-to-clipboard__default');
    this.parentElem = this.querySelector('.js-bolt-copy-to-clipboard');

    this.copyLink.addEventListener('click', this.clickHandler);

    this.clipboardInstance = new ClipboardJS(this.copyLink); // ClipboardJS adds it's own event listener

    /*
     * [1] Adds a class onClick after successful copy and enables the first set of animations
     * [2] Waits until the first set of animations complete and adds the last class for last animations
     */
    this.clipboardInstance.on('success', () => {
      this.parentElem.classList.add('is-copied'); // [1]
      setTimeout(() => { // [2]
        this.parentElem.classList.add('is-transitioning');
      }, 2000);
    });
  }

  disconnecting() {
    this.clipboardInstance.destroy();
    this.copyLink.removeEventListener('click', this.clickHandler);
  }
}
