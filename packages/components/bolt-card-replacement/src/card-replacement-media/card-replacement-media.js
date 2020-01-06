import { props, hasNativeShadowDomSupport } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { html, customElement } from '@bolt/element';

import schema from '../../card-replacement.schema.yml';
import styles from './_card-replacement-media.scss';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-media')
class BoltCardReplacementMedia extends withLitHtml {
  render() {
    let containsVideo = false; // check if bolt-card-replacement-media contains a bolt-video or video element.

    this.slots.default.map((child, item, array) => {
      if (child.tagName) {
        if (child.querySelector('bolt-video') || child.querySelector('video')) {
          containsVideo = true;
        }
      }
    });

    const classes = cx('c-bolt-card_replacement__media', {
      [`c-bolt-card_replacement__media--video`]: containsVideo,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltCardReplacementMedia };
