import {
  BoltActionElement,
  unsafeCSS,
  html,
  customElement,
  convertInitialTags,
  spread,
} from '@bolt/element';
import classNames from 'classnames/bind';
// import styles from './link.scss';
import schema from '../link.schema';

let cx = classNames.bind(styles);

@customElement('bolt-link')
@convertInitialTags(['button', 'a'])
class BoltLink extends BoltActionElement {
  static schema = schema;

  static get properties() {
    const { text, icon, ...filteredProps } = this.props;
    return {
      ...filteredProps,
    };
  }

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  render() {
    const classes = cx('c-bolt-link', {
      [`c-bolt-link--display-${this.display}`]: this.display,
      [`c-bolt-link--valign-${this.valign}`]: this.valign,
      [`c-bolt-link--headline`]: this.isHeadline,
    });

    const isAnchor = this.url || this?.rootElement?.firstChild?.tagName === 'A';

    const allAttributes = {
      ...this.rootElementAttributes,
      ...(this.url && { href: this.url }),
      ...(isAnchor && this.target && { target: this.target }),
      class: classes,
    };

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
    return html`${isAnchor
      ? html`<a ...="${spread(allAttributes)}">${innerSlots}</a>`
      : html`<button ...="${spread(allAttributes)}">${innerSlots}</button>`}`;
  }
}

export { BoltLink };
