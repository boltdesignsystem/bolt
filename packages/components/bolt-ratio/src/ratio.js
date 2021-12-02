import { supportsCSSVars } from '@bolt/core-v3.x/utils';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import classNames from 'classnames/dedupe';
import styles from './ratio.scss';
import schema from '../ratio.schema';

let cx = classNames.bind(styles);

@customElement('bolt-ratio')
class BoltRatio extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      //internal only props
      _ratioW: {
        type: String,
      },
      _ratioH: {
        type: String,
      },
      // deprecated - will be removed in Bolt v3.0
      aspectRatioHeight: {
        type: Number,
        attribute: 'aspect-ratio-height',
      },
      aspectRatioWidth: {
        type: Number,
        attribute: 'aspect-ratio-width',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.noCssVars = supportsCSSVars ? false : true;
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  /**
   * sets the style so that the height is based on a ratio of width to height
   * @param {Number} aspH - the height component of the ratio
   * @param {Number} aspW - the width component of the ratio
   */
  _computeRatio() {
    if (this.aspectRatioHeight && this.aspectRatioWidth) {
      this._ratioH = this.aspectRatioHeight;
      this._ratioW = this.aspectRatioWidth;
    } else {
      this._ratioH = this.ratio ? this.ratio.split('/')[1] : 1;
      this._ratioW = this.ratio ? this.ratio.split('/')[0] : 1;
    }
  }

  render() {
    this._computeRatio();
    const inlineStyles = this.noCssVars
      ? {
          'padding-bottom': `${100 * (this._ratioH / this._ratioW)}%`,
        }
      : {
          '--aspect-ratio': `${this._ratioW / this._ratioH}`,
        };

    return html`
      <div class="${cx(`c-bolt-ratio`)}" style=${styleMap(inlineStyles)}>
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltRatio };
