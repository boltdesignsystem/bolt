import Drift from 'drift-zoom';
import {
  h,
  render,
  define,
  props,
  BoltComponent,
  css,
  spacingSizes,
  hasNativeShadowDomSupport,
  passiveSupported,
} from '@bolt/core';


/* From Modernizr */
function whichAnimationEvent() {
  let t;
  let el = document.createElement('fakeelement');

  const animations = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
  }

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}
const animationEvent = whichAnimationEvent();


@define
class BoltDeviceViewer extends BoltComponent() {
  static is = 'bolt-device-viewer';

  static props = {
    // name: props.string,
  }

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render({ props }) {
    const classes = css(
      'c-bolt-image-magnifier',
    );

    return this.html`
      <div className={classes}>
        ${this.slot('default')}
      </div>
    `;
  }

  connecting() {
    if (this.querySelector('bolt-image-zoom')){
      const drift = new Drift(this.querySelector('bolt-image-zoom'), {
        containInline: false,
        inlinePane: true,
        namespace: 'c-bolt',
        showWhitespaceAtEdges: false,
        sourceAttribute: 'data-zoom',
      });
    }
  }
}




@define
class BoltImageZoom extends BoltComponent() {
  static is = 'bolt-image-zoom';

  static props = {
    mangify: props.boolean,
  }

  constructor(self) {
    self = super(self);
    return self;
  }

  /**
     * `screenElem` returns the screen element inside the device viewer
     */
  screenElem() {
    return this;
  }

  /**
     * `iconElem` returns the bolt icon element inside the device viewer
     */
  iconElem() {
    if (this.querySelector('bolt-icon')){
      return this.querySelector('bolt-icon');
    } else {
      return false;
    }
  }


  _mouseEnter(event) {
    const screenElem = this.screenElem();

    screenElem.classList.add('is-mouse-entering');
    screenElem.classList.remove('is-mouse-leaving');
  }

  _mouseLeave(event) {
    const screenElem = this.screenElem();
    const iconElem = this.iconElem();

    screenElem.classList.remove('is-mouse-entering');
    screenElem.classList.add('is-mouse-leaving');

    animationEvent && iconElem.addEventListener(animationEvent, animationLeaveFunction, passiveSupported ? { passive: false } : false);

    function animationLeaveFunction() {
      setTimeout(function () {
        iconElem.removeEventListener(animationEvent, animationLeaveFunction);
        screenElem.classList.remove('is-mouse-leaving');
      }, 1000);
    }
  }



  connecting() {
    const driftZoomImageUrl = this.querySelector('img').getAttribute('data-zoom');
    this.setAttribute('data-zoom', driftZoomImageUrl);
    this.addEventListener('mouseenter', this._mouseEnter, passiveSupported ? { passive: false } : false);
    this.addEventListener('mouseleave', this._mouseLeave, passiveSupported ? { passive: false } : false);
  }

  /**
     * `disconnectedCallback()` fires when the element is removed from the DOM.
     * It's a good place to do clean up work like releasing references and
     * removing event listeners.
     */
  disconnectedCallback() {
    this.removeEventListener('mouseenter', this._mouseEnter);
    this.removeEventListener('mouseleave', this._mouseLeave);
  }

  render() {
    return this.html`
      ${ this.slot('default') }
    `;
  }
}
