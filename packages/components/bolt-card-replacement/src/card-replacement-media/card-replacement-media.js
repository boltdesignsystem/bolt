import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './_card-replacement-media.scss';
import schema from '../../card-replacement.schema';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-media')
class BoltCardReplacementMedia extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    let containsVideo = false; // check if bolt-card-replacement-media contains a bolt-video or video element.

    this.slotMap.get('default').map((child, item, array) => {
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
      <div class="${classes}">${this.slotify('default')}</div>
    `;
  }
}

export { BoltCardReplacementMedia };
