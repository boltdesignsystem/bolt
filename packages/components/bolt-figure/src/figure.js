import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import figureStyles from './figure.scss';

let cx = classNames.bind(figureStyles);

@customElement('bolt-figure')
class BoltFigure extends BoltElement {
  static get styles() {
    return [unsafeCSS(figureStyles)];
  }

  render() {
    return html`
      <figure class="${cx('c-bolt-figure')}">
        ${this.slotMap.get('media') &&
          html`
            <div class="${cx('c-bolt-figure__media')}">
              ${this.slotify('media')}
            </div>
          `}
        ${this.slotMap.get('default') &&
          html`
            <figcaption class="${cx('c-bolt-figure__caption')}">
              ${this.slotify('default')}
            </figcaption>
          `}
      </figure>
    `;
  }
}

export { BoltFigure };
