import {
  props,
  define,
  mapWithDepth,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import Ajv from 'ajv';

import styles from './chip.scss';
import schema from '../chip.schema.yml';

const ajv = new Ajv({ useDefaults: 'shared' });

let cx = classNames.bind(styles);

@define
class BoltChip extends withLitHtml() {
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

  validateProps(propData) {
    var validatedData = propData;

    // remove default strings in prop data so schema validation can fill in the default
    for (let property in validatedData) {
      if (validatedData[property] === '') {
        delete validatedData[property];
      }
    }

    let isValid = this.validate(validatedData);

    // bark at any schema validation errors
    if (!isValid) {
      console.log(this.validate.errors);
    }

    return validatedData;
  }

  render() {
    const { url } = this.validateProps(this.props);
    let { tag } = this.validateProps(this.props);

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
