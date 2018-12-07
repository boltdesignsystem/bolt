import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import Ajv from 'ajv';

import styles from './blockquote.scss';
import schema from '../blockquote.schema.yml';

const ajv = new Ajv({ useDefaults: 'shared' });

let cx = classNames.bind(styles);

@define
class BoltBlockquote extends withLitHtml() {
  static is = 'bolt-blockquote';

  static props = {
    size: props.string,
    alignItems: props.string,
    border: props.string,
    indent: props.boolean,
    fullBleed: props.boolean,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.validate = ajv.compile(schema);
    return self;
  }

  // @todo: move to the global Bolt Base component after we're done testing this out with the new refactored Card component
  // validateProps(propData) {
  //   var validatedData = propData;

  //   // remove default strings in prop data so schema validation can fill in the default
  //   for (let property in validatedData) {
  //     if (validatedData[property] === '') {
  //       delete validatedData[property];
  //     }
  //   }

  //   let isValid = this.validate(validatedData);

  //   // bark at any schema validation errors
  //   if (!isValid) {
  //     console.log(this.validate.errors);
  //   }

  //   return validatedData;
  // }

  // get alignItemsOption() {
  //   switch (this.props.alignItems) {
  //     case 'right':
  //       return 'end';
  //     case 'center':
  //       return 'center';
  //     default:
  //       // left => start
  //       return 'start';
  //   }
  // }

  // get borderOption() {
  //   switch (this.props.border) {
  //     case 'none':
  //       return 'borderless';
  //     case 'horizontal':
  //       return 'bordered-horizontal';
  //     default:
  //       // vertical => bordered-vertical
  //       return 'bordered-vertical';
  //   }
  // }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    // const { size, alignItems, border, indent, fullBleed } = this.validateProps(
    //   this.props,
    // );

    // const classes = cx('c-bolt-blockquote', {
    //   [`c-bolt-blockquote--${size}`]: size,
    //   [`c-bolt-blockquote--align-items-${this.alignItemsOption}`]: alignItems,
    //   [`c-bolt-blockquote--${this.borderOption}`]: border,
    //   [`c-bolt-blockquote--indented`]: indent,
    //   [`c-bolt-blockquote--full`]: fullBleed,
    // });

    return html`
      ${this.addStyles([styles])} ${this.slot('default')}
    `;
  }
}

export { BoltBlockquote };
