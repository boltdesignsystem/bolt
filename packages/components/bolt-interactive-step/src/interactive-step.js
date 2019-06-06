import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './interactive-step.scss';
//import schema from '../interactive-step.schema.yml'; //Todo: Uncomment when you will need schema

let cx = classNames.bind(styles);

@define
class BoltInteractiveStep extends withLitHtml() {
  static is = 'bolt-interactive-step';

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
    const { disabled } = this.validateProps(this.props);

    const classes = cx(
      'c-bolt-interactive-step',
      {
        [`c-bolt-interactive-step--disabled`]: disabled,
      },
    );

    return html`
      ${this.addStyles([styles])}
      <li
        class="${classes}"
        is="shadow-root"
        data-pathway-step="3"
        data-is-active="inactive"
      >
        <span class="c-bolt-interactive-step__dot">&#9679;</span>
        <span class="c-bolt-interactive-step__title">${this.slot('title')}</span>
      </li>
    `;
  }
}

export { BoltInteractiveStep };
