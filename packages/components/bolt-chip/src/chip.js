import {
  BoltActionElement,
  unsafeCSS,
  html,
  convertInitialTags,
  customElement,
} from '@bolt/element';
import { render } from 'lit-html';
import classNames from 'classnames/bind';
// import styles from './chip.scss';
import schema from '../chip.schema';

let cx = classNames.bind(styles);

@customElement('bolt-chip')
@convertInitialTags('a', 'span') // The first matching tag will have its attributes converted to component props
class BoltChip extends BoltActionElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  render() {
    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline chips
    // 2. Zero Width No-break Space (&#xfeff;) is needed to make the last word always stick with the icon, so the icon will never become an orphan.

    const classes = cx('c-bolt-chip', {
      [`c-bolt-chip--link`]: this.url,
      [`c-bolt-chip--size-${this.size}`]: this.size,
      [`c-bolt-chip--border-radius-${this.borderRadius}`]: this.borderRadius,
      [`c-bolt-chip--color-${this.color}`]: this.color,
      [`c-bolt-chip--icon-only`]: this.iconOnly,
    });

    // Decide on if the rendered tag should be a <span> or <a> tag, based on if a URL exists
    const hasUrl = this.url && this.url.length > 0;

    // Assign default target attribute value if one isn't specified
    const anchorTarget = this.target && hasUrl ? this.target : '_self';

    // The chipElement to render, based on the initial HTML passed alone.
    let renderedChip;

    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline links
    // 2. Zero Width No-break Space (&#xfeff;) is needed to make the last word always stick with the icon, so the icon will never become an orphan.
    // prettier-ignore

    const innerSlots = html`${
      this.slotMap.get('before')
        ? html`<span class="${cx(`c-bolt-chip__icon`)}">&#xfeff;${this.slotify('before')}</span>`
        : html`<slot name="before" />`}${
      this.slotMap.get('default')
        ? html`<span class="${cx(`c-bolt-chip__text`)}">${this.slotify('default')}</span>`
        : html`<slot />`}${
      this.slotMap.get('after')
        ? html`<span class="${cx(`c-bolt-chip__icon`)}">&#xfeff;${this.slotify('after')}</span>`
        : html`<slot name="after" />`}`;

    if (this.rootElement) {
      renderedChip = this.rootElement.firstChild.cloneNode(true);
      if (renderedChip.getAttribute('href') === null && hasUrl) {
        renderedChip.setAttribute('href', this.url);
      }
      renderedChip.className += ' ' + classes;
      render(innerSlots, renderedChip);
    } else if (hasUrl) {
      // [1]
      // prettier-ignore
      renderedChip = html`<a href="${this.url}" class="${classes}" target="${anchorTarget}"
          >${innerSlots}</a
        >`;
    } else {
      // [1]
      // prettier-ignore
      renderedChip = html`<span class="${classes}"
          >${innerSlots}</span
        >`;
    }

    // [1]
    // prettier-ignore
    return html`${renderedChip}`;
  }
}

export { BoltChip };
