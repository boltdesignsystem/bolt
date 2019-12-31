import { props, hasNativeShadowDomSupport } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { html, customElement } from '@bolt/element';

import schema from '../../tile.schema.yml';
import styles from './_tile-media.scss';

let cx = classNames.bind(styles);

@customElement('bolt-tile-media')
class BoltTileMedia extends withLitHtml {
  render() {
    let containsVideo = false; // check if bolt-tile-media contains a bolt-video or video element.

    this.slots.default.map((child, item, array) => {
      if (child.tagName) {
        if (child.querySelector('bolt-video') || child.querySelector('video')) {
          containsVideo = true;
        }
      }
    });

    const classes = cx('c-bolt-tile__media', {
      [`c-bolt-tile__media--video`]: containsVideo,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltTileMedia };
