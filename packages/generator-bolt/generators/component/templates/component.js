import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './<%= props.name.kebabCase %>.scss';
//import schema from '../<%= props.name.kebabCase %>.schema.yml'; //Todo: Uncomment when you will need schema

let cx = classNames.bind(styles);

@define
class Bolt<%= props.name.pascalCase %> extends withLitHtml() {
  static is = 'bolt-<%= props.name.kebabCase %>';

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
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const {
      disabled,
    } = this.validateProps(this.props);

    const classes = cx('c-bolt-<%= props.name.kebabCase %>', {
      [`c-bolt-<%= props.name.kebabCase %>--disabled`]: disabled,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        ${this.slot('default')}
      </div>
    `;
  }
}

export { Bolt<%= props.name.pascalCase %> };
