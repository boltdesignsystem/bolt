import {
  props,
  css,
  hasNativeShadowDomSupport,
  supportsCSSVars,
  define,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';

import styles from './ratio.scss';

class BoltRatio extends withLitHtml {
  static props = {
    ratio: props.string,
    _ratioW: props.string, // internal only prop for handling the width-specific data from the ratio prop
    _ratioH: props.string, // internal only prop for handling the height-specific data from the ratio prop
    aspectRatioHeight: props.number, // deprecated - will be removed in Bolt v3.0
    aspectRatioWidth: props.number, // deprecated - will be removed in Bolt v3.0
    noCssVars: {
      ...props.boolean,
      ...{ default: supportsCSSVars ? false : true },
    },
  };


  updating() {
    super.updating && super.updating();
    this._computeRatio();
  }

  /**
   * sets the style so that the height is based on a ratio of width to height
   * @param {Number} aspH - the height component of the ratio
   * @param {Number} aspW - the width component of the ratio
   */
  _computeRatio() {
    if (this.props.aspectRatioHeight && this.props.aspectRatioWidth) {
      this._ratioH = this.props.aspectRatioHeight;
      this._ratioW = this.props.aspectRatioWidth;
    } else {
      this._ratioH = this.props.ratio ? this.props.ratio.split('/')[1] : 1;
      this._ratioW = this.props.ratio ? this.props.ratio.split('/')[0] : 1;
    }
  }

  connecting() {
    super.connecting && super.connecting();
    this._computeRatio();
  }

  // Render out component via Lit-HTML
  render() {
    const inlineStyles = this.noCssVars
      ? {
          'padding-bottom': `${100 * (this._ratioH / this._ratioW)}%`,
        }
      : {
          '--aspect-ratio': `${this._ratioW / this._ratioH}`,
        };

    return html`
      ${this.addStyles([styles])}
      <div class="${css(`c-bolt-ratio`)}" style=${styleMap(inlineStyles)}>
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltRatio };
