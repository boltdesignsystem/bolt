import { html, customElement } from '@bolt/element';
import { props } from '@bolt/core-v3.x/utils';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './<%= props.name.kebabCase %>.scss';
import schema from '../<%= props.name.kebabCase %>.schema.yml';

let cx = classNames.bind(styles);

@customElement('bolt-<%= props.name.kebabCase %>')
class Bolt<%= props.name.pascalCase %> extends withLitHtml {
  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = this.getModifiedSchema(schema);
    return self;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-<%= props.name.kebabCase %>', {
      [`c-bolt-<%= props.name.kebabCase %>--disabled`]: disabled,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${this.slot('default')}
      </div>
    `;
  }
}

export { Bolt<%= props.name.pascalCase %> };
