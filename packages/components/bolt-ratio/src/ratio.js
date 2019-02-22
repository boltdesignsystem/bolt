import {
  props,
  css,
  hasNativeShadowDomSupport,
  supportsCSSVars,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';

import styles from './ratio.scss';

function BoltRatio() {
  return class BoltRatioClass extends withLitHtml() {
    static props = {
      ratio: props.string,
      ratioH: props.string,
      ratioW: props.string,
      noCssVars: {
        ...props.boolean,
        ...{ default: supportsCSSVars ? false : true },
      },
    };

    constructor(self) {
      self = super(self);
      return self;
    }

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
      this.ratioH = this.props.ratio ? this.props.ratio.split('/')[1] : 1;
      this.ratioW = this.props.ratio ? this.props.ratio.split('/')[0] : 1;

      // automatically reduce size of ratio to be below 100% based on CSS calc styles
      this.ratioH = this.ratioH >= 100 ? this.ratioH / 100 : this.ratioH;
      this.ratioW = this.ratioW >= 100 ? this.ratioW / 100 : this.ratioW;
    }

    connecting() {
      super.connecting && super.connecting();
      this._computeRatio();
    }

    // Render out component via Lit-HTML
    render() {
      const inlineStyles = this.noCssVars
        ? {
            'padding-bottom': `${100 * (this.ratioH / this.ratioW)}%`,
          }
        : {
            '--aspect-ratio': `${this.ratioW / this.ratioH}`,
          };

      return html`
        ${this.addStyles([styles])}
        <div class="${css(`c-bolt-ratio`)}" style=${styleMap(inlineStyles)}>
          ${this.slot('default')}
        </div>
      `;
    }
  };
}

export { BoltRatio };
