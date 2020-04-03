import { BoltAction } from '@bolt/core-v3.x/elements/bolt-action';
import { props } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import { render } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { html, customElement, convertInitialTags } from '@bolt/element';

import visuallyhiddenUtils from '@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss';
import styles from './_card-replacement-link.scss';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-link')
@convertInitialTags('a') // The first matching tag will have its attributes converted to component props
class BoltCardReplacementLink extends BoltAction {
  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    return self;
  }

  render() {
    const classes = cx('c-bolt-card_replacement__link');

    const hasUrl = this.props.url.length > 0 && this.props.url !== 'null';
    const urlTarget = this.props.target && hasUrl ? this.props.target : '_self';

    let renderedLink;

    const slotMarkup = () => {
      return html`
        <span class="${cx('u-bolt-visuallyhidden')}">
          ${'default' in this.slots ? this.slot('default') : html` <slot /> `}
        </span>
      `;
    };

    if (this.rootElement) {
      renderedLink = this.rootElement.firstChild.cloneNode(true);
      if (renderedLink.tagName === 'A') {
        if (renderedLink.getAttribute('href') === null && hasUrl) {
          renderedLink.setAttribute('href', this.props.url);
        }
        if (renderedLink.getAttribute('target') === null && urlTarget) {
          renderedLink.setAttribute('target', urlTarget);
        }
      }
      renderedLink.className += ' ' + classes;
      render(slotMarkup(), renderedLink);
    } else {
      if (hasUrl) {
        renderedLink = html`
          <a href="${this.props.url}" class="${classes}" target="${urlTarget}"
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
      ${this.addStyles([styles, visuallyhiddenUtils])} ${renderedLink}
    `;
  }
}

export { BoltCardReplacementLink };
