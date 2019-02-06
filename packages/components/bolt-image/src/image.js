import {
  props,
  define,
  hasNativeShadowDomSupport,
  containsTagName,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import path from 'path';

import classNames from 'classnames/bind';

import ratioStyles from '@bolt/components-ratio/src/ratio.scss';
import imageStyles from './image.scss';

import schema from '../image.schema.yml';

import './_image-lazy-sizes';

let cx = classNames.bind(imageStyles);

@define
class BoltImage extends withLitHtml() {
  static is = 'bolt-image';

  static props = {
    src: props.string,
    alt: props.string,
    noLazy: props.boolean,
    srcset: props.string,
    sizes: props.string,
    noRatio: props.boolean,
    width: props.string,
    height: props.string,
    zoom: props.boolean,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = this.getModifiedSchema(schema);
    return self;
  }

  getModifiedSchema(schema) {
    var modifiedSchema = schema;

    // Remove "lazyload" and "useAspectRatio" from schema, does not apply to web component.
    for (let property in modifiedSchema.properties) {
      if (property === 'lazyload' || property === 'useAspectRatio') {
        delete modifiedSchema.properties[property];
      }
    }

    return modifiedSchema;
  }

  getImageData(imagePath) {
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

  lazyloadImage(image) {
    // console.log('@lazyloadImage');
    if (!this.isLoaded) {
      // Note: This immediately unveils the image. Add intersection observer?
      lazySizes.loader.unveil(image);
      this.isLoaded = true;
    }
  }

  rendered() {
    super.rendered() && super.rendered();
    let lazyImage = this.shadowRoot.querySelector('.js-lazyload');
    if (lazyImage) {
      this.lazyloadImage(lazyImage);
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
      noRatio,
      width,
      height,
      zoom,
    } = this.validateProps(this.props);

    // negate and rename variables for readability
    const lazyload = !noLazy;
    const useAspectRatio = !noRatio;

    const imageExt = path.extname(src);
    const imageData = this.getImageData(src);
    const placeholderColor = imageData.color;
    const placeholderSrc = imageData.base64;
    const imageWidth = width || imageData.width;
    const imageHeight = height || imageData.height;
    const canUseAspectRatio = imageWidth && imageHeight && useAspectRatio;

    const classes = cx('c-bolt-image__image', {
      'c-bolt-image__lazyload': lazyload,
      'c-bolt-image__lazyload--fade': lazyload,
      'c-bolt-image__lazyload--blur': lazyload && imageExt === '.jpg',
      'js-lazyload': lazyload,
    });

    const imageElement = () => {
      if (src) {
        return html`
          <img
            class="${classes}"
            src="${lazyload ? placeholderSrc : src}"
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
      if (useAspectRatio && imageExt === '.jpg') {
        return html`
          <img
            class="${cx('c-bolt-image__image-placeholder')}"
            src="${placeholderSrc}"
            alt="${ifDefined(alt ? alt : undefined)}"
          />
        `;
      }
    };

    // Include <noscript> for server-side rendered components
    const fallbackImageElement = () => {
      if (lazyload && src) {
        return html`
          <noscript>
            <img
              class="${classes}"
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
          attributes=""
          aspect-ratio-width="${imageWidth * 1}"
          aspect-ratio-height="${imageHeight * 1}"
        >
          ${children}
        </bolt-ratio>
      `;
    };

    if (placeholderColor && canUseAspectRatio && imageExt === '.jpg') {
      this.style.backgroundColor = placeholderColor;
    }

    let renderedImage = this.slot('default');

    if (
      !containsTagName(this.childNodes, 'img') &&
      !containsTagName(this.childNodes, 'bolt-ratio')
    ) {
      if (canUseAspectRatio) {
        renderedImage = ratioTemplate(imageTemplate);
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
