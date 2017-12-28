import Drift from 'drift-zoom';
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


/* From Modernizr */
function whichAnimationEvent() {
  let t;
  let el = document.createElement('fakeelement');

  const animations = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  }

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}
const animationEvent = whichAnimationEvent();


class BoltDeviceViewer extends withComponent(withPreact()) {
  static props = {
    // name: props.string,
  }

  renderCallback({ props }) {
    const classes = css(
      'c-bolt-image-magnifier'
    );

    return (
      <div className={classes}>
        <slot />
      </div>
    )
  }

  connectedCallback() {


    // HIDE
    // Shim Shadow DOM styles. This needs to be run in `connectedCallback()`
    // because if you shim Custom Properties (CSS variables) the element
    // will need access to its parent node.
    // ShadyCSS.styleElement(this);
    // // /HIDE

    // if (!this.hasAttribute('role'))
    //   this.setAttribute('role', 'checkbox');
    // if (!this.hasAttribute('tabindex'))
    //   this.setAttribute('tabindex', 0);

    // // A user may set a property on an _instance_ of an element,
    // // before its prototype has been connected to this class.
    // // The `_upgradeProperty()` method will check for any instance properties
    // // and run them through the proper class setters.
    // // See the [lazy properites](/web/fundamentals/architecture/building-components/best-practices#lazy-properties)
    // // section for more details.
    // this._upgradeProperty('checked');
    // this._upgradeProperty('disabled');

    var drift = new Drift(this.querySelector('.js-bolt-device-viewer-screen'), {
      // inlineOffsetX: -15,
      // inlineOffsetY: -10,
      containInline: false,
      inlinePane: true,
      // Prefix for generated element class names (e.g. `my-ns` will
      // result in classes such as `my-ns-pane`. Default `drift-`
      // prefixed classes will always be added as well.
      namespace: 'c-bolt',
      // Whether the ZoomPane should show whitespace when near the edges.
      showWhitespaceAtEdges: false,
      // injectBaseStyles: false,
      // Whether the inline ZoomPane should stay inside
      // the bounds of its image.
      // containInline: false,
      // How much to offset the ZoomPane from the
      // interaction point when inline.
      // inlineOffsetX: 0,
      // A DOM element to append the inline ZoomPane to.
      // inlineContainer: this,
      // boundingBoxContainer: this,
      // Which trigger attribute to pull the ZoomPane image source from.
      sourceAttribute: 'data-zoom',
      // How much to magnify the trigger by in the ZoomPane.
      // (e.g., `zoomFactor: 3` will result in a 900 px wide ZoomPane image
      // if the trigger is displayed at 300 px wide)
      // zoomFactor: 2,
      // // A DOM element to append the non-inline ZoomPane to.
      // // Required if `inlinePane !== true`.
      // paneContainer: document.body,
      // // When to switch to an inline ZoomPane. This can be a boolean or
      // // an integer. If `true`, the ZoomPane will always be inline,
      // // if `false`, it will switch to inline when `windowWidth <= inlinePane`
      // // inlinePane: 375,
      // inlinePane: true,
      // // If `true`, touch events will trigger the zoom, like mouse events.
      // handleTouch: true,
      // // If present (and a function), this will be called
      // // whenever the ZoomPane is shown.
      // onShow: this._onShowing(),
      // // // If present (and a function), this will be called
      // // // whenever the ZoomPane is hidden.
      // onHide: this._onHiding(),
      // // Add base styles to the page. See the "Theming"
      // // section of README.md for more information.
      // injectBaseStyles: true,
      // // An optional number that determines how long to wait before
      // // showing the ZoomPane because of a `mouseenter` event.
      // hoverDelay: 0,
      // // An optional number that determines how long to wait before
      // // showing the ZoomPane because of a `touchstart` event.
      // // It's unlikely that you would want to use this option, since
      // // "tap and hold" is much more intentional than a hover event.
      // touchDelay: 0,
      // // If true, a bounding box will show the area currently being previewed
      // // during mouse hover
      // hoverBoundingBox: false,
      // // If true, a bounding box will show the area currently being previewed
      // // during touch events
      // touchBoundingBox: false,
    });



    // drift.setZoomImageURL(driftZoomImageUrl);
  }

}

customElements.define('bolt-device-viewer', BoltDeviceViewer);




class BoltDeviceScreen extends withComponent(withPreact()) {
  static props = {
  }


  /**
     * `_screenElem` returns the screen element inside the device viewer
     */
  _screenElem() {
    return this;
  }

  /**
     * `_iconElem` returns the bolt icon element inside the device viewer
     */
  _iconElem() {
    return this.querySelector('bolt-icon');
  }


  _mouseEnter(event) {
    const screenElem = this._screenElem();
    const iconElem = this._iconElem();

    screenElem.classList.add('is-mouse-entering');
    screenElem.classList.remove('is-mouse-leaving');
  }

  _mouseLeave(event) {
    const screenElem = this._screenElem();
    const iconElem = this._iconElem();

    screenElem.classList.remove('is-mouse-entering');
    screenElem.classList.add('is-mouse-leaving');

    animationEvent && iconElem.addEventListener(animationEvent, animationLeaveFunction);

    function animationLeaveFunction(event) {
      setTimeout(function(){
        iconElem.removeEventListener(animationEvent, animationLeaveFunction);
        screenElem.classList.remove('is-mouse-leaving');
      }, 1000);
    }
  }


  renderCallback() {
    return (
      <slot />
    )
  }

  connectedCallback() {
    const driftZoomImageUrl = this.querySelector('img').getAttribute('data-zoom');
    this.setAttribute('data-zoom', driftZoomImageUrl);
    this.addEventListener('mouseenter', this._mouseEnter);
    this.addEventListener('mouseleave', this._mouseLeave);
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
}

customElements.define('bolt-device-screen', BoltDeviceScreen);
