import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// Use 'dedupe' version instead of 'bind' to help merge initial classes with those defined here
import classNames from 'classnames/dedupe';

import imageStyles from './image.scss';

import schema from '../image.schema.yml';

import { lazySizes } from './_image-lazy-sizes';

let cx = classNames.bind(imageStyles);

let passiveIfSupported = false;

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

@define
class BoltImage extends withLitHtml() {
  static is = 'bolt-image';

  static props = {
    src: props.string,
    alt: props.string,
    noLazy: props.boolean,
    srcset: props.string,
    sizes: props.string,
    ratio: props.string,
    maxWidth: props.string,
    placeholderColor: props.string,
    placeholderImage: props.string,
    zoom: props.boolean,
    cover: props.boolean,
    valign: props.string,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.onResize = self.onResize.bind(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = this.getModifiedSchema(schema, [
      'lazyload',
      'useAspectRatio',
    ]);
    self.initialClasses = [];
    return self;
  }

  disconnecting() {
    super.disconnecting && super.disconnecting();
    window.removeEventListener('resize', this.onResize);
  }

  connecting() {
    // IE fires this twice, only let it remove children once
    if (!this._wasInitiallyRendered) {
      super.connecting && super.connecting();

      const image = this.querySelector('.c-bolt-image__image');
      this.initialClasses = image ? [].slice.call(image.classList) : [];

      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }

    window.addEventListener('resize', this.onResize, passiveIfSupported);
  }

  onResize() {
    if (
      this.isLoaded &&
      (this.getAttribute('sizes') === 'auto' || !this.getAttribute('sizes')) &&
      this.offsetWidth > 0
    ) {
      this.sizes = `${this.offsetWidth}px`;
    }
  }

  rendered() {
    super.rendered && super.rendered();

    const { noLazy } = this.validateProps(this.props);

    // if image should lazyload
    if (!noLazy) {
      const lazyImage = this.renderRoot.querySelector(
        `.${lazySizes.cfg.lazyClass}`,
      );

      // if component contains a lazy image that is rendering for the first time
      if (lazyImage && !this.isLoaded) {
        // set a flag so that image is not lazyloaded on subsequent re-renders
        this.isLoaded = true;

        // `lazySizes.elements` may be undefined on first load. That's ok - the line below is just to catch JS injected images.
        lazySizes.elements && lazySizes.elements.push(lazyImage);

        // force rechecks -- probably not needed. @todo: can we remove?
        // lazySizes.autoSizer.checkElems();
      }
    }
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const {
      src,
      alt,
      noLazy,
      srcset,
      sizes,
      ratio,
      maxWidth,
      placeholderColor,
      placeholderImage,
      zoom,
      cover,
      valign,
    } = this.validateProps(this.props);

    // negate and rename variables for readability
    const lazyload = !noLazy;

    // use ratio by default, still depends upon aspect-ratio being passed in
    let useRatio = true;
    let ratioW, ratioH;

    if (ratio === 'none') {
      useRatio = false;
    } else {
      if (ratio === 'auto') {
        // TODO: automatically get image dimensions
      } else if (ratio.includes('/')) {
        const ratioArr = ratio.split('/');
        ratioW = ratioArr[0];
        ratioH = ratioArr[1];
      }
    }

    const _isJpg = src && src.split('.').pop() === 'jpg';
    const _canUseRatio = ratioW > 0 && ratioH > 0 && useRatio && !cover;
    // Only JPGs allowed, PNGs can have transparency and may not look right layered over placeholder
    const _canUsePlaceholder = (_canUseRatio || cover) && _isJpg;

    const classes = cx(...this.initialClasses, 'c-bolt-image__image', {
      'c-bolt-image__lazyload': lazyload,
      'c-bolt-image__lazyload--fade': lazyload && !this.isLoaded,
      'c-bolt-image__lazyload--blur': lazyload && _isJpg && !this.isLoaded,
      'js-lazyload': lazyload,
      'c-bolt-image--cover': cover,
    });

    // grab the last image path referenced in srcset as a fallback if src isn't defined
    const fallbackSrc = srcset
      ? srcset
          .split(',')
          [srcset.split(',').length - 1].trim()
          .split(' ')[0]
      : undefined;

    const imageElement = () => {
      if (src || srcset) {
        return html`
          <img
            class="${classes}"
            src="${ifDefined(src ? src : fallbackSrc)}"
            alt="${ifDefined(alt ? alt : undefined)}"
            srcset="${ifDefined(
              lazyload ? placeholderImage : srcset ? srcset : undefined,
            )}"
            data-srcset="${ifDefined(lazyload ? srcset || src : undefined)}"
            sizes="${ifDefined(
              this.isLoaded || (this.sizes && this.sizes !== 'auto')
                ? this.sizes
                : `${this.offsetWidth}px`,
            )}"
            data-sizes="${ifDefined(
              lazyload && this.sizes === 'auto' ? 'auto' : undefined,
            )}"
            data-zoom="${ifDefined(zoom ? src : undefined)}"
            style="${ifDefined(
              valign ? `object-position: center ${valign};` : undefined,
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
                'c-bolt-image--cover': cover,
              },
            )}"
            src="${placeholderImage}"
            alt="${ifDefined(alt ? alt : undefined)}"
          />
        `;
      }
    };

    // Include <noscript> for server-side rendered components
    const fallbackImageElement = () => {
      // this.isSSR is undefined at the moment, placeholder for future server-side rendering
      if (lazyload && src && this.isSSR) {
        return html`
          <noscript>
            <img
              class="${cx('c-bolt-image__image', {
                'c-bolt-image--cover': cover,
              })}"
              src="${src}"
              alt="${ifDefined(alt ? alt : undefined)}"
              srcset="${ifDefined(!lazyload ? srcset || src : undefined)}"
              data-srcset="${ifDefined(lazyload ? srcset || src : undefined)}"
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
        <bolt-ratio
          ratio="${ratioW * 1}/${ratioH * 1}"
          .useShadow=${this.useShadow}
        >
          ${children}
        </bolt-ratio>
      `;
    };

    if (_canUsePlaceholder && placeholderColor) {
      this.style.backgroundColor = placeholderColor;
    }

    if (maxWidth) {
      this.style.width = maxWidth;
      // Don't bother setting `max-width` if `width` is also a percentage
      if (!maxWidth.includes('%')) {
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
      ${this.addStyles([imageStyles])} ${renderedImage}
    `;
  }
}

export { BoltImage };
