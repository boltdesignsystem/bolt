import {
  props,
  define,
  hasNativeShadowDomSupport,
  validateProps,
} from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import Ajv from 'ajv';

import styles from './chip.scss';
import schema from '../chip.schema.yml';

const ajv = new Ajv({ useDefaults: 'shared' });

let cx = classNames.bind(styles);

@define
class BoltChip extends withLitHtml {
  static is = 'bolt-chip';

  static props = {
    tag: props.string, // a | span
    url: props.string,
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.validate = ajv.compile(schema);
    return self;
  }

  render() {
    const { url } = validateProps(this.props, this.validate);
    let { tag } = validateProps(this.props, this.validate);

    const classes = cx('c-bolt-chip');
    const textClasses = cx('c-bolt-chip__item-text');

    let renderedChip;

    if (url) {
      tag = 'a';
    }

    switch (tag) {
      case 'a':
        renderedChip = html`
          <a href="${url}" class="${classes}">
            <span class="${textClasses}">
              ${this.slot('default')}
            </span>
          </a>
        `;
        break;
      default:
        renderedChip = html`
          <span class="${classes}">
            <span class="${textClasses}">
              ${this.slot('default')}
            </span>
          </span>
        `;
    }

    return html`
      ${this.addStyles([styles])} ${renderedChip}
    `;
  }
}

export { BoltChip };
