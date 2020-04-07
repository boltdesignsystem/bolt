import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import classNames from 'classnames/bind';
import { withContext } from 'wc-context';
import bodyStyles from './_card-replacement-body.scss';
let cx = classNames.bind(bodyStyles);

@customElement('bolt-card-replacement-body')
class BoltCardReplacementBody extends withContext(BoltElement) {
  static get styles() {
    return [unsafeCSS(bodyStyles)];
  }

  static get properties() {
    return {
      spacing: {
        type: String,
      },
    };
  }

  static get observedContexts() {
    return ['spacing'];
  }

  contextChangedCallback(name, oldValue, value) {
    this[name] = value;
  }

  render() {
    const classes = cx('c-bolt-card_replacement__body', {
      [`c-bolt-card_replacement__body--spacing-${this.spacing}`]: this.spacing,
    });
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
