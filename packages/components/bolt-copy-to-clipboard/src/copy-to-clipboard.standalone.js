import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
  sanitizeBoltClasses,
} from '@bolt/core';

import ClipboardJS from 'clipboard';

@define
export class BoltCopyToClipboard extends BoltComponent() {
  static is = 'bolt-copy-to-clipboard';

  constructor(self) {
    self = super(self);
    this.useShadow = false;
    return self;
  }

  clickHandler(event) {
    event.preventDefault(); // Prevent the default link behavior
  }

  connecting() {
    this.copyLink = this.querySelector('.js-bolt-copy-to-clipboard__trigger');
    this.parentElem = this.querySelector('.js-bolt-copy-to-clipboard');

    this.copyLink.addEventListener('click', this.clickHandler);

    this.clipboardInstance = new ClipboardJS(this.copyLink); // ClipboardJS adds it's own event listener

    this.clipboardInstance.on('success', () => {
      // Copying is already successful at this point.  Everything from here on is UX flair.

      // Show the "in progress" status.
      this.parentElem.classList.add('is-copied');

      // Show the "success" status.
      setTimeout(() => {
        this.parentElem.classList.add('is-transitioning');

        // Reset so the link can be used again without refreshing the page.
        setTimeout(() => {
          this.parentElem.classList.remove('is-transitioning', 'is-copied');
        }, 3000);
      }, 1000);
    });
  }

  disconnecting() {
    this.clipboardInstance.destroy();
    this.copyLink.removeEventListener('click', this.clickHandler);
  }
}
