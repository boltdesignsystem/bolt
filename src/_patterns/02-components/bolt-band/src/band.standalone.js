import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact
} from '@bolt/core';




// To avoid invoking the parser with `.innerHTML` for every new instance, a
// template for the contents of the ShadowDOM is is shared by all
// `<bolt-band>` instances.
//
const bandTemplate = document.createElement('template');
bandTemplate.innerHTML = `
    <style>
      // :host {
      //   contain: content;
      // }
    </style>
    <slot></slot>
  `;

// ShadyCSS will rename classes as needed to ensure style scoping.
ShadyCSS.prepareTemplate(bandTemplate, 'bolt-band');




@define
export class BoltBand extends withComponent(withPreact()) {
  static is = 'bolt-band';

  static get observedAttributes() {
    return ['expanded', 'expandedHeight', 'initialHeight'];
  }

  static props = {
    isCollapsable: props.boolean
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });

    this.state = {
      ready: false
    }

    // Clone the shadow DOM template.
    this.shadowRoot.appendChild(
      bandTemplate.content.cloneNode(true)
    );

    this.addEventListener('expandedHeightSet', this._adjustExpandedHeightToMatchChildren);
    this._onWindowResize = this._onWindowResize.bind(this);

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
    ShadyCSS.styleElement(this);

    this.addEventListener('playing', this.playHandler);
    this.addEventListener('pause', this.pauseHandler);
    this.addEventListener('ended', this.finishedHandler);
    this.addEventListener('close', this.collapse);

    if (this.isCollapsable){
      window.addEventListener('optimizedResize', this._onWindowResize);
    }
  }

  disconnectedCallback() {
    if (this.isCollapsable) {
      window.removeEventListener('optimizedResize', this._onWindowResize);
    }
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

  _onWindowResize() {
    if (!this.expanded) {
      this.updateInitialHeight();
    }
  }


  playHandler(event) {
    if (event.detail.isBackgroundVideo) {

      this.expand();
      // this.expanded = true;

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { isExpandedNow: this.expanded },
          bubbles: true,
        })
      );
    }
  }


  collapse() {
    const elem = this;

    if (this.state.ready){
      this.style.height = this.expandedHeight + 'px';

      this.style.height = this.initialHeight + 'px';

      setTimeout(function () {
        elem.style.height = 'auto'; // remove "height" from the element's inline styles, so it can return to its initial value
      }, 500);
    }

    this.expanded = false; // mark the section as "currently collapsed"
  }


  expand() {
    if (this.state.ready) {
      this.style.height = this.initialHeight + 'px';

      this.addEventListener('transitionend', function f() {
        this.style.height = this.expandedHeight + 'px';
        this.removeEventListener('transitionend', f);
      });
    }

    this.expanded = true; // mark the section as "currently not collapsed"
  }


  // Max Height of a child element has been set so use that to determine how tall a band should get.
  _adjustExpandedHeightToMatchChildren(event) {
    this.updateInitialHeight();

    this.isCollapsable = true;
    window.addEventListener('optimizedResize', this._onWindowResize);

    if (event.detail.expandedHeight) {
      this.expandedHeight = event.detail.expandedHeight;
    }

    if (this.state.ready === false) {
      this.state.ready = true;
      this.classList.add('is-ready');
    }
  }


  get expanded() {
    return this.hasAttribute('expanded');
  }

  set expanded(value) {
    value = Boolean(value);
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


  get initialHeight() {
    return this.getAttribute('initialHeight');
  }

  set initialHeight(value) {
    if (value) {
      this.setAttribute('initialHeight', value);
    } else {
      this.removeAttribute('initialHeight');
    }
  }

  updateInitialHeight() {
    this.initialHeight = this.getBoundingClientRect().height;
  }

  get expandedHeight() {
    return this.getAttribute('expandedHeight');
  }

  set expandedHeight(value) {
    if (value) {
      this.setAttribute('expandedHeight', value);
    }
    else {
      this.removeAttribute('expandedHeight');
    }
  }

  // get renderRoot() {
  //   return this;
  // }

  render() {
    return (
      <slot />
    )
  }
}

// Create a custom 'optimizedResize' event that works just like window.resize but is more performant because it
// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
export function optimizedResize(){
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
  // such as scroll.
  throttle('resize', 'optimizedResize');
}
