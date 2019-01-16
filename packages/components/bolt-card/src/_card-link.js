import { BoltAction } from '@bolt/core/elements/bolt-action';
import { props, define } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { html } from '@bolt/core/renderers/renderer-lit-html';
import { convertInitialTags } from '@bolt/core/decorators';

import styles from './_card-link.scss';

let cx = classNames.bind(styles);

@define
@convertInitialTags('a') // The first matching tag will have its attributes converted to component props
class BoltCardLink extends BoltAction {
  static is = 'bolt-card-link';

  constructor() {
    super();
  }

  render() {
    const classes = cx('c-bolt-card__link');

    const hasUrl = this.props.url.length > 0 && this.props.url !== 'null';
    const urlTarget = this.props.target && hasUrl ? this.props.target : '_self';

    let renderedLink;

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
    } else {
      if (hasUrl) {
        renderedLink = html`
          <a
            href="${this.props.url}"
            class="${classes}"
            target="${urlTarget}"
          ></a>
        `;
      } else {
        renderedLink = html`
          <button class="${classes}" type="button"></button>
        `;
      }
    }

    return html`
      ${this.addStyles([styles])} ${renderedLink}
    `;
  }
}

export { BoltCardLink };
