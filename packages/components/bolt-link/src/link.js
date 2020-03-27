import {
  BoltActionElement,
  unsafeCSS,
  render,
  html,
  ifDefined,
  customElement,
  BoltElement,
  convertInitialTags,
} from '@bolt/element';
import classNames from 'classnames/bind';
import linkStyles from './link.scss';
import schema from '../link.schema.yml';

let cx = classNames.bind(linkStyles);

@customElement('bolt-link')
@convertInitialTags(['button', 'a'])
class BoltLink extends BoltActionElement {
  static get styles() {
    return [unsafeCSS(linkStyles)];
  }

  static get properties() {
    return {
      ...BoltActionElement.properties,
      display: String,
      valign: String,
      isHeadline: {
        type: Boolean,
        attribute: 'is-headline',
      },
    };
  }

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = schema;
    self.display = schema.properties.display.default;
    self.valign = schema.properties.valign.default;
    return self;
  }

  render() {
    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline links
    // 2. Zero Width No-break Space (&#xfeff;) is needed to make the last word always stick with the icon, so the icon will never become an orphan.

    // Validate the original prop data passed along -- returns back the validated data w/ added default values
    // const { display, valign, url, target, isHeadline } = this.validateProps(
    //   this.props,
    // );

    const classes = cx('c-bolt-link', {
      [`c-bolt-link--display-${this.display}`]: this.display,
      [`c-bolt-link--valign-${this.valign}`]: this.valign,
      [`c-bolt-link--headline`]: this.isHeadline,
    });

    // Decide on if the rendered button tag should be a <button> or <a> tag, based on if a URL exists OR if a link was passed in from the getgo
    const hasUrl = this.url && this.url.length > 0 && this.url !== 'null';

    // Assign default target attribute value if one isn't specified
    const anchorTarget = this.target && hasUrl ? this.target : '_self';

    // The linkElement to render, based on the initial HTML passed alone.
    let renderedLink;

    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline links
    // 2. Zero Width No-break Space (&#xfeff;) is needed to make the last word always stick with the icon, so the icon will never become an orphan.
    // prettier-ignore

    const innerSlots = html`${
      this.slotMap.get('before')
        ? html`<span class="${cx(`c-bolt-link__icon`)}">&#xfeff;${this.slotify('before')}</span>`
        : html`<slot name="before" />`}${
      this.slotMap.get('default')
        ? html`<span class="${cx(`c-bolt-link__text`)}">${this.slotify('default')}</span>`
        : html`<slot />`}${
      this.slotMap.get('after')
        ? html`<span class="${cx(`c-bolt-link__icon`)}">&#xfeff;${this.slotify('after')}</span>`
        : html`<slot name="after" />`}`;

    if (this.rootElement) {
      renderedLink = this.rootElement.firstChild.cloneNode(true);
      if (hasUrl) {
        renderedLink.setAttribute('href', this.url);
      }
      if (anchorTarget) {
        renderedLink.setAttribute('target', anchorTarget);
      }
      renderedLink.className += ' ' + classes;
      render(innerSlots, renderedLink);
    } else {
      // [1]
      // prettier-ignore
      renderedLink = html`<a href="${ifDefined(hasUrl ? this.url : undefined)}" class="${classes}" target="${anchorTarget}"
          >${innerSlots}</a
        >`;
    }

    // [1]
    // prettier-ignore
    return html`${renderedLink}`;
  }
}

export { BoltLink };
