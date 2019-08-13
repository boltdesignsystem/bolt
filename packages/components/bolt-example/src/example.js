import { define, props, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';

import styles from './example.scss';
import schema from '../example.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltExample extends withLitHtml() {
  static is = 'bolt-example';

  static props = {
    spacing: props.string,
    borderless: props.boolean,
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = this.getModifiedSchema(schema);

    return self;
  }

  template() {
    const { spacing, borderless } = this.validateProps(this.props);

    const classes = cx('c-bolt-example', {
      [`c-bolt-example--spacing-${spacing}`]: spacing,
      [`c-bolt-example--borderless`]: borderless,
    });

    const slotMarkup = name => {
      switch (name) {
        case 'title':
          const titleClasses = cx('c-bolt-example__title');
          return name in this.slots
            ? html`
                <div class="${titleClasses}">${this.slot(name)}</div>
              `
            : html`
                <slot name="${name}" />
              `;
        default:
          const contentClasses = cx('c-bolt-example__content');
          return html`
            <div class="${contentClasses}">
              ${name in this.slots
                ? this.slot('default')
                : html`
                    <slot />
                  `}
            </div>
          `;
      }
    };

    const innerSlots = [slotMarkup('title'), slotMarkup('default')];

    return html`
      <div class="${classes}">${innerSlots}</div>
    `;
  }

  render() {
    return html`
      ${this.addStyles([styles])} ${this.template()}
    `;
  }
}

export { BoltExample };
