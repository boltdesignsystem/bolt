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
      aspectRatioHeight: props.number,
      aspectRatioWidth: props.number,
    };

    constructor(self) {
      self = super(self);
      this.useShadow = hasNativeShadowDomSupport;
      this.useCssVars = supportsCSSVars;
      return self;
    }

    /**
     * sets the style so that the height is based on a ratio of width to height
     * @param {Number} aspH - the height component of the ratio
     * @param {Number} aspW - the width component of the ratio
     */
    _computeRatio() {
      const height =
        this.props.aspectRatioHeight && this.props.aspectRatioHeight > 0
          ? this.props.aspectRatioHeight
          : 1;

      const width =
        this.props.aspectRatioWidth && this.props.aspectRatioWidth > 0
          ? this.props.aspectRatioWidth
          : 1;

      if (this.useCssVars) {
        this.style.setProperty('--aspect-ratio-height', height);
        this.style.setProperty('--aspect-ratio-width', width);
        this.style.paddingTop = '';
      } else {
        this.style.paddingTop = `${100 * (height / width)}%`;
        this.style.removeProperty('--aspect-ratio-height');
        this.style.removeProperty('--aspect-ratio-width');
      }
    }

    connecting() {
      this._computeRatio();
    }

    // Render out component via HyperHTML
    render() {
      const classes = css(`o-${bolt.namespace}-ratio__inner`);

      return html`
        ${this.addStyles([styles])}
        <div class="${classes}">${this.slot('default')}</div>
      `;
    }
  };
}

export { BoltRatio };
