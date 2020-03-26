import {
  BoltActionElement,
  unsafeCSS,
  render,
  html,
  ifDefined,
  customElement,
  convertInitialTags,
  spread,
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
    self.target = schema.properties.target.default; // @todo: remove once https://github.com/boltdesignsystem/bolt/pull/1795 lands
    return self;
  }

  render() {
    const classes = cx('c-bolt-link', {
      [`c-bolt-link--display-${this.display}`]: this.display,
      [`c-bolt-link--valign-${this.valign}`]: this.valign,
      [`c-bolt-link--headline`]: this.isHeadline,
    });

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

    // [1]
    // prettier-ignore
    return html`<a
      ...="${spread(this.rootElementAttributes)}"
      href="${ifDefined(this.url ? this.url : undefined)}"
      class="${classes}"
      target="${ifDefined(this.target ? this.target : undefined)}">${innerSlots}</a>`;
  }
}

export { BoltLink };
