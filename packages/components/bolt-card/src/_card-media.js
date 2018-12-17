import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import schema from '../card.schema.yml';
import styles from './_card-media.scss';

let cx = classNames.bind(styles);

@define
class BoltCardMedia extends withLitHtml() {
  static is = 'bolt-card-media';

  render() {
    let containsVideo = false; // check if bolt-card-media contains a bolt-video or video element.

    this.slots.default.map((child, item, array) => {
      if (child.tagName) {
        if (child.querySelector('bolt-video') || child.querySelector('video')) {
          containsVideo = true;
        }
      }
    });

    const classes = cx('c-bolt-card__media', {
      [`c-bolt-card__media--video`]: containsVideo,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltCardMedia };
