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
import { spread } from '@open-wc/lit-helpers';
import classNames from 'classnames/bind';
import linkStyles from './link.scss';
import schema from '../link.schema.yml';
let cx = classNames.bind(linkStyles);

delete schema.properties['attributes'];

@customElement('bolt-link')
@convertInitialTags(['button', 'a'])
class BoltLink extends BoltActionElement {
  static get styles() {
    return [unsafeCSS(linkStyles)];
  }

  static schema = schema;

  static get properties() {
    return Object.assign({}, this.props, {
      disabled: {
        type: Boolean,
      },
      onClick: {
        type: String,
        attribute: 'on-click',
      },
      onClickTarget: {
        type: String,
        attribute: 'on-click-target',
      },
    });
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.customProps = {};

    if (this.rootElement) {
      Array.from(this.rootElement.firstChild.attributes).forEach(item => {
        let propName;
        switch (item.name) {
          case 'href':
            propName = 'url';
            break;
          default:
            propName = item.name;
        }

        if (!this[propName]) {
          this[propName] = item.value; // use element props if not already defined
        }

        // extra HTML attributes to include on the rendered <a> tag
        this.customProps[item.name] = item.value;
      });
    }
  }

  render() {
    // Validate the original prop data passed along -- returns back the validated data w/ added default values
    // const { display, valign, url, target, isHeadline } = this.validateProps(
    //   this.props,
    // );

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
    return html`
      <a ...="${spread(this.customProps)}" 
        href="${ifDefined(this.url ? this.url : undefined)}"
        class="${classes}"
        target="${this.target}">
        ${innerSlots}
      </a>
      `;
  }
}

export { BoltLink };
