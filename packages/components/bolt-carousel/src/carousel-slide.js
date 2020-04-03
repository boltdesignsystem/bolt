import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import carouselStyles from '../index.scss';
let cx = classNames.bind(carouselStyles);

@customElement('bolt-carousel-slide')
class BoltCarouselSlide extends BoltElement {
  static get styles() {
    return [unsafeCSS(carouselStyles)];
  }

  render() {
    const classes = cx('c-bolt-carousel-slide');
    return html`
      <div class="${classes}">${this.slotify('default')}</div>
    `;
  }
}

export { BoltCarouselSlide };
