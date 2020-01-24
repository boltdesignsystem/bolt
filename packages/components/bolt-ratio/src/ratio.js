import { supportsCSSVars } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/dedupe';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import ratioStyles from './ratio.scss';

let cx = classNames.bind(ratioStyles);

@customElement('bolt-ratio')
class BoltRatio extends BoltElement {
  static get properties() {
    return {
      ratio: String,
      _ratioW: String, // internal only prop for handling the width-specific data from the ratio prop
      _ratioH: String, // internal only prop for handling the height-specific data from the ratio prop
      aspectRatioHeight: {
        type: Number, // deprecated - will be removed in Bolt v3.0
        attribute: 'aspect-ratio-height',
      },
      aspectRatioWidth: {
        type: Number, // deprecated - will be removed in Bolt v3.0
        attribute: 'aspect-ratio-width',
      },
      noCssVars: {
        type: Boolean,
        attribute: 'no-css-vars',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.noCssVars = supportsCSSVars ? false : true;
  }

  static get styles() {
    return [unsafeCSS(ratioStyles)];
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
