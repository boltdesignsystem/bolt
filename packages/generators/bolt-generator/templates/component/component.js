import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './{{ kebabCase name }}.scss';
import schema from '../{{ kebabCase name }}.schema';

let cx = classNames.bind(styles);

@customElement('bolt-{{ kebabCase name }}')
class Bolt{{ pascalCase name }} extends BoltElement {
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
    const classes = cx('c-bolt-{{ kebabCase name }}', {
      [`c-bolt-{{ kebabCase name }}--disabled`]: this.disabled,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { Bolt{{ pascalCase name }} };
