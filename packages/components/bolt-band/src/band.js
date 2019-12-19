import { BoltElement, customElement, html } from '@bolt/element';

@customElement('bolt-band')
class BoltBand extends BoltElement {
  static get properties() {
    return {
      expanded: Boolean,
      expandedHeight: {
        type: String,
        attribute: 'expanded-height',
      },
      initialHeight: {
        type: String,
        attribute: 'initial-height',
      },
    };
  }

  firstUpdated() {
    // super.connectedCallback && super.connectedCallback();
    this.state = {
      ready: false,
    };

    this.innerBand = this.querySelector('.c-bolt-band');

    // Clone the shadow DOM template.
    if (this.state.ready === false) {
      this.state.ready = true;
      this.classList.add('is-ready');
    }

    // @todo: `isBackgroundVideo` will be removed with Bolt v3.0
    if (this.querySelector('bolt-video[is-background-video]')) {
      if (this.expandedHeight === null) {
        this.expandedHeight = '56.25vh';
      }

      if (this.expanded) {
        this.expand();
      } else {
        this.collapse();
      }
    }

    // Shim Shadow DOM styles. This needs to be run in `connecting()`
    // because if you shim Custom Properties (CSS variables) the element
    // will need access to its parent node.

    this.addEventListener('playing', this.playHandler);
    this.addEventListener('pause', this.pauseHandler);
    this.addEventListener('ended', this.finishedHandler);
    this.addEventListener('close', this.collapse);

    this.addEventListener(
      'videoExpandedHeightSet',
      this._adjustExpandedHeightToMatchVideo,
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener(
      'videoExpandedHeightSet',
      this._adjustExpandedHeightToMatchVideo,
    );
  }

  /**
   * `attributeChangedCallback` processes changes to the `expanded` attribute.
   */
  updated(changedProperties) {
    super.updated && super.updated(changedProperties);

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
    // @todo: `isBackgroundVideo` will be removed with Bolt v3.0
    if (event.detail.isBackgroundVideo && this.expanded === false) {
      this.expand();

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { isExpandedNow: this.expanded },
          bubbles: true,
        }),
      );
    }
  }

  collapse() {
    const endingHeight = this.startingHeight ? this.startingHeight : '0px';
    const elem = this;

    this.lastRAF && cancelAnimationFrame(this.lastRAF);
    this.lastRAF = requestAnimationFrame(() => {
      this.lastRAF = requestAnimationFrame(() => {
        this.innerBand.style.minHeight = `${endingHeight}px`;
        this.lastRAF = null;
      });
    });

    this.expanded = false;

    // clean up inline CSS after waiting just a bit
    setTimeout(function() {
      elem.innerBand.removeAttribute('style', 'minHeight');
    }, 100);
  }

  expand() {
    this.lastRAF && cancelAnimationFrame(this.lastRAF);
    this.lastRAF = requestAnimationFrame(() => {
      this.lastRAF = requestAnimationFrame(() => {
        this.innerBand.style.minHeight = this.expandedHeight;
        this.lastRAF = null;
      });
    });

    this.expanded = true;
  }

  // Max Height of a video child element has been set so use that to determine how tall a band should get.
  _adjustExpandedHeightToMatchVideo(event) {
    if (event.detail.expandedHeight) {
      let videoHeight = event.detail.expandedHeight;
      const mq = window.matchMedia('(max-width: 600px)');

      // Add to the height to make space for the 'close' button at the bottom
      // if we are at the smallest breakpoint.
      if (mq.matches) {
        // expandedHeight apparently needs to be a string (on both the incoming
        // and outgoing ends).  In order to modify it, we turn it into a number, then
        // back to a string.  Not
        videoHeight = Number(videoHeight);
        videoHeight = String(videoHeight);
      }
      this.expandedHeight = videoHeight;

      if (this.expanded) {
        this.lastRAF && cancelAnimationFrame(this.lastRAF);
        this.lastRAF = requestAnimationFrame(() => {
          this.lastRAF = requestAnimationFrame(() => {
            this.innerBand.style.minHeight = this.expandedHeight;
            this.lastRAF = null;
          });
        });
      }
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
    } else {
      this.removeAttribute('expandedHeight');
    }
  }

  render() {
    return html`
      ${this.slotify('default')}
    `;
  }
}

export { BoltBand };
