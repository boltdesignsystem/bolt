import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './interactive-pathways.scss';
import schema from '../interactive-pathways.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathways extends withLitHtml() {
  static is = 'bolt-interactive-pathways';

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
    self.schema = this.getModifiedSchema(schema);
    return self;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-pathways', {
      [`c-bolt-interactive-pathways--disabled`]: disabled,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
