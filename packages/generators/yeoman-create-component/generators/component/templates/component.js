import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './<%= props.name.kebabCase %>.scss';
import schema from '../<%= props.name.kebabCase %>.schema';

let cx = classNames.bind(styles);

@customElement('bolt-<%= props.name.kebabCase %>')
class Bolt<%= props.name.pascalCase %> extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    }
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-<%= props.name.kebabCase %>', {
      [`c-bolt-<%= props.name.kebabCase %>--disabled`]: this.disabled,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { Bolt<%= props.name.pascalCase %> };
