import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './placeholder.scss';
import schema from './placeholder.schema';

let cx = classNames.bind(styles);

@customElement('bolt-placeholder')
class BoltPlaceholder extends BoltElement {
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
    const classes = cx('c-bolt-placeholder');

    const wrapperClasses = cx('c-bolt-placeholder__wrapper', {
      [`c-bolt-placeholder__wrapper--animated`]: this.animated,
    });

    const contentClasses = cx('c-bolt-placeholder__content', {
      [`c-bolt-placeholder__content--${this.size}`]: this.size,
    });

    return html`
      <div class="${classes}">
        <div class="${wrapperClasses}">
          <div class="c-bolt-placeholder__wrapper-y"></div>
          <div class="c-bolt-placeholder__wrapper-x"></div>
          <div class="${contentClasses}">${this.slotify('default')}</div>
        </div>
      </div>
    `;
  }
}

export { BoltPlaceholder };
