import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { css } from '@bolt/core-v3.x/utils';
import styles from './text.scss';
import schema from '../text.schema';

@customElement('bolt-text')
class BoltText extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  subComponentValues(propVal, defaultVal) {
    const attr = this.getAttribute(propVal);
    return attr ? attr : defaultVal;
  }

  render() {
    let longText = false; // Right now we are only checking this for headline (below)

    // Headline defaults
    if (this.headline) {
      this.tag = this.subComponentValues('tag', 'h2');
      this.color = this.subComponentValues('color', 'theme-headline');
      this.letterSpacing = this.subComponentValues('letter-pacing', 'narrow');
      this.fontFamily = this.subComponentValues('font-family', 'headline');
      this.fontSize = this.subComponentValues('font-size', 'xlarge');
      this.fontWeight = this.subComponentValues('font-weight', 'bold');

      if (this.textContent.trim().length >= 60 && fontSize === 'xxxlarge') {
        longText = true;
      }
    }

    // Subheadline defaults
    if (this.subheadline) {
      this.color = this.subComponentValues('color', 'theme-headline');
      this.fontFamily = this.subComponentValues('font-family', 'headline');
      this.fontSize = this.subComponentValues('font-size', 'large');
    }

    // Eyebrow defaults
    if (this.eyebrow) {
      this.color = this.subComponentValues('color', 'theme-headline');
      this.textTransform = this.subComponentValues(
        'text-transform',
        'uppercase',
      );
      this.letterSpacing = this.subComponentValues('letter-spacing', 'wide');
      this.lineHeight = this.subComponentValues('line-height', 'tight');
      this.fontFamily = this.subComponentValues('font-family', 'headline');
      this.fontSize = this.subComponentValues('font-size', 'xsmall');
      this.opacity = this.subComponentValues('opacity', 80);
    }

    // Important classes
    const classes = css(
      this.url ? 'has-url' : '',
      longText ? 'is-long' : '',
      'c-bolt-text-v2',
      `c-bolt-text-v2--${this.display}`,
      `c-bolt-text-v2--${this.fontFamily}`,
      `c-bolt-text-v2--font-size-${this.fontSize}`,
      `c-bolt-text-v2--font-weight-${this.fontWeight}`,
      `c-bolt-text-v2--font-style-${this.fontStyle}`,
      `c-bolt-text-v2--color-${this.color}`,
      this.letterSpacing
        ? `c-bolt-text-v2--letter-spacing-${this.letterSpacing}`
        : '',
      this.align ? `c-bolt-text-v2--align-${this.align}` : '',
      this.textTransform
        ? `c-bolt-text-v2--text-transform-${this.textTransform}`
        : '',
      this.lineHeight ? `c-bolt-text-v2--line-height-${this.lineHeight}` : '',
      this.opacity ? `c-bolt-text-v2--opacity-${this.opacity}` : '',
      this.quoted ? 'c-bolt-text-v2--quoted' : '',
    );

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
      // function wrapInnerHTML(innerHTML) {
      switch (this.tag) {
        case 'a':
          return html`
            <a href="${this.url}" class="${classes}">${innerHTML}</a>
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
    };

    const innerHTML = wrapInnerHTML(this.slotMap.get('default'));

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
