import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  hasNativeShadowDomSupport
} from '@bolt/core';




// To avoid invoking the parser with `.innerHTML` for every new instance, a
// template for the contents of the ShadowDOM is is shared by all
// `<bolt-band>` instances.
//

// ShadyCSS will rename classes as needed to ensure style scoping.




@define
export class BoltBand extends withComponent(withPreact()) {
  static is = 'bolt-band';

  static get observedAttributes() {
    return ['expanded', 'expandedHeight', 'initialHeight'];
  }

  constructor(element) {
    super(element);
    this.useShadow = hasNativeShadowDomSupport;

    this.state = {
      ready: false
    }

    // Clone the shadow DOM template.

    if (this.state.ready === false) {
      this.state.ready = true;
      this.classList.add('is-ready');
    }

    if (this.expandedHeight === null){
      this.expandedHeight = '56.25vh';
    }

    if (this.expanded) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
    * `connectedCallback()` sets up the role, event handler and initial state.
    */
  connectedCallback() {
    // Shim Shadow DOM styles. This needs to be run in `connectedCallback()`
    // because if you shim Custom Properties (CSS variables) the element
    // will need access to its parent node.

    this.addEventListener('playing', this.playHandler);
    this.addEventListener('pause', this.pauseHandler);
    this.addEventListener('ended', this.finishedHandler);
    this.addEventListener('close', this.collapse);

    this.addEventListener('videoExpandedHeightSet', this._adjustExpandedHeightToMatchVideo);
  }

  disconnectedCallback() {
    this.removeEventListener('videoExpandedHeightSet', this._adjustExpandedHeightToMatchVideo);
  }

  /**
    * `attributeChangedCallback` processes changes to the `expanded` attribute.
    */
  attributeChangedCallback(name) {
    if (this.state.ready === false) {
      this.state.ready = true;
      this.classList.add('is-ready');
    }

    // `expanded` is a boolean attribute it is either set or not set. The
    // actual value is irrelevant.
    const value = this.hasAttribute('expanded');
    this.setAttribute('aria-expanded', value);
  }

  playHandler(event) {
    if (event.detail.isBackgroundVideo && this.expanded === false) {
      this.expand();

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { isExpandedNow: this.expanded },
          bubbles: true,
        })
      );
    }
  }


  collapse() {
    const startingHeight = this.getBoundingClientRect().height;
    const endingHeight = '0px';

    requestAnimationFrame(() => {
      this.style.minHeight = `${startingHeight}px`;
      this.style.transition = 'height 0s, max-height 0s, min-height 0s';

      requestAnimationFrame(() => {
        // In order to get the animation to play, we'll need to wait for
        // the 'invert' animation frame to finish, so that its inverted
        // position has propagated to the DOM.
        //
        // Then, we just remove the transform, reverting it to its natural
        // state, and apply a transition so it does so smoothly.
        this.style.transition = 'height 0.4s ease, max-height 0.4s ease, min-height 0.4s ease';
        this.style.minHeight = endingHeight;
      });
    });

    this.expanded = false;
  }

  expand() {
    const startingHeight = this.getBoundingClientRect().height;
    const endingHeight = this.expandedHeight;

    requestAnimationFrame(() => {
      this.style.minHeight = `${startingHeight}px`;
      this.style.transition = 'all 0s';

      requestAnimationFrame(() => {
        // In order to get the animation to play, we'll need to wait for
        // the 'invert' animation frame to finish, so that its inverted
        // position has propagated to the DOM.
        //
        // Then, we just remove the transform, reverting it to its natural
        // state, and apply a transition so it does so smoothly.
        this.style.transition = 'height 0.4s ease, max-height 0.4s ease, min-height 0.4s ease';
        this.style.minHeight = this.expandedHeight;
      });
    });

    this.expanded = true;
  }


  // Max Height of a video child element has been set so use that to determine how tall a band should get.
  _adjustExpandedHeightToMatchVideo(event) {
    if (event.detail.expandedHeight) {
      let videoHeight = event.detail.expandedHeight;
      const mq = window.matchMedia( "(max-width: 600px)" );

      // Add to the height to make space for the 'close' button at the bottom
      // if we are at the smallest breakpoint.
      if (mq.matches) {
        // expandedHeight apparently needs to be a string (on both the incoming
        // and outgoing ends).  In order to modify it, we turn it into a number, then
        // back to a string.  Not
        videoHeight = Number(videoHeight) + 40;
        videoHeight = String(videoHeight)
      }
      this.expandedHeight = videoHeight;
    }
  }


  get expanded() {
    return this.hasAttribute('expanded');
  }

  set expanded(value) {
    if (value) {
      this.setAttribute('expanded', '');
      this.classList.add('is-expanded');
      this.classList.remove('is-collapsed');
    } else {
      this.removeAttribute('expanded');
      this.classList.add('is-collapsed');
      this.classList.remove('is-expanded');
    }
  }


  get expandedHeight() {
    return this.getAttribute('expandedHeight');
  }

  set expandedHeight(value) {
    if (value) {

      // @TODO: come up with a better way to validate CSS unit possibilities here
      // if (value.includes('px') ||
      //   value.includes('vh') ||
      //   value.includes('vw')) {
      //   this.setAttribute('expandedHeight', value);
      // }
      // console.log(value.indexOf('vh'));

      if (value.indexOf('vh') > -1 || value.indexOf('px') > -1) {
        this.setAttribute('expandedHeight', value);
      } else {
        this.setAttribute('expandedHeight', value + 'px');
      }
    }
    else {
      this.removeAttribute('expandedHeight');
    }
  }

  renderer(root, html) {
    if (this.useShadow) {
      super.renderer(root, html);
    } else {
      root.innerHTML = this.innerHTML;
    }
  }

  render() {
    if (this.useShadow){
      return (
        <slot />
      )
    }
  }
}
