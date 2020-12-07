import {
  html,
  customElement,
  unsafeCSS,
  BoltActionElement,
  convertInitialTags,
} from '@bolt/element';
import classNames from 'classnames/bind';
import visuallyhiddenUtils from '@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss';
import styles from './_card-replacement-link.scss';
import schema from '../../card-replacement.schema';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-link')
@convertInitialTags('a') // The first matching tag will have its attributes converted to component props
class BoltCardReplacementLink extends BoltActionElement {
  static schema = schema;

  static get styles() {
    // how do we use the visuallyhiddenUtils
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-card_replacement__link');

    const hasUrl = this.url.length > 0 && this.url !== 'null';
    const urlTarget = this.target && hasUrl ? this.target : '_self';

    let renderedLink;

    const slotMarkup = () => {
      return html`
        <span class="${cx('u-bolt-visuallyhidden')}">
          ${this.slotMap.get('default')
            ? this.slotify('default')
            : html`
                <slot />
              `}
        </span>
      `;
    };

    if (this.rootElement) {
      renderedLink = this.rootElement.firstChild.cloneNode(true);
      if (renderedLink.tagName === 'A') {
        if (renderedLink.getAttribute('href') === null && hasUrl) {
          renderedLink.setAttribute('href', this.url);
        }
        if (renderedLink.getAttribute('target') === null && urlTarget) {
          renderedLink.setAttribute('target', urlTarget);
        }
      }
      renderedLink.className += ' ' + classes;

      //what is this?
      render(slotMarkup(), renderedLink);
    } else {
      if (hasUrl) {
        renderedLink = html`
          <a href="${this.url}" class="${classes}" target="${urlTarget}"
            >${slotMarkup()}</a
          >
        `;
      } else {
        renderedLink = html`
          <button class="${classes}" type="button">${slotMarkup()}</button>
        `;
      }
    }

    return html`
      ${renderedLink}
    `;
  }
}

export { BoltCardReplacementLink };
