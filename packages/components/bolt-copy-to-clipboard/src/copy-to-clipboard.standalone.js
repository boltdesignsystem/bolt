import { html, customElement } from '@bolt/element';
import ClipboardJS from 'clipboard';
import { withLitHtml } from '@bolt/core/renderers/renderer-lit-html';

@customElement('bolt-copy-to-clipboard')
class BoltCopyToClipboard extends withLitHtml {
  constructor(self) {
    self = super(self);
    self.useShadow = false;
    return self;
  }

  connecting() {
    this.copyTrigger = this.querySelector('[data-clipboard-text]');
    this.parentElem = this.querySelector('.js-bolt-copy-to-clipboard');

    this.clipboardInstance = new ClipboardJS(this.copyTrigger);

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
  }

  render() {
    return html`
      ${this.slot('default')}
    `;
  }
}

export { BoltCopyToClipboard };
