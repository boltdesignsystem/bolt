import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import {
  withLitHtml,
  html,
  render,
} from '@bolt/core/renderers/renderer-lit-html';

import { convertInitialTags } from '@bolt/core/decorators';

import classNames from 'classnames/bind';

import styles from './blockquote.scss';
// Logo, Ratio, and Image styles needed for bolt-logo (when loaded via twig)
import logoStyles from '@bolt/components-logo/src/logo.scss';
import ratioStyles from '@bolt/components-ratio/src/ratio.scss';
import imageStyles from '@bolt/components-image/src/image.scss';
// Twig template uses "bolt-headline" component instead of bolt-text-v2
import textStyles from '@bolt/components-headline/src/headline.scss';
// Global styles needed for proper spacing of P tags in Twig template
import globalStyles from '@bolt/global/styles/index.scss';

import schema from '../blockquote.schema.yml';

let cx = classNames.bind(styles);

@define
@convertInitialTags('blockquote', false) // The first matching tag will have its attributes converted to component props
class BoltBlockquote extends withLitHtml() {
  static is = 'bolt-blockquote';

  static props = {
    size: props.string,
    alignItems: props.string,
    border: props.string,
    indent: props.boolean,
    fullBleed: props.boolean,
    authorName: props.string,
    authorTitle: props.string,
    authorImage: props.string,
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

    // Remove "content" from schema, does not apply to web component.
    for (let property in modifiedSchema.properties) {
      if (property === 'content') {
        delete modifiedSchema.properties[property];
      }
    }

    const index = modifiedSchema.required.indexOf('content');
    modifiedSchema.required.splice(index, 1);

    return modifiedSchema;
  }

  getAlignItemsOption(prop) {
    switch (prop) {
      case 'right':
        return 'end';
      case 'center':
        return 'center';
      default:
        // left => start
        return 'start';
    }
  }

  getBorderOption(prop) {
    switch (prop) {
      case 'none':
        return 'borderless';
      case 'horizontal':
        return 'bordered-horizontal';
      default:
        // vertical => bordered-vertical
        return 'bordered-vertical';
    }
  }

  logoTemplate() {
    const logoClasses = cx('c-bolt-blockquote__logo');

    return this.slots['logo']
      ? html`
          <div class="${logoClasses}">${this.slot('logo')}</div>
        `
      : html`
          <slot name="logo" />
        `;
  }

  authorTemplate(name, title, image) {
    if (name) {
      const footerClasses = cx('c-bolt-blockquote__footer');
      const footerItemClasses = cx('c-bolt-blockquote__footer-item');
      const imageClasses = cx('c-bolt-blockquote__image');

      const authorName = html`
        <bolt-text
          tag="cite"
          font-size="xsmall"
          font-weight="bold"
          color="theme-headline"
        >
          ${name}
        </bolt-text>
      `;

      const authorTitle = html`
        <bolt-text font-size="xsmall" color="theme-headline">
          ${title}
        </bolt-text>
      `;

      // TODO: replace 'img' with 'bolt-image' once 'bolt-image' is converted to web component
      const authorImage = html`
        <div class="${footerItemClasses}">
          <div class="${imageClasses}">
            <img src="${image}" alt="Photo of ${name}" />
          </div>
        </div>
      `;

      return html`
        <footer class="${footerClasses}">
          <div class="${footerItemClasses}">
            ${image && authorImage} ${authorName} ${title && authorTitle}
          </div>
        </footer>
      `;
    }
  }

  quoteTemplate(size, children = null) {
    const text = html`
      <bolt-text
        tag="div"
        font-size="${size}"
        font-weight="semibold"
        color="theme-headline"
      >
        ${children}
      </bolt-text>
    `;

    return html`
      <div class="c-bolt-blockquote__quote">${text}</div>
    `;
  }

  blockquoteTemplate(classes, children = null) {
    return html`
      <blockquote class="${classes}">${children}</blockquote>
    `;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const {
      size,
      alignItems,
      border,
      indent,
      fullBleed,
      authorName,
      authorTitle,
      authorImage,
    } = this.validateProps(this.props);

    const classes = cx('c-bolt-blockquote', {
      [`c-bolt-blockquote--${size}`]: size,
      [`c-bolt-blockquote--align-items-${this.getAlignItemsOption(
        alignItems,
      )}`]: this.getAlignItemsOption(alignItems),
      [`c-bolt-blockquote--${this.getBorderOption(
        border,
      )}`]: this.getBorderOption(border),
      [`c-bolt-blockquote--indented`]: indent,
      [`c-bolt-blockquote--full`]: fullBleed,
    });

    let renderedBlockquote;

    if (this.rootElement) {
      renderedBlockquote = this.rootElement.firstChild.cloneNode(true);
      renderedBlockquote.className += ' ' + classes;
    } else {
      const logo = this.logoTemplate();
      const quote = this.quoteTemplate(size, this.slot('default'));
      const author = this.authorTemplate(authorName, authorTitle, authorImage);
      const blockquoteInner = html`
        ${logo} ${quote} ${author}
      `;
      renderedBlockquote = this.blockquoteTemplate(classes, blockquoteInner);
    }

    return html`
      ${
        this.addStyles([
          styles,
          logoStyles,
          ratioStyles,
          imageStyles,
          textStyles,
          globalStyles,
        ])
      }
      ${renderedBlockquote}
    `;
  }
}

export { BoltBlockquote };
