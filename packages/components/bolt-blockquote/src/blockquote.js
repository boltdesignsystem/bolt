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


  get alignItemsOption() {
    switch (this.props.alignItems) {
      case 'right':
        return 'end';
      case 'center':
        return 'center';
      default:
        // left => start
        return 'start';
    }
  }

  get borderOption() {
    switch (this.props.border) {
      case 'none':
        return 'borderless';
      case 'horizontal':
        return 'bordered-horizontal';
      default:
        // vertical => bordered-vertical
        return 'bordered-vertical';
    }
  }

  authorTemplate(name, title, image) {
    if (name) {
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

      const authorImage = html`
        <div class="c-bolt-blockquote__footer-item">
          <div class="c-bolt-blockquote__image">
            <bolt-image src="${image}"></bolt-image>
          </div>
        </div>
      `;

      return html`
        <footer class="c-bolt-blockquote__footer">
          <div class="c-bolt-blockquote__footer-item">
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
      [`c-bolt-blockquote--align-items-${this.alignItemsOption}`]: alignItems,
      [`c-bolt-blockquote--${this.borderOption}`]: border,
      [`c-bolt-blockquote--indented`]: indent,
      [`c-bolt-blockquote--full`]: fullBleed,
    });

    let renderedBlockquote;

    if (this.rootElement) {
      renderedBlockquote = this.rootElement.firstChild.cloneNode(true);
      renderedBlockquote.className += ' ' + classes;
      render(this.slot('default'), renderedBlockquote);
    } else {
      const quote = this.quoteTemplate(size, this.slot('default'));
      const author = this.authorTemplate(authorName, authorTitle, authorImage);
      const blockquoteInner = html`
        ${quote} ${author}
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
