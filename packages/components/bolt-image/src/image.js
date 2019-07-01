import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// Use 'dedupe' version instead of 'bind' to help merge initial classes with those defined here
import classNames from 'classnames/dedupe';

import imageStyles from './image.scss';

import schema from '../image.schema.yml';

import './_image-lazy-sizes';

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
    return self;
  }

  disconnecting() {
    super.disconnecting && super.disconnecting();
    window.removeEventListener('resize', this.onResize);
  }

  lazyloadImage(image) {
    if (!this.isLoaded) {
      // Note: This immediately unveils the image. Add intersection observer?
      lazySizes.loader.unveil(image);
      this.isLoaded = true;
    }
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
      (this.getAttribute('sizes') === 'auto' || !this.getAttribute('sizes'))
    ) {
      this.sizes = `${this.offsetWidth}px`;
    }
  }

  rendered() {
    super.rendered && super.rendered();

    const lazyImage = this.renderRoot.querySelector('.js-lazyload');

    if (lazyImage) {
      // check if placeholder image has loaded; lazySizes will only unveil an image that is "complete"
      if (lazyImage.complete) {
        this.lazyloadImage(lazyImage);
      } else {
        lazyImage.onload = () => {
          this.lazyloadImage(lazyImage);
        };
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
      'c-bolt-image__lazyload--fade': lazyload,
      'c-bolt-image__lazyload--blur': lazyload && _isJpg,
      'js-lazyload': lazyload,
      'c-bolt-image--cover': cover,
    });

    const imageElement = () => {
      if (src || srcset) {
        return html`
          <img
            class="${classes}"
            src="${lazyload ? placeholderImage : src}"
            alt="${ifDefined(alt ? alt : undefined)}"
            srcset="${ifDefined(
              !lazyload || this.isLoaded ? srcset || src : undefined,
            )}"
            data-srcset="${ifDefined(lazyload ? srcset || src : undefined)}"
            sizes="${ifDefined(!lazyload || this.isLoaded ? sizes : undefined)}"
            data-sizes="${ifDefined(lazyload ? sizes : undefined)}"
            data-zoom="${ifDefined(zoom ? src : undefined)}"
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
        <bolt-ratio ratio="${ratioW * 1}/${ratioH * 1}">
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
