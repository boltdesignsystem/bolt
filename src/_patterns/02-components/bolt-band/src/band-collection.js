import { define, props, withComponent } from 'skatejs';
import { eventHandler, withPreact } from '@bolt/core'; // Latest v. broken so using local version for now
import { h, render } from 'preact';
// import { BoltBand } from './band';

// console.log('video band');




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
      // customElements.whenDefined('howto-accordion-panel'),
    ])
      .then(_ => {
        // Acquire all headings inside the element that need to be set up.
        const bands = this._allBands();

        console.log('all bands');
        console.log(bands);

        // Give all headings and panels a unique ID. Set up `aria-controls` and
        // `aria-labelledby` attributes on headings and panels using those IDs.
        // bands.forEach(band => {
        //   // All buttons inside the `HowtoAccordionHeadings` are made
        //   // unfocusable here. Only the first heading will be made focusable
        //   // afterwards. This is necessary to implement roving tabindex.
        //   heading.setAttribute('tabindex', -1);
        //   const panel = this._panelForHeading(heading);

        //   // Make headings and panels reference each other
        //   // with the `aria-labelledby` and `aria-controls` attributes.
        //   heading.setAttribute('aria-controls', panel.id);
        //   panel.setAttribute('aria-labelledby', heading.id);
        // });
        // // Make the first heading focusable.
        // headings[0].setAttribute('tabindex', 0);

        // Set all the panels to the collapsed state to have a well-defined
        // initial state.

        // Check if any of the headings have been marked as
        // expanded using the `expanded` attribute. If so, all the associated
        // panels get expanded as well.
        bands
          .forEach(band => {
            // const panel = this._panelForHeading(heading);
            if (!band.expanded) {
              // this._collapseHeading(heading);
              this._collapseBand(band);
            } else {
              this._expandBand(band);
            }
          });
      });
  }


  /**
     * `_allHeadings` returns all the headings in the accordion.
     */
  _allBands() {
    return Array.from(this.querySelectorAll('bolt-band'));
  }

  /**
   * `_expandBand` puts the given band in the expanded state.
   */
    _expandBand(band) {
      band.expanded = true;
    }

    /**
    * `_collapseBand` puts the given band in the collapsed state.
    */
    _collapseBand(band) {
      band.expanded = false;
    }


    /**
     * `_animateBandForWithElement` animates the expansion of a band with a given element, provided
     * there is no other animation running.
     */
    _animateBandForElement(element, expand) {
      // If there’s an animation running, ignore the event.
      if (this.classList.contains('is-animating'))
        return;
      const band = this._bandForElement(element);
      if (expand) {
        console.log('animate in band');
        this._expandBand(band);
        // this._animateIn(band);
      } else {
        this._collapseBand(band);
        // this._animateOut(band)
          // .then(_ => this._collapseBand(band));
      }
    }



    /**
     * `_animateIn` determines the height of the panel and uses that value for
     * an expanding animation.
     */
    _animateIn(band) {
      let initialHeight;
      let expandedHeight;

      console.log(band.initialHeight);

      if (band.initialHeight) {
        initialHeight = band.initialHeight;
      } else {
        initialHeight = band.getBoundingClientRect().height;
      }
      
      if (band.expandedHeight){
        expandedHeight = band.expandedHeight;
      } else {
        expandedHeight = band.initialHeight;
      }

      console.log('initial height ' + initialHeight);
      console.log('expanded height ' + expandedHeight);

      return this._animate(band, initialHeight, expandedHeight);
    }

    /**
    * Same as `_animateIn` but in the other direction.
    */
    _animateOut(band) {
      let initialHeight;
      let expandedHeight;

      if (band.initialHeight) {
        initialHeight = band.initialHeight;
      } else {
        initialHeight = band.getBoundingClientRect().height;
      }

      if (band.expandedHeight) {
        expandedHeight = band.expandedHeight;
      } else {
        expandedHeight = band.initialHeight;
      }

      return this._animate(band, expandedHeight, initialHeight);
    }


  /**
     * `_animate` animates a translation on the Y axis from one offset to
     * another. It takes care of promoting all the elements, making sure they
     * will be painted in the right order during animation and cleans up
     * afterwards.
     */
  _animate(band, startOffset, endOffset) {
    // If start and end are the same there is nothing to do. The reason for
    // explicitly handling this case is that this method waits for an
    // `transitionend` event which won’t fire if there is no animation.
    if (startOffset === endOffset)
      return Promise.resolve();
    // Set the `animating` class on the `<howto-accordion>` element. This
    // discards all further `change` events until the animation is done.
    this.classList.add('is-animating');
    // Turn the list of children into a proper array with all the helper
    // functions defined on it.
    const children = Array.from(this.children);
    // Find the index of the band that is being animated.
    const idx = children.indexOf(band);
    // Only that band and all the headings and bands _after_ the given band
    // need to be animated.
    const animatedChildren = children.slice(idx);

    // Some children will be translated
    // beyond the top of the element and might end up being visible above the
    // element. Switch the `<howto-accordion>` element to `overflow: hidden`
    // to prevent that.
    this.style.overflow = 'hidden';
    // Switch all children to `position: relative` so that the element
    // has full control over paint order using `z-index`.
    children.forEach(child => {
      child.style.position = 'relative';
      // All children _before_ the animated ones need to be painted _over_
      // all the animated children. Therefore, set all children to
      // `z-index: 2` and set all the animated children to `z-index: 1` next.
      child.style.zIndex = 2;
    });

    // Set `z-index: 1` on all animated children translate them to the
    // start position. Because this function uses a CSS transition we don’t
    // need to use `will-change`.
    animatedChildren.forEach(child => {
      child.style.position = 'relative';
      child.style.zIndex = 1;
      child.style.transform = `translateY(${startOffset}px)`;
    });

    // Wait two frames for all the styles to take effect.
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        // Set up the CSS transition on all the children and set them to
        // their end position.
        animatedChildren.forEach(child => {
          child.style.transform = `translateY(${endOffset}px)`;
          child.classList.add('is-animating');
        });
        // Wait for the transition to end.
        return transitionEndPromise(band);
      })
      .then(_ => {
        // Clean up all the temporary styles
        animatedChildren.forEach(child => {
          child.style.transform = '';
          child.classList.remove('is-animating');
        });
        children.forEach(child => {
          child.style.position = '';
          child.style.zIndex = '';
        });
        this.style.overflow = '';
        // this.style.height = endOffset + 'px';
        this.classList.remove('is-animating');
      });
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
     * `expandHeight` animates the expansion of a bolt-band, provided
     * there are no other animations running.
     */
  expandHeight(element, expand) {
    // If there’s an animation running, ignore the event.
    if (this.classList.contains('is-animating'))
      return;
    const band = this._bandForElement(element);

    if (expand) {
      this._expandBand(band);
      // this._animateIn(band);
    } else {
      this._collapseBand(band);
      // this._animateOut(band)
      //   .then(_ => this._collapseBand(band));
    }
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
    console.log('band collection connected callback');

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
