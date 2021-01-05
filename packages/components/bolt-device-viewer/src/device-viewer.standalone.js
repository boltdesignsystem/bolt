import { BoltElement, customElement, html } from '@bolt/element';
import { passiveSupported } from '@bolt/core-v3.x/utils';
import Drift from 'drift-zoom';
import classNames from 'classnames/bind';
import styles from './device-viewer.scss';
import schema from '../device-viewer.schema';

let cx = classNames.bind(styles);

/* From Modernizr */
function whichAnimationEvent() {
  let t;
  let el = document.createElement('fakeelement');

  const animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

const animationEvent = whichAnimationEvent();

/**
 * BoltDeviceViewer
 */
@customElement('bolt-device-viewer')
class BoltDeviceViewer extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  render() {
    const classes = cx('c-bolt-image-magnifier');

    return html`
      <div class="${classes}">${this.slotify('default')}</div>
    `;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    if (this.querySelector('bolt-image-zoom')) {
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

/**
 * BoltImageZoom
 */
@customElement('bolt-image-zoom')
class BoltImageZoom extends BoltElement {
  static get properties() {
    return {
      mangify: {
        type: Boolean,
      },
    };
  }

  // `screenElem` returns the screen element inside the device viewer
  screenElem() {
    return this;
  }

  // `iconElem` returns the bolt icon element inside the device viewer
  iconElem() {
    if (this.querySelector('bolt-icon')) {
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

    animationEvent &&
      iconElem.addEventListener(
        animationEvent,
        animationLeaveFunction,
        passiveSupported ? { passive: false } : false,
      );

    function animationLeaveFunction() {
      setTimeout(function() {
        iconElem.removeEventListener(animationEvent, animationLeaveFunction);
        screenElem.classList.remove('is-mouse-leaving');
      }, 1000);
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    let driftZoomImageUrl;
    if (this.querySelector('img')) {
      driftZoomImageUrl = this.querySelector('img').getAttribute('data-zoom');
    } else if (this.querySelector('bolt-image')) {
      driftZoomImageUrl = this.querySelector('bolt-image').getAttribute('src');
    }
    this.setAttribute('data-zoom', driftZoomImageUrl);
    this.addEventListener(
      'mouseenter',
      this._mouseEnter,
      passiveSupported ? { passive: false } : false,
    );
    this.addEventListener(
      'mouseleave',
      this._mouseLeave,
      passiveSupported ? { passive: false } : false,
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._mouseEnter);
    this.removeEventListener('mouseleave', this._mouseLeave);
  }

  render() {
    return html`
      ${this.slotify('default')}
    `;
  }
}

export { BoltDeviceViewer, BoltImageZoom };
