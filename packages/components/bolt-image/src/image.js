import {
  props,
  define,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  watchForComponentMutations,
} from '@bolt/core/utils';
import classNames from 'classnames/bind';
import {
  withLitHtml,
  html,
  render,
} from '@bolt/core/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import Ajv from 'ajv';

import imageStyles from './image.scss';
import ratioStyles from '@bolt/components-ratio/src/ratio.scss';

import schema from '../image.schema.yml';
import './_image-lazy-sizes';

const ajv = new Ajv({ useDefaults: 'shared' });

let cx = classNames.bind(imageStyles);

@define
class BoltImage extends withLitHtml() {
  static is = 'bolt-image';

  static props = {
    src: props.string,
    alt: props.string,
    noLazyload: props.boolean,
    srcset: props.string,
    sizes: props.string,
    useAspectRatio: props.boolean,
    width: props.string,
    height: props.string,
    zoom: props.boolean,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.validate = ajv.compile(schema);
    return self;
  }

  // @todo: move to the global Bolt Base component after we're done testing this out with the new refactored Card component
  validateProps(propData) {
    var validatedData = propData;

    // remove default strings in prop data so schema validation can fill in the default
    for (let property in validatedData) {
      if (validatedData[property] === '') {
        delete validatedData[property];
      }
    }

    let isValid = this.validate(validatedData);

    // bark at any schema validation errors
    if (!isValid) {
      console.log(this.validate.errors);
    }

    return validatedData;
  }

  connecting() {
    const root = this;

    // If the initial <bolt-link> element contains a link, break apart the original HTML so we can retain the a tag but swap out the inner content with slots.

    // Make sure the button component ONLY ever reuses any existing HTML ONCE. This, in part, helps to prevent rendering diff errors in HyperHTML after booting up!
    if (this._wasInitiallyRendered === false) {
      this.childNodes.forEach((childElement, i) => {
        if (
          childElement.tagName === 'BOLT-RATIO' ||
          childElement.tagName === 'IMG'
        ) {
          root.rootElement = document.createDocumentFragment();

          // Take any existing elements and move them to the root of the custom element
          while (childElement.firstChild) {
            root.appendChild(childElement.firstChild);
          }

          if (childElement.className) {
            childElement.className = sanitizeBoltClasses(childElement);
          }

          if (
            childElement.getAttribute('is') &&
            childElement.getAttribute('is') === 'shadow-root'
          ) {
            childElement.removeAttribute('is');
          }

          root.rootElement.appendChild(childElement);
        }
      });
    }

    // When possible, use afterNextRender to defer non-critical work until after first paint.
    // afterNextRender(this, function() {
    //   this.addEventListener('click', this.clickHandler);
    // });
  }

  rendered() {
    super.rendered(); // ensure any events emitted by the Bolt Base class fire as expected

    // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
    if (hasNativeShadowDomSupport && this.useShadow) {
      this.observer = watchForComponentMutations(this);

      this.observer.observe(this, {
        attributes: false,
        childList: true,
        characterData: false,
      });
    }
  }

  disconnecting() {
    // this.removeEventListener('click', this.clickHandler);

    if (hasNativeShadowDomSupport && this.useShadow) {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  getImageData(src) {
    // TODO: Get real image data
    return {
      height: 480,
      width: 640,
      base64:
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      color: 'hsl(233, 33%, 97%)',
      isAbsolute: false,
    };
  }

  imageTemplate(src, alt, lazyload, srcset, sizes, zoom, classes, fallback) {
    const placeholderSrc =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    const imageElement = html`
      <img
        class="${classes}"
        src="${lazyload ? placeholderSrc : src}"
        alt="${alt}"
        srcset="${ifDefined(!lazyload ? srcset : undefined)}"
        data-srcset="${ifDefined(lazyload ? srcset : undefined)}"
        sizes="${ifDefined(!lazyload ? sizes : undefined)}"
        data-sizes="${ifDefined(lazyload ? sizes : undefined)}"
        data-zoom="${ifDefined(zoom ? src : undefined)}"
      />
    `;

    // Include <noscript> for server-side rendered components
    const imageFallbackElement = html`
      <noscript>
        <img
          class="${classes}"
          src="${src}"
          alt="${alt}"
          srcset="${ifDefined(!lazyload ? srcset : undefined)}"
          data-srcset="${ifDefined(lazyload ? srcset : undefined)}"
        />
      </noscript>
    `;

    return html`
      ${imageElement}${fallback ? imageFallbackElement : ''}
    `;
  }

  ratioTemplate(width, height, children = null) {
    return html`
      <bolt-ratio
        attributes=""
        aspect-ratio-width="${width * 1}"
        aspect-ratio-height="${height * 1}"
      >
        ${children}
      </bolt-ratio>
    `;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const {
      src,
      alt,
      noLazyload,
      srcset,
      sizes,
      useAspectRatio,
      width,
      height,
      zoom,
    } = this.validateProps(this.props);

    const imageClasses = cx('c-bolt-image__image');

    // negate and rename variable for readability
    const lazyload = !noLazyload;

    // const placeholderClasses = cx('c-bolt-image__image-placeholder');

    const lazyloadClasses = cx({
      'c-bolt-image__lazyload': lazyload,
      'c-bolt-image__lazyload--fade': lazyload,
      'c-bolt-image__lazyload--blur': lazyload,
      // 'c-bolt-image__lazyload--blur': lazyload && ext == 'jpg', // TODO: get image data
      'js-lazyload': lazyload,
    });

    const imageData = this.getImageData(src);
    const imageWidth = width || imageData.width;
    const imageHeight = height || imageData.height;
    const imageTemplate = this.imageTemplate(
      src,
      alt,
      lazyload,
      srcset || src,
      sizes,
      zoom,
      cx(imageClasses, lazyloadClasses),
      lazyload && imageWidth && imageHeight && useAspectRatio,
    );

    let renderedImage = this.slot('default');

    if (this.rootElement) {
      renderedImage = this.rootElement.firstChild.cloneNode(true);
      renderedImage.className += ' ' + imageClasses;
      render(this.slot('default'), renderedImage);
    } else {
      if (imageWidth && imageHeight && useAspectRatio) {
        renderedImage = this.ratioTemplate(
          imageWidth,
          imageHeight,
          imageTemplate,
        );
      } else {
        renderedImage = imageTemplate;
      }
    }

    return html`
      ${this.addStyles([imageStyles, ratioStyles])} ${renderedImage}
    `;
  }
}

export { BoltImage };
