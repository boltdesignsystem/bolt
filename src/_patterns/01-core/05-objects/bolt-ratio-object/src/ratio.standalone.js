import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes,
  hasNativeShadowDomSupport
} from '@bolt/core';


import styles from './ratio.scss';

@define
export class BoltRatio extends withComponent(withPreact()) {
  static is = 'bolt-ratio';

  static props = {
    aspectRatioHeight: props.number,
    aspectRatioWidth: props.number
  }

  constructor(element){
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
    const h = this.props.aspectRatioHeight && this.props.aspectRatioHeight > 0 ? this.props.aspectRatioHeight : 1;
    const w = this.props.aspectRatioWidth && this.props.aspectRatioWidth > 0 ? this.props.aspectRatioWidth : 1;

    if (this.supportsCSSVars){
      this.style.setProperty(`--aspect-ratio-height`, h);
      this.style.setProperty(`--aspect-ratio-width`, w);
      this.style.paddingTop = '';
    } else {
      this.style.paddingTop = (100 * h / w) + "%";
      this.style.removeProperty('--aspect-ratio-height');
      this.style.removeProperty('--aspect-ratio-width');
    }
  }

  connectedCallback() {

    if (this.shadowRoot) {
      this._render(this.render(), this.shadowRoot);
    } else {
      this._render(this.render(), this);
    }
    this._computeRatio();
  }

  // Called when props have been set regardless of if they've changed. - recalculates ratio if props updated

  renderer(root, html) {
    if (this.useShadow) {
      super.renderer(root, html);
    } else {
      root.innerHTML = `<div class="o-bolt-ratio__inner">${this.innerHTML}</div>`;
    }
  }

  // Render out component via Preact
  render() {
    const classes = css(
      'o-bolt-ratio__inner'
    );

    if (this.useShadow) {
      return (
        <div className={classes}>
          {this.useShadow &&
            <style>
              {styles[0][1]}
            </style>
          }
          <slot />
        </div>
      )
    }
  }

  /** Idea for wiring up ShadyCSS + Preact inspired by https://github.com/daKmoR/lit-html-demos/blob/master/demo/wc02.html **/
  _render(what, where) {
    this.render(what, where);


      // Auto-add class for fallback styles
      var childNodes = this.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType !== 3) { // nodeType 3 is a text node
          childNodes[i].classList.add('o-bolt-ratio__inner');
        }
      }

    /** @TODO: determine if this logic below is required. This <style> node cleanup was
     *  included in original example (mentioned above) so keeping around for now.
     */
      // if (!ShadyCSS.nativeShadow) {
      //   this.shadowRoot.querySelectorAll('style').forEach((styleNode) => {
      //     styleNode.remove();
      //   });
      // }
    // }
  }


}
