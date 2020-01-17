import { html, customElement, BoltElement } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './<%= props.name.kebabCase %>.scss';
//import schema from '../<%= props.name.kebabCase %>.schema.yml';

let cx = classNames.bind(styles);

@customElement('bolt-<%= props.name.kebabCase %>')
class Bolt<%= props.name.pascalCase %> extends BoltElement {
  static get properties() {
    return {
      noShadow: {
        type: Boolean,
        attribute: 'no-shadow',
      },
      disabled: Boolean,
    };
  }

  render() {
    const classes = cx('c-bolt-<%= props.name.kebabCase %>', {
      [`c-bolt-<%= props.name.kebabCase %>--disabled`]: disabled,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { Bolt<%= props.name.pascalCase %> };
