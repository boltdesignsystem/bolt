import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import classNames from 'classnames/bind';
// import styles from './_card-replacement-body.scss';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-body')
class BoltCardReplacementBody extends withContext(BoltElement) {
  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

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

    // @todo `tag` appears to be always undefined. Can we remove this? @see `cardReplacementContent` in `card-replacement.js` where `.tag` property binding happens.
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
