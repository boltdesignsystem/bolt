import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import classNames from 'classnames/bind';
import bodyStyles from './_card-replacement-body.scss';
let cx = classNames.bind(bodyStyles);

@customElement('bolt-card-replacement-body')
class BoltCardReplacementBody extends BoltElement {
  static get styles() {
    return [unsafeCSS(bodyStyles)];
  }

  render() {
    const classes = cx('c-bolt-card_replacement__body');
    const { tag } = this.tag || 'div'; // fallback if the `tag` context isn't available for some reason

    return html`
      ${tag === 'figure'
        ? html`
            <figcaption class="${classes}">
              ${this.slotify('default')}
            </figcaption>
          `
        : html`
            <div class="${classes}">${this.slotify('default')}</div>
          `}
    `;
  }
}

export { BoltCardReplacementBody };
