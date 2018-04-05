import {
  h,
  render,
  props,
  withComponent,
  withHyperHTML,
  css,
  hasNativeShadowDomSupport,
} from '@bolt/core';

import styles from './ratio.scss';


export function BoltRatio() {
  return class BoltRatioClass extends withComponent(withHyperHTML()) {

    static props = {
      aspectRatioHeight: props.number,
      aspectRatioWidth: props.number,
    }

    constructor(element) {
      super(element);
      this.useShadow = hasNativeShadowDomSupport;
      this.supportsCSSVars = window.CSS && CSS.supports('color', 'var(--primary)');
    }

    /**
     * sets the style so that the height is based on a ratio of width to height
     * @param {Number} aspH - the height component of the ratio
     * @param {Number} aspW - the width component of the ratio
     */
    _computeRatio() {
      const height = this.props.aspectRatioHeight && this.props.aspectRatioHeight > 0 ?
        this.props.aspectRatioHeight : 1;

      const width = this.props.aspectRatioWidth && this.props.aspectRatioWidth > 0 ?
        this.props.aspectRatioWidth : 1;

      if (this.supportsCSSVars) {
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
    render({ props, state }) {
      const classes = css(
        `o-${bolt.namespace}-ratio__inner`,
      );

      return this.html`
        ${this.addStyles([styles])}
        <div class="${classes}">
          ${this.useShadow ? (this.html`<slot />`) : this.slots.default}
        </div>
      `;
    }
  };
}
