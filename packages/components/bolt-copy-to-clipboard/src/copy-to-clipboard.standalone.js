import ClipboardJS from 'clipboard';

import { props, define } from '@bolt/core/utils';
import { withHyperHtml } from '@bolt/core/renderers';

@define
class BoltCopyToClipboard extends withHyperHtml() {
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
      this.parentElem.classList.add('is-animating');

      // Show the "success" status.
      setTimeout(() => {
        this.parentElem.classList.add('is-successful');

        // Reset so the link can be used again without refreshing the page.
        setTimeout(() => {
          this.parentElem.classList.remove('is-successful');
          this.parentElem.classList.remove('is-animating');
        }, 3000);
      }, 1000);
    });
  }

  disconnecting() {
    this.clipboardInstance.destroy();
    this.copyLink.removeEventListener('click', this.clickHandler);
  }
}

export { BoltCopyToClipboard };
