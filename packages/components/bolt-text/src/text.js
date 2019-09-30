import {
  define,
  props,
  css,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './text.scss';
import schema from '../text.schema.yml';

@define
class BoltText extends withLitHtml() {
  static is = 'bolt-text';

  static props = {
    tag: props.string,
    display: props.string,
    color: props.string,
    align: props.string,
    textTransform: props.string,
    letterSpacing: props.string,
    fontFamily: props.string,
    lineHeight: props.string,
    fontWeight: props.string,
    fontSize: props.string,
    fontStyle: props.string,
    opacity: props.number,
    quoted: props.boolean,
    url: props.string,
    util: props.string,
    headline: props.boolean,
    subheadline: props.boolean,
    eyebrow: props.boolean,

    /**
     * @todo: remove icon props below once the icon and text components are split apart
     */
    // icon: props.string,
    // iconName: props.string,
    // iconBackground: props.string,
    // iconSize: props.string,
    // iconColor: props.string,
    // iconValign: props.string,
    // iconAlign: props.string,
  };

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  allowedValues(schemaData, propVal) {
    return schemaData.enum.indexOf(propVal) > -1
      ? propVal
      : typeof schemaData.default !== 'undefined'
      ? schemaData.default
      : false;
  }

  subComponentValues(propVal, defaultVal) {
    return propVal ? propVal : defaultVal;
  }

  render({ props, state }) {
    let tag = this.allowedValues(schema.properties['tag'], this.props.tag);
    let display = this.allowedValues(
      schema.properties['display'],
      this.props.display,
    );
    let color = this.allowedValues(
      schema.properties['color'],
      this.props.color,
    );
    let align = this.allowedValues(
      schema.properties['align'],
      this.props.align,
    );
    let lineHeight = this.allowedValues(
      schema.properties['line-height'],
      this.props.lineHeight,
    );
    let textTransform = this.allowedValues(
      schema.properties['text-transform'],
      this.props.textTransform,
    );
    let letterSpacing = this.allowedValues(
      schema.properties['letter-spacing'],
      this.props.letterSpacing,
    );
    let fontFamily = this.allowedValues(
      schema.properties['font-family'],
      this.props.fontFamily,
    );
    let fontWeight = this.allowedValues(
      schema.properties['font-weight'],
      this.props.fontWeight,
    );
    let fontSize = this.allowedValues(
      schema.properties['font-size'],
      this.props.fontSize,
    );
    let fontStyle = this.allowedValues(
      schema.properties['font-style'],
      this.props.fontStyle,
    );
    let opacity = this.allowedValues(
      schema.properties['opacity'],
      this.props.opacity,
    );
    let quoted = !!this.props.quoted;
    let url = this.props.url ? this.props.url : false;
    let util = this.props.util ? this.props.util : false;

    // Icon vars

    /**
     * @todo: remove icon logic below once text component is decoupled from the icon component
     */
    // let icon = this.props.icon ? this.props.icon : 'undefined';
    // let iconName = this.allowedValues(schema.properties.iconName, this.props.iconName);
    // let iconValign = this.allowedValues(schema.properties.iconValign, this.props.iconValign);
    // let iconAlign = this.allowedValues(schema.properties.iconAlign, this.props.iconAlign);
    // let iconBackground = this.allowedValues(schema.properties.iconBackground, this.props.iconBackground);
    // let iconSize = this.allowedValues(schema.properties.iconSize, this.props.iconSize);
    // let iconColor = this.allowedValues(schema.properties.iconColor, this.props.iconColor);

    // Build the icon
    /**
     * @todo: remove icon logic below once text component is decoupled from the icon component
     */
    // if ( url && (this.props.headline || this.props.subheadline || this.props.eyebrow) ) {
    //   // Headline, Subheadline, and Eyebrow always have chevron-right with url (if icon not false)
    //   if (icon !== 'false') {
    //     textItem = html`
    //     ${textItem} <bolt-icon name="chevron-right"></bolt-icon>
    //   `;
    //   }
    // } else if (iconName && iconAlign) {
    //   let theIcon = document.createElement('bolt-icon');
    //   theIcon.setAttribute('name', iconName);

    //   // Background
    //   if (iconBackground) {
    //     theIcon.setAttribute('background', iconBackground);
    //   }
    //   // Size
    //   if (iconSize) {
    //     theIcon.setAttribute('size', iconSize);
    //   }
    //   // Size
    //   if (iconColor) {
    //     theIcon.setAttribute('color', iconColor);
    //   }
    //   // Alignment
    //   if (iconAlign === 'right' || iconAlign === 'right-hang') {
    //     textItem = html`${textItem} ${theIcon}`;
    //   } else {
    //     textItem = html`${theIcon} ${textItem}`;
    //   }
    // }

    let longText = false; // Right now we are only checking this for headline (below)

    // Headline defaults
    if (this.props.headline) {
      tag = this.subComponentValues(this.props.tag, 'h2');
      color = this.subComponentValues(this.props.color, 'theme-headline');
      letterSpacing = this.subComponentValues(
        this.props.letterSpacing,
        'narrow',
      );
      fontFamily = this.subComponentValues(this.props.fontFamily, 'headline');
      fontSize = this.subComponentValues(this.props.fontSize, 'xlarge');
      fontWeight = this.subComponentValues(this.props.fontWeight, 'bold');

      // @todo: remove below once icon + text component decoupled
      // if (icon !== 'undefined' && icon !== 'false') {
      //   iconName = true;
      // }
      if (this.textContent.trim().length >= 60 && fontSize === 'xxxlarge') {
        longText = true;
      }
    }

    // Subheadline defaults
    if (this.props.subheadline) {
      color = this.subComponentValues(this.props.color, 'theme-headline');
      fontFamily = this.subComponentValues(this.props.fontFamily, 'headline');
      fontSize = this.subComponentValues(this.props.fontSize, 'large');

      // @todo: remove below once icon + text component decoupled
      // if (icon !== 'undefined' && icon !== 'false') {
      //   iconName = true;
      // }
    }

    // Eyebrow defaults
    if (this.props.eyebrow) {
      color = this.subComponentValues(this.props.color, 'theme-headline');
      textTransform = this.subComponentValues(
        this.props.textTransform,
        'uppercase',
      );
      letterSpacing = this.subComponentValues(this.props.letterSpacing, 'wide');
      lineHeight = this.subComponentValues(this.props.lineHeight, 'tight');
      fontFamily = this.subComponentValues(this.props.fontFamily, 'headline');
      fontSize = this.subComponentValues(this.props.fontSize, 'xsmall');
      opacity = this.subComponentValues(this.props.opacity, 80);

      // @todo: remove below once icon + text component decoupled
      // if (icon !== 'undefined' && icon !== 'false') {
      //   iconName = true;
      // }
    }

    // Important classes
    const classes = css(
      // iconName ? 'has-icon' : '', // @todo: remove when decoupled from icon component
      url ? 'has-url' : '',
      longText ? 'is-long' : '',
      'c-bolt-text-v2',
      `c-bolt-text-v2--${display}`,
      `c-bolt-text-v2--${fontFamily}`,
      `c-bolt-text-v2--font-size-${fontSize}`,
      `c-bolt-text-v2--font-weight-${fontWeight}`,
      `c-bolt-text-v2--font-style-${fontStyle}`,
      `c-bolt-text-v2--color-${color}`,
      letterSpacing ? `c-bolt-text-v2--letter-spacing-${letterSpacing}` : '',
      align ? `c-bolt-text-v2--align-${align}` : '',
      textTransform ? `c-bolt-text-v2--text-transform-${textTransform}` : '',
      lineHeight ? `c-bolt-text-v2--line-height-${lineHeight}` : '',
      opacity ? `c-bolt-text-v2--opacity-${opacity}` : '',
      quoted ? 'c-bolt-text-v2--quoted' : '',

      // @todo: remove once decoupled from icon component
      // iconValign ? `c-bolt-text-v2--vertical-align-${iconValign}` : '',
      // iconAlign ? `c-bolt-text-v2--icon-align-${iconAlign}` : '',
    );

    // Adds our utilities to the outer parent <bolt-text />
    if (util && util.indexOf(',') > -1) {
      const utilClasses = [];
      util.split(',').forEach(function(item) {
        utilClasses.push('u-bolt-' + item.trim());
      });
      this.setAttribute('class', utilClasses.join(' '));
    } else if (util && util.length > 0) {
      this.setAttribute('class', 'u-bolt-' + util.trim());
    }

    // A common use case is when rendering a list of menu options where some of the
    // options are links while others are buttons. The base template might be the same,
    // but they need to be wrapped in other semantic elements.
    function wrapInnerHTML(innerHTML) {
      switch (tag) {
        case 'a':
          return html`
            <a href="${url}" class="${classes}">${innerHTML}</a>
          `;
        case 'h1':
          return html`
            <h1 class="${classes}">${innerHTML}</h1>
          `;
        case 'h2':
          return html`
            <h2 class="${classes}">${innerHTML}</h2>
          `;
        case 'h3':
          return html`
            <h3 class="${classes}">${innerHTML}</h3>
          `;
        case 'h4':
          return html`
            <h4 class="${classes}">${innerHTML}</h4>
          `;
        case 'h5':
          return html`
            <h5 class="${classes}">${innerHTML}</h5>
          `;
        case 'h6':
          return html`
            <h6 class="${classes}">${innerHTML}</h6>
          `;
        case 'div':
          return html`
            <div class="${classes}">${innerHTML}</div>
          `;
        case 'span':
          return html`
            <span class="${classes}">${innerHTML}</span>
          `;
        case 'cite':
          return html`
            <cite class="${classes}">${innerHTML}</cite>
          `;
        default:
          return html`
            <p class="${classes}">${innerHTML}</p>
          `;
      }
    }

    const innerHTML = wrapInnerHTML(this.slot('default'));

    return html`
      ${this.addStyles([styles])}
      ${this.isServer
        ? html`
            <replace-with-grandchildren
              >${innerHTML}</replace-with-grandchildren
            >
          `
        : html`
            ${innerHTML}
          `}
    `;
  }
}

export { BoltText };
