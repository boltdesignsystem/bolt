import {
  props,
  css,
  hasNativeShadowDomSupport,
  supportsCSSVars,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './ratio.scss';

function BoltRatio() {
  return class BoltRatioClass extends withLitHtml() {
    static props = {
      ratio: props.string,
    };

    constructor(self) {
      self = super(self);
      this.useCssVars = supportsCSSVars;
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
      const height = this.props.ratio ? this.props.ratio.split('/')[1] : 1;

      const width = this.props.ratio ? this.props.ratio.split('/')[0] : 1;

      if (this.useCssVars) {
        this.style.setProperty('--aspect-ratio', `${width}/${height}`);
        this.style.paddingBottom = '';
      } else {
        this.style.paddingBottom = `${100 * (height / width)}%`;
        this.style.removeProperty('--aspect-ratio');
        this.style.removeProperty('--aspect-ratio-height');
        this.style.removeProperty('--aspect-ratio-width');
      }
    }

    connecting() {
      super.connecting && super.connecting();
      this._computeRatio();
    }

    // Render out component via Lit-HTML
    render() {
      return html`
        ${this.addStyles([styles])} ${this.slot('default')}
      `;
    }
  };
}

export { BoltRatio };
