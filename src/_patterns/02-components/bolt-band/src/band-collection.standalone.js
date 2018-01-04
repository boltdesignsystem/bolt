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


/**
   * Cloning contents from a &lt;template&gt; element is more performant
   * than using innerHTML because it avoids addtional HTML parse costs.
   */
const bandCollectionTemplate = document.createElement('template');
bandCollectionTemplate.innerHTML = `
    <slot></slot>
  `;

// HIDE
// ShadyCSS will rename classes as needed to ensure style scoping.
ShadyCSS.prepareTemplate(bandCollectionTemplate, 'bolt-band-collection');
  // /HIDE


@define
export class BoltBandCollection extends withComponent(withPreact()) {
  static is = 'bolt-band-collection';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(bandCollectionTemplate.content.cloneNode(true));

    Promise.all([
      customElements.whenDefined('bolt-band')
    ])
    .then(_ => {
      // Acquire all headings inside the element that need to be set up.
      const bands = this._allBands();
      bands
        .forEach(band => {
        });
    });
  }


  /**
     * `_allBands` returns all the band children in the band-collection.
     */
  _allBands() {
    return Array.from(this.querySelectorAll('bolt-band'));
  }


/**
 * `_animateBandForWithElement` animates the expansion of a band with a given
  * element, provided there is no other animation running.
  */
    _animateBandForElement(element, expand) {
      // If there’s an animation running, ignore the event.
      if (this.classList.contains('is-animating'))
        return;
      const band = this._bandForElement(element);
      if (expand) {
        band.expand();
      } else {
        band.collapse();
      }
    }


  /**
     * `_panelForElement` returns the band for the given element
     */
  _bandForElement(element) {
    // const next = heading.nextElementSibling;
    // if (next.tagName.toLowerCase() !== 'howto-accordion-panel') {
    //   console.error('Sibling element to a heading need to be a panel.');
    //   return;
    // }
    return element.closest('bolt-band');
  }


  /**
    * `_onChange` handles the `change` event. The event’s
    * target is the heading that has been instructed to expand by click,
    * keyboard input.
    */
  _onChange(event) {
    this._animateBandForElement(event.target, event.detail.isExpandedNow);
  }



  connectedCallback() {
    // HIDE
    // Shim Shadow DOM styles. This needs to be run in `connectedCallback()`
    // because if you shim Custom Properties (CSS variables) the element
    // will need access to its parent node.
    ShadyCSS.styleElement(this);
      // /HIDE

    this.addEventListener('change', this._onChange);
  }

  /**
    * `disconnectedCallback` removes all the event listeners that
    * `connectedCallback` added.
    */
  disconnectedCallback() {
    this.removeEventListener('change', this._onChange);
  }

  render() {
    return (
      <slot />
    )
  }
}



// These functions help make animations easier.
// Read https://dassur.ma/things/raf-promise/ for more details.
function transitionEndPromise(element) {
  return new Promise(resolve => {
    element.addEventListener('transitionend', function f() {
      element.removeEventListener('transitionend', f);
      resolve();
    });
  });
}

function requestAnimationFramePromise() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}
