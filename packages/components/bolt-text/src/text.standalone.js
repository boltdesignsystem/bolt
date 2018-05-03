import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
  declarativeClickHandler,
  sanitizeBoltClasses,
} from '@bolt/core';

import styles from './text.scss';
import schema from '../text.schema.yml';

@define
class BoltText extends BoltComponent() {
  static is = 'bolt-text';

  static props = {
    tag: props.string,
    url: props.string,
    weight: props.string,
    fontStyle: props.string,
    fontSize: props.string,
    display: props.string,
    align: props.string,
    transform: props.string,
    letterSpacing: props.string,
    lineHeight: props.string,
    quoted: props.boolean,
    util: props.string,
    vspacing: props.string,
    opacity: props.number,
  }

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  allowedValues(schemaData, propVal) {
    return (schemaData.enum.indexOf(propVal) > -1) ? propVal : (typeof schemaData.default != 'undefined' ? schemaData.default : false);
  }

  render({ props, state }) {

    const weight = this.allowedValues(schema.properties.weight, this.props.weight);
    const style = this.allowedValues(schema.properties.style, this.props.fontStyle);
    const fontSize = this.allowedValues(schema.properties.fontSize, this.props.fontSize);
    const display = this.allowedValues(schema.properties.display, this.props.display);
    const align = this.allowedValues(schema.properties.align, this.props.align);
    const transform = this.allowedValues(schema.properties.transform, this.props.transform);
    const letterSpacing = this.allowedValues(schema.properties.letterSpacing, this.props.letterSpacing);
    const lineHeight = this.allowedValues(schema.properties.lineHeight, this.props.lineHeight);
    const quoted = this.props.quoted ? true : false;
    const util = this.props.util ? this.props.util : false
    const vspacing = this.allowedValues(schema.properties.vspacing, this.props.vspacing);
    const opacity = this.allowedValues(schema.properties.opacity, this.props.opacity);

    // Important classes
    const classes = css(
      'c-bolt-text',
      `c-bolt-text--weight-${weight}`,
      `c-bolt-text--style-${style}`,
      `c-bolt-text--font-${fontSize}`,
      `c-bolt-text--display-${display}`,
      letterSpacing ? `c-bolt-text--letter-spacing-${letterSpacing}` : '',
      align ? `c-bolt-text--align-${align}` : '',
      transform ? `c-bolt-text--transform-${transform}` : '',
      lineHeight ? `c-bolt-text--line-height-${lineHeight}` : '',
      quoted ? `c-bolt-text--quoted` : '',
      `c-bolt-text--vspacing-${vspacing}`,
      opacity ? `c-bolt-text--opacity-${opacity}` : '',
    );

    // Adds out utilities to the outer parent <bolt-text />
    if (util && util.indexOf(',') > -1) {
      const utilClasses = [];
      util.split(',').forEach(function(item){
        utilClasses.push('u-bolt-'+item.trim());
      });
      this.setAttribute('class', utilClasses.join(' '));
    } else if (util && util.length > 0) {
      this.setAttribute('class','u-bolt-'+util.trim());
    }

    let textItem = this.props.url ? this.hyper.wire(this) `<a href="${this.props.url}">${this.slot('default')}</a>` : this.hyper.wire(this) `${this.slot('default')}`;

    const tag = this.props.tag ? this.props.tag : 'p';

    if (tag == 'p') {
      textItem = this.hyper.wire(this) `
        <p class=${classes}>${textItem}</p>
      `;
    } else if (tag == 'h1') {
      textItem = this.hyper.wire(this) `
        <h1 class=${classes}>${textItem}</h1>
      `;
    } else if (tag == 'h2') {
      textItem = this.hyper.wire(this) `
        <h2 class=${classes}>${textItem}</h2>
      `;
    } else if (tag == 'h3') {
      textItem = this.hyper.wire(this) `
        <h3 class=${classes}>${textItem}</h3>
      `;
    } else if (tag == 'h4') {
      textItem = this.hyper.wire(this) `
        <h4 class=${classes}>${textItem}</h4>
      `;
    } else if (tag == 'h5') {
      textItem = this.hyper.wire(this) `
        <h5 class=${classes}>${textItem}</h5>
      `;
    } else if (tag == 'h6') {
      textItem = this.hyper.wire(this) `
        <h6 class=${classes}>${textItem}</h6>
      `;
    } else if (tag == 'span') {
      textItem = this.hyper.wire(this) `
        <span class=${classes}>${textItem}</span>
      `;
    } else if (tag == 'cite') {
      textItem = this.hyper.wire(this) `
        <cite class=${classes}>${textItem}</cite>
      `;
    } else if (tag == 'div') {
      textItem = this.hyper.wire(this) `
        <div class=${classes}>${textItem}</div>
      `;
    }

    return this.html`
      ${ this.addStyles([styles]) }
      ${textItem}
    `;
  }
}
