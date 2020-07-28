import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/dedupe';
import bannerStyles from './banner.scss';
import schema from '../banner.schema';

let cx = classNames.bind(bannerStyles);

@customElement('bolt-banner')
class BoltBanner extends BoltElement {
  static get properties() {
    return {
      status: String,
      align: String,
      full: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [unsafeCSS(bannerStyles)];
  }

  render() {
    const status = this.status || schema.properties.status.default;
    const align = this.align || schema.properties.align.default;
    const full = this.full || schema.properties.full.default;

    const classes = cx('c-bolt-banner', {
      [`c-bolt-banner--status-${status}`]: status,
      [`t-bolt-dark`]:
        (status && status === 'error') || (status && status === 'success'),
      [`c-bolt-banner--align-${align}`]: align,
      [`c-bolt-banner--full`]: full,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltBanner };
