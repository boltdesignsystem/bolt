import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './post.scss';
import schema from '../post.schema';

let cx = classNames.bind(styles);

@customElement('bolt-post')
class BoltPost extends BoltElement {
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
    const classes = cx('c-bolt-post', {
      [`c-bolt-post--disabled`]: this.disabled,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltPost };
