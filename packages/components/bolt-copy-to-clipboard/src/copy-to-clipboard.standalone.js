import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import ClipboardJS from 'clipboard';

/**
 * 1. This web component does not currently use props or the shadow dom, so these lines of code are not required.
 *    Uncomment if we later decide to rebuild this as a full-featured web component.
 */

// import classNames from 'classnames/bind'; /* [1] */
// import styles from './copy-to-clipboard.scss'; /* [1] */
// import schema from '../copy-to-clipboard.schema'; /* [1] */

// let cx = classNames.bind(styles); /* [1] */

@customElement('bolt-copy-to-clipboard')
class BoltCopyToClipboard extends BoltElement {
  // static schema = schema; /* [1] */

  // static get properties() {
  //   return {
  //     ...this.props,
  //   };
  // } /* [1] */

  static useShadow = false;

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // } /* [1] */

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
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

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.clipboardInstance.destroy();
  }

  render() {
    return html`
      ${this.slotify('default')}
    `;
  }
}

export { BoltCopyToClipboard };
