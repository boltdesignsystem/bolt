import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes
} from '@bolt/core';


import styles from './ratio.scss';

export class BoltRatio extends withComponent(withPreact()) {
  static is = 'bolt-ratio';

  static props = {
    aspectRatioHeight: props.number,
    aspectRatioWidth: props.number
  }

  constructor(){
    super();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    this.shadyTemplate = document.createElement('template');
    this.shadyPrepared = false;
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
    this.update();
    this._computeRatio();
  }

  // Called when props have been set regardless of if they've changed. - recalculates ratio if props updated
  updating(props) {
    this._computeRatio();
  }

  // Render out component via Preact
  render() {
    const classes = css(
      'o-bolt-ratio__inner'
    );

    return (
      <div className={classes}>
        <style>{styles[0][1]}</style>
        <slot />
      </div>
    )
  }

  /** Idea for wiring up ShadyCSS + Preact inspired by https://github.com/daKmoR/lit-html-demos/blob/master/demo/wc02.html **/
  _render(what, where) {
    this.render(what, where);

    if (typeof ShadyCSS === 'object') {
      if (this.shadyPrepared === false) {
        this.shadyTemplate.innerHTML = this.shadowRoot.innerHTML;
        ShadyCSS.prepareTemplate(this.shadyTemplate, this.localName);
        this.shadyPrepared = true;
      }
      ShadyCSS.styleElement(this);

    /** @TODO: determine if this logic below is required. This <style> node cleanup was
     *  included in original example (mentioned above) so keeping around for now.
     */
      // if (!ShadyCSS.nativeShadow) {
      //   this.shadowRoot.querySelectorAll('style').forEach((styleNode) => {
      //     styleNode.remove();
      //   });
      // }
    }
  }

  update() {
    this._render(this.render(), this.shadowRoot);
  }

  updateShady() {
    this.shadyPrepared = false;
    this.update();
  }
}

customElements.define(BoltRatio.is, BoltRatio);
