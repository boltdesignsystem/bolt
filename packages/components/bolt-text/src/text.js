import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
// import styles from './text.scss';
import schema from '../text.schema';

let cx = classNames.bind(styles);

@customElement('bolt-text')
class BoltText extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  setDefaultValue(propName, propVal) {
    // Unless prop is explicitly set with an attribute, override default value from schema with `propVal`.
    const attr = this.getAttribute(propName);
    return attr ? attr : propVal;
  }

  render() {
    let longText = false; // Right now we are only checking this for headline (below)

    // Headline defaults
    if (this.headline) {
      this.tag = this.setDefaultValue('tag', 'h2');
      this.color = this.setDefaultValue('color', 'theme-headline');
      this.letterSpacing = this.setDefaultValue('letter-spacing', 'narrow');
      this.fontFamily = this.setDefaultValue('font-family', 'headline');
      this.fontSize = this.setDefaultValue('font-size', 'xlarge');
      this.fontWeight = this.setDefaultValue('font-weight', 'bold');

      if (
        this.textContent.trim().length >= 60 &&
        this.fontSize === 'xxxlarge'
      ) {
        longText = true;
      }
    }

    // Subheadline defaults
    if (this.subheadline) {
      this.color = this.setDefaultValue('color', 'theme-headline');
      this.fontFamily = this.setDefaultValue('font-family', 'headline');
      this.fontSize = this.setDefaultValue('font-size', 'large');
    }

    // Eyebrow defaults
    if (this.eyebrow) {
      this.color = this.setDefaultValue('color', 'theme-headline');
      this.textTransform = this.setDefaultValue('text-transform', 'uppercase');
      this.letterSpacing = this.setDefaultValue('letter-spacing', 'wide');
      this.lineHeight = this.setDefaultValue('line-height', 'tight');
      this.fontFamily = this.setDefaultValue('font-family', 'headline');
      this.fontSize = this.setDefaultValue('font-size', 'xsmall');
      this.opacity = this.setDefaultValue('opacity', 80);
    }

    // Important classes
    const classes = cx('c-bolt-text-v2', {
      [`is-long`]: longText,
      [`c-bolt-text-v2--${this.display}`]: this.display,
      [`c-bolt-text-v2--${this.fontFamily}`]: this.fontFamily,
      [`c-bolt-text-v2--font-size-${this.fontSize}`]: this.fontSize,
      [`c-bolt-text-v2--font-weight-${this.fontWeight}`]: this.fontWeight,
      [`c-bolt-text-v2--font-style-${this.fontStyle}`]: this.fontStyle,
      [`c-bolt-text-v2--color-${this.color}`]: this.color,
      [`c-bolt-text-v2--letter-spacing-${this.letterSpacing}`]: this
        .letterSpacing,
      [`c-bolt-text-v2--align-${this.align}`]: this.align,
      [`c-bolt-text-v2--text-transform-${this.textTransform}`]: this
        .textTransform,
      [`c-bolt-text-v2--line-height-${this.lineHeight}`]: this.lineHeight,
      [`c-bolt-text-v2--opacity-${this.opacity}`]: this.opacity,
      [`c-bolt-text-v2--quoted`]: this.quoted,
    });

    // Adds our utilities to the outer parent <bolt-text />
    if (this.util && this.util.indexOf(',') > -1) {
      const utilClasses = [];
      this.util.split(',').forEach(function(item) {
        utilClasses.push('u-bolt-' + item.trim());
      });
      this.setAttribute('class', utilClasses.join(' '));
    } else if (this.util && util.length > 0) {
      this.setAttribute('class', 'u-bolt-' + this.util.trim());
    }

    // A common use case is when rendering a list of menu options where some of the
    // options are links while others are buttons. The base template might be the same,
    // but they need to be wrapped in other semantic elements.

    const wrapInnerHTML = innerHTML => {
      switch (this.tag) {
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
        default:
          return html`
            <p class="${classes}">${innerHTML}</p>
          `;
      }
    };

    const innerHTML = wrapInnerHTML(this.slotify('default'));

    return html`
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
