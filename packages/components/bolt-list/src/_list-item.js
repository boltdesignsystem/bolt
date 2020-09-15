import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import classNames from 'classnames/bind';
import styles from './_list-item.scss';
import schema from '../list.schema';

let cx = classNames.bind(styles);

@customElement('bolt-list-item')
class BoltListItem extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    const { display, inset, separator, spacing, tag } = this.props;
    return {
      display,
      inset,
      separator,
      spacing,
      tag,
      last: { type: Boolean },
    };
  }

  static get observedContexts() {
    return ['display', 'inset', 'separator', 'spacing', 'tag'];
  }

  contextChangedCallback(name, oldValue, value) {
    this[name] = value;
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-list-item', {
      [`c-bolt-list-item--display-${this.display}`]: this.display,
      [`c-bolt-list-item--inset`]: this.inset,
      [`c-bolt-list-item--last-item`]: this.last,
      [`c-bolt-list-item--separator-${this.separator}`]:
        this.separator !== 'none',
      [`c-bolt-list-item--spacing-${this.spacing}`]: this.spacing !== 'none',
    });

    return html`
      ${this.tag === 'ul' || this.tag === 'ol'
        ? html`
            <div class="${classes}" role="listitem">
              ${this.slotify('default')}
            </div>
          `
        : html`
            <span class="${classes}">${this.slotify('default')} </span>
          `}
    `;
  }
}

export { BoltListItem };
