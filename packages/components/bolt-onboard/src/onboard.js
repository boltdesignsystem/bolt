import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './onboard.scss';
import schema from '../onboard.schema';

let cx = classNames.bind(styles);

@customElement('bolt-onboard')
class BoltOnboard extends BoltElement {
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
    const classes = cx('c-bolt-onboard', {
      [`c-bolt-onboard--status-${this.status}`]: this.status,
      [`c-bolt-onboard--size-${this.size}`]: this.size,
      [`c-bolt-onboard--radius-${this.radius}`]: this.radius,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltOnboard };
