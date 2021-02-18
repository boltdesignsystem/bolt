import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './teaser.scss';
import schema from '../teaser.schema';

let cx = classNames.bind(styles);

@customElement('bolt-teaser')
class BoltTeaser extends BoltElement {
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
    const classes = cx('c-bolt-teaser', {
      // [`c-bolt-teaser--disabled`]: this.disabled,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltTeaser };
