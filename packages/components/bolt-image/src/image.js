import {
  customElement,
  BoltElement,
  html,
  ifDefined,
  unsafeCSS,
} from '@bolt/element';
import classNames from 'classnames/dedupe';
import imageStyles from './image.scss';
import { lazySizes } from './_image-lazy-sizes';
import schemaFile from '../image.schema.yml';
import '@bolt/core-v3.x/utils/optimized-resize';

let cx = classNames.bind(imageStyles);
let passiveIfSupported = false;

// from https://github.com/aFarkas/lazysizes/blob/gh-pages/plugins/respimg/ls.respimg.js#L24
const img = document.createElement('img');
const supportsSrcset = 'sizes' in img && 'srcset' in img;

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        // @ts-ignore
        passiveIfSupported = { passive: true };
      },
    }),
  );
} catch (err) {}

@customElement('bolt-image')
class BoltImage extends BoltElement {
  static get styles() {
    return [unsafeCSS(imageStyles)];
  }

  static get properties() {
    return {
      src: String,
      alt: String,
      noLazy: {
        type: Boolean,
        attribute: 'no-lazy',
        reflect: true,
      },
      srcset: String,
      sizes: String,
      ratio: String,
      maxWidth: {
        type: String,
        attribute: 'max-width',
      },
      placeholderColor: {
        type: String,
        attribute: 'placeholder-color',
      },
      placeholderImage: {
        type: String,
        attribute: 'placeholder-image',
      },
      zoom: {
        type: Boolean,
        reflect: true,
      },
      cover: {
        type: Boolean,
        reflect: true, // fix for bg images not getting the right classes w/ just type: Boolean
      },
      valign: String,
      align: String,
    };
  }

  constructor(self) {
    self = super(self);
    self.onResize = self.onResize.bind(self);
    self.onLazyLoaded = self.onLazyLoaded.bind(self);
    self.initialClasses = [];
    self.valign = 'center';
    self.align = 'center';
    self.placeholderImage =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    self.sizes = 'auto';
    self.ratio = 'auto';
    return self;
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    window.removeEventListener('debouncedResize', this.onResize);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    // IE fires this twice, only let it remove children once
    if (!this._wasInitiallyRendered) {
      const image = this.querySelector('.c-bolt-image__image');
      this.initialClasses = image ? [].slice.call(image.classList) : [];

      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }
  }

  onResize() {
    // auto calculate the sizes prop for:
    // - non-lazy loaded images
    //   - that don't have a sizes prop specifically set OR
    //   - that DO have a sizes prop but it's set to auto
    // - lazy loaded images
    //   - that have already been lazyloaded by lazysizes + size has changed
    //
    if (
      (this.noLazy &&
        (this.getAttribute('sizes') === 'auto' ||
          !this.getAttribute('sizes')) &&
        this.offsetWidth > 0) ||
      (this.isLazyLoaded &&
        this.offsetWidth > 0 &&
        this.sizes.replace('px', '') !== this.offsetWidth)
    ) {
      this.sizes = `${this.offsetWidth}px`;
    }
  }

  // fires when lazysizes has finished lazyloading a particular component.
  onLazyLoaded(e) {
    this.isLazyLoaded = true;

    // delete all element references of this particular image from the lazySizes elements queue
    lazySizes.elements.forEach((item, index) => {
      if (item === this.lazyImage) {
        delete lazySizes.elements[index];
      }
    });

    this.lazyImage.removeEventListener('lazyloaded', this.onLazyLoaded);
    window.addEventListener('debouncedResize', this.onResize);
  }

  firstUpdated(changedProperties) {
    super.firstUpdated && super.firstUpdated(changedProperties);
    // if image should lazyload

    if (!this.noLazy) {
      this.lazyImage =
        this.lazyImage ||
        this.renderRoot.querySelector(`.${lazySizes.cfg.lazyClass}`);

      // if component contains a lazy image that is rendering for the first time, but hasn't yet lazyloaded

      // force unveil lazyloaded SVGs. Workaround to fix lazyloaded SVGs not loading in IE 11
      if (this._isSvg && this.lazyImage && !supportsSrcset) {
        this.sizes = `${this.offsetWidth}px`;
        this.isLazyLoaded = true;
      } else if (this.lazyImage) {
        this.lazyImage.addEventListener('lazyloaded', this.onLazyLoaded);
        // `lazySizes.elements` may be undefined on first load. That's ok - the line below is just to catch JS injected images.

        const self = this; // required so checkIfLazySizesReady has the right scope

        // wait until lazySizes.elements is available
        const waitForLazySizes = setInterval(checkIfLazySizesReady, 50);
        // eslint-disable-next-line no-inner-declarations
        function checkIfLazySizesReady() {
          if (lazySizes.elements) {
            lazySizes.elements && lazySizes.elements.push(self.lazyImage);
            lazySizes.loader.checkElems();
            clearInterval(waitForLazySizes);
          }
        }
      }
    } else {
      // debounce setting the `sizes` prop
      window.addEventListener('debouncedResize', this.onResize);
    }
  }

  render() {
    // negate and rename variables for readability
    const lazyload = !this.noLazy;

    // use ratio by default, still depends upon aspect-ratio being passed in
    let _useRatio = true;
    let ratioW, ratioH;

    if (this.ratio === 'none') {
      _useRatio = false;
    } else {
      if (this.ratio === 'auto') {
        // TODO: automatically get image dimensions
      } else if (this.ratio.includes('/')) {
        const ratioArr = this.ratio.split('/');
        ratioW = ratioArr[0];
        ratioH = ratioArr[1];
      }
    }

    const _isJpg =
      this.src &&
      this.src
        .split('.')
        .pop()
        .includes('jpg');
    this._isSvg =
      !this._isJpg &&
      this.src &&
      this.src
        .split('.')
        .pop()
        .includes('svg');
    const _canUseRatio = ratioW > 0 && ratioH > 0 && _useRatio && !this.cover;
    // Only JPGs allowed, PNGs can have transparency and may not look right layered over placeholder
    const _canUsePlaceholder = (_canUseRatio || this.cover) && _isJpg;

    const classes = cx(...this.initialClasses, 'c-bolt-image__image', {
      'c-bolt-image__lazyload': lazyload,
      'c-bolt-image__lazyload--fade': lazyload && !this.isLazyLoaded,
      'c-bolt-image__lazyload--blur': lazyload && _isJpg && !this.isLazyLoaded,
      'js-lazyload': lazyload && !this.isLazyLoaded,
      // 'is-lazyloaded': this.isLazyLoaded,
      'c-bolt-image--cover': this.cover,
    });

    // grab the last image path referenced in srcset as a fallback if src isn't defined
    const fallbackSrc = this.srcset
      ? this.srcset
          .split(',')
          [this.srcset.split(',').length - 1].trim()
          .split(' ')[0]
      : undefined;

    const imageElement = () => {
      if (this.src || this.srcset) {
        return html`
          <img
            class="${classes}"
            src="${ifDefined(this.src ? this.src : fallbackSrc)}"
            alt="${ifDefined(this.alt ? this.alt : undefined)}"
            srcset="${ifDefined(
              !lazyload
                ? this.srcset || this.src || undefined
                : this.isLazyLoaded
                ? this.srcset
                : this.placeholderImage || undefined,
            )}"
            data-srcset="${ifDefined(
              lazyload ? this.srcset || this.src : undefined,
            )}"
            sizes="${ifDefined(
              this.isLazyLoaded || (this.sizes && this.sizes !== 'auto')
                ? this.sizes
                : this.offsetWidth > 0
                ? `${this.offsetWidth}px`
                : undefined,
            )}"
            data-sizes="${ifDefined(
              lazyload && this.sizes === 'auto' ? 'auto' : undefined,
            )}"
            data-zoom="${ifDefined(this.zoom ? this.src : undefined)}"
            style="${ifDefined(
              this.valign
                ? `object-position: ${this.align} ${this.valign};`
                : undefined,
            )}"
          />
        `;
      }
    };

    const placeholderImageElement = () => {
      if (_canUsePlaceholder) {
        return html`
          <img
            class="${cx(
              ...this.initialClasses,
              'c-bolt-image__image-placeholder',
              {
                'c-bolt-image__image': false,
                'c-bolt-image__lazyload': false,
                'c-bolt-image__lazyload--fade': false,
                'c-bolt-image__lazyload--blur': false,
                'js-lazyload': false,
                'c-bolt-image--cover': this.cover,
              },
            )}"
            src="${this.placeholderImage}"
            alt="${ifDefined(this.alt ? this.alt : undefined)}"
          />
        `;
      }
    };

    // Include <noscript> for server-side rendered components
    const fallbackImageElement = () => {
      // this.isSSR is undefined at the moment, placeholder for future server-side rendering
      if (lazyload && this.src && this.isSSR) {
        return html`
          <noscript>
            <img
              class="${cx('c-bolt-image__image', {
                'c-bolt-image--cover': this.cover,
              })}"
              src="${this.src}"
              alt="${ifDefined(this.alt ? this.alt : undefined)}"
              srcset="${ifDefined(
                !lazyload ? this.srcset || this.src : undefined,
              )}"
              data-srcset="${ifDefined(
                lazyload ? this.srcset || this.src : undefined,
              )}"
            />
          </noscript>
        `;
      }
    };

    const imageTemplate = html`
      ${placeholderImageElement()} ${imageElement()} ${fallbackImageElement()}
    `;

    const ratioTemplate = children => {
      return html`
        <bolt-ratio ratio="${ratioW * 1}/${ratioH * 1}">
          ${children}
        </bolt-ratio>
      `;
    };

    if (_canUsePlaceholder && this.placeholderColor) {
      this.style.backgroundColor = this.placeholderColor;
    }

    if (this.maxWidth) {
      this.style.width = this.maxWidth;
      // Don't bother setting `max-width` if `width` is also a percentage
      if (!this.maxWidth.includes('%')) {
        this.style.maxWidth = '100%';
      }
    }

    let renderedImage;

    if (_canUseRatio) {
      renderedImage = ratioTemplate(imageTemplate);
    } else {
      renderedImage = imageTemplate;
    }

    return html`
      ${renderedImage}
    `;
  }
}

export { BoltImage };
