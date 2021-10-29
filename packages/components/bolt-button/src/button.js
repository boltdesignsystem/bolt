import {
  BoltActionElement,
  unsafeCSS,
  html,
  ifDefined,
  convertInitialTags,
  customElement,
  spread,
} from '@bolt/element';
import classNames from 'classnames/bind';
// import styles from './button.scss';
import schema from '../button.schema.js';

let cx = classNames.bind(styles);

@customElement('bolt-button')
@convertInitialTags(['button', 'a'])
class BoltButton extends BoltActionElement {
  static schema = schema;

  // static useShadow = false; example of manually disabling Shadow DOM w/ BoltElement

  static get properties() {
    return {
      ...this.props,
      color: { type: String }, // Color is a deprecated web-component-only prop
      tabindex: { type: Number },
      inert: { type: Boolean }, // will eventually go hand in hand with https://github.com/WICG/inert#notes-on-the-polyfill
    };
  }

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  render() {
    // While `color` option is in use downstream, we must provide this fallback
    const hierarchy = this.color || this.hierarchy;
    const classes = cx('c-bolt-button', {
      'c-bolt-button--medium': !this.size, // Default size
      [`c-bolt-button--${this.size}`]: this.size,
      [`c-bolt-button--${hierarchy}`]: hierarchy,
      [`c-bolt-button--${this.width}`]: this.width && this.width !== 'auto',
      'c-bolt-button--border-radius-regular': !this.borderRadius, // Default border radius
      'c-bolt-button--border-radius-full': this.rounded && !this.borderRadius, // DEPRECATED.  Use the border-radius property instead of rounded.
      [`c-bolt-button--border-radius-${this.borderRadius}`]: this.borderRadius,
      'c-bolt-button--center': !this.align, // Default align
      [`c-bolt-button--${this.align}`]: this.align,
      [`c-bolt-button--${this.transform}`]:
        this.transform && this.transform !== 'none',
      'c-bolt-button--disabled': this.disabled,
      'c-bolt-button--inert': this.tabindex === -1 || this.inert,
      'c-bolt-button--icon-only': this.iconOnly,
    });

    // Decide on if the rendered button tag should be a <button> or <a> tag, based on if a URL exists OR if a link was passed in from the getgo
    const hasUrl = this.url && this.url.length > 0 && this.url !== 'null';

    // Assign default target attribute value if one isn't specified
    const urlTarget = this.target && hasUrl ? this.target : '_self';

    const innerSlots = () => {
      const itemClasses = cx('c-bolt-button__item');
      const iconClasses = cx('c-bolt-button__icon');
      const sizerClasses = cx('c-bolt-button__icon-sizer');

      return html`
        ${this.slotify('before') &&
          html`
            <span class="${iconClasses}"
              ><span class="${sizerClasses}"
                >${this.slotify('before')}</span
              ></span
            >
          `}${this.slotify('default') &&
          html`
            <span class="${itemClasses}">${this.slotify('default')}</span>
          `}${this.slotMap.get('after') &&
          html`
            <span class="${iconClasses}"
              ><span class="${sizerClasses}"
                >${this.slotify('after')}</span
              ></span
            >
          `}
      `;
    };

    if (hasUrl) {
      // note: using spread can be simple however here we want to filter out certain HTML attrs
      // ex. of vanilla usage (all HTML attrs OK)...="${spread(this.rootElementAttributes)}"
      return html`
        <a
          ...="${spread(
            // remove the disabled attribute from rootElementAttributes
            Object.assign({}, this.rootElementAttributes, {
              disabled: undefined,
            }),
          )}"
          href="${ifDefined(this.url && !this.disabled ? this.url : undefined)}"
          class="${classes}"
          target="${urlTarget}"
          tabindex=${ifDefined(
            this.tabindex === -1
              ? '-1'
              : this.tabindex
              ? this.tabindex
              : undefined,
          )}
          aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
          >${innerSlots()}</a
        >
      `;
    } else {
      return html`
        <button
          ...="${spread(
            // remove the href attribute from rootElementAttributes
            Object.assign({}, this.rootElementAttributes, {
              href: undefined,
            }),
          )}"
          class="${classes}"
          tabindex=${ifDefined(
            this.tabindex === -1
              ? '-1'
              : this.tabindex
              ? this.tabindex
              : undefined,
          )}
          type=${ifDefined(this.type ? this.type : undefined)}
          disabled=${ifDefined(this.disabled ? '' : undefined)}
        >
          ${innerSlots()}
        </button>
      `;
    }
  }
}

export { BoltButton };
