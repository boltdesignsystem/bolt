/* eslint-env browser */
/* globals videojs, bc */

import { define, props, withComponent } from 'skatejs';
import { css, withPreact } from '@bolt/core'; // Latest v. broken so using local version for now
import { h, render } from 'preact';
import styles from './ratio.scss';
// import { value } from 'yocss';

@define
export class BoltRatio extends withComponent(withPreact()) {
  static is = 'bolt-ratio';

  static props = {
    aspectRatioHeight: props.number,
    aspectRatioWidth: props.number
  }

  constructor(){
    super();
    this.supportsCSSVars = window.CSS.supports('--fake-var', 0);
  }

  // get renderRoot() {
  //   return this;
  // }

  // Called when props have been set regardless of if they've changed.
  updating(props) {
    this._computeRatio();
  }

  // Called to check whether or not the component should call
  // updated(), much like React's shouldComponentUpdate().
  // shouldUpdate(props, state) {
  //   return true;
  // }

  // // Called if shouldUpdate returned true.
  // updated() {
    
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
    } else {
      this.style.paddingTop = (100 * h / w) + "%";
    }
  }

  connectedCallback() {
    this._computeRatio();
  }

  render() {
    const classes = css(
      'o-bolt-ratio__content'
    );

    return (
      // <div className={classes}>
        <slot>
          <style>{styles[0][1]}</style>

        </slot>
      // </div>
    )
  }
}