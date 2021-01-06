import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/dedupe';
import styles from './banner.scss';
import schema from '../banner.schema';

let cx = classNames.bind(styles);

@customElement('bolt-banner')
class BoltBanner extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-banner', {
      [`c-bolt-banner--status-${this.status}`]: this.status,
      [`t-bolt-dark`]:
        (this.status && this.status === 'error') ||
        (this.status && this.status === 'success'),
      [`c-bolt-banner--align-${this.align}`]: this.align,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltBanner };
