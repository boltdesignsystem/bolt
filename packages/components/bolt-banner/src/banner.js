import { supportsCSSVars } from '@bolt/core/utils';
import classNames from 'classnames/dedupe';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import { withContext } from 'wc-context';
import bannerStyles from './banner.scss';
import schema from '../banner.schema';

let cx = classNames.bind(bannerStyles);

@customElement('bolt-banner')
class BoltBanner extends withContext(BoltElement) {
  static get properties() {
    return {
      status: String,
      align: String,
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

    const classes = cx('c-bolt-banner', {
      [`c-bolt-banner--status-${status}`]: status,
      [`t-bolt-dark`]:
        (status && status == 'error') || (status && status == 'success'),
      [`c-bolt-banner--align-${align}`]: align,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltBanner };
