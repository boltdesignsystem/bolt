import classNames from 'classnames/bind';
import cardActions from './_card-actions.scss';
import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
let cx = classNames.bind(cardActions);

@customElement('bolt-card-actions')
class BoltCardActions extends BoltElement {
  static get styles() {
    return [unsafeCSS(cardActions)];
  }

  render() {
    const classes = cx('c-bolt-card__actions');
    const items = this.slotMap
      .get('actions')
      .filter(item => item.nodeType === 1);
    console.log(items);
    return html`
      <div class="${classes}">
        ${items.map(
          item =>
            html`
              <div class="c-bolt-card__action">${item}</div>
            `,
        )}
      </div>
    `;
  }
}

export { BoltCardActions };
