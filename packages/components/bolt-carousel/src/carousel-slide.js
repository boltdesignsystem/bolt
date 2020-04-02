import { html, customElement, BoltElement } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from '../index.scss';
let cx = classNames.bind(styles);

@customElement('bolt-carousel-slide')
class BoltCarouselSlide extends BoltElement {
  render() {
    const classes = cx('c-bolt-carousel-slide');

    return html`
      <div class="${classes}">${this.slotify('default')}</div>
    `;
  }
}

export { BoltCarouselSlide };
