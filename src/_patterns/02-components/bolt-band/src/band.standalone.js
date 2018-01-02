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




export class BoltBand extends withComponent(withPreact()) {
  static is = 'bolt-band';

  static get observedAttributes() {
    return ['expanded', 'expandedHeight', 'initialHeight'];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    // Clone the shadow DOM template.
    this.shadowRoot.appendChild(
      bandTemplate.content.cloneNode(true)
    );

    this.addEventListener('expandedHeightSet', this._adjustExpandedHeightToMatchChildren);
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
  }


/**
  * `attributeChangedCallback` processes changes to the `expanded` attribute.
  */
  attributeChangedCallback(name) {
    
    if (this.expanded && this.expandedHeight){
      this.style.maxHeight = this.expandedHeight + 'px';
    }

    if (this.expanded) {
      this.classList.add('is-expanded');
    } else {
      this.classList.remove('is-expanded');
    }
    
    // `expanded` is a boolean attribute it is either set or not set. The
    // actual value is irrelevant.
    const value = this.hasAttribute('expanded');
    this.setAttribute('aria-expanded', value);
  }

 

  playHandler(event) {
    if (event.detail.isBackgroundVideo){
      this.initialHeight = this.getBoundingClientRect().height;

      this.expanded = true;

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { isExpandedNow: this.expanded },
          bubbles: true,
        })
      );
    }
  }

  pauseHandler(event) {
    if (event.detail.isBackgroundVideo) {
      // console.log('bg video now paused!');
    }
  }

  finishedHandler(event) {
    if (event.detail.isBackgroundVideo) {
      // console.log('bg video now finished!');
      
      // this.expanded = false;
      // this.dispatchEvent(
      //   new CustomEvent('change', {
      //     detail: { isExpandedNow: this.expanded },
      //     bubbles: true,
      //   })
      // );
    }
  }

  // Max Height of a child element has been set so use that to determine how tall a band should get.
  _adjustExpandedHeightToMatchChildren(event){
    if (event.detail.expandedHeight) {
      this.expandedHeight = event.detail.expandedHeight;
    }
  }


  get expanded() {
    return this.hasAttribute('expanded');
  }

  set expanded(value) {
    value = Boolean(value);
    if (value)
      this.setAttribute('expanded', '');
    else
      this.removeAttribute('expanded');
  }


  get initialHeight() {
    return this.getAttribute('initialHeight');
  }
  
  set initialHeight(value) {
    if (value)
      this.setAttribute('initialHeight', value);
    else
      this.removeAttribute('initialHeight');
  }


  get expandedHeight() {
    return this.getAttribute('expandedHeight');
  }
 
  set expandedHeight(value) {
    if (value)
      this.setAttribute('expandedHeight', value);
    else
      this.removeAttribute('expandedHeight');
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

customElements.define(BoltBand.is, BoltBand);
