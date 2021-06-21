import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './_card-replacement-actions.scss';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-actions')
class BoltCardReplacementActions extends BoltElement {
  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-card_replacement__actions');

    return html`
      <div class="${classes}">${this.slotify('default')}</div>
    `;
  }
}

export { BoltCardReplacementActions };
