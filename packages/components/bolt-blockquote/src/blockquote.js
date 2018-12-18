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

import styles from './blockquote.scss';
import schema from '../blockquote.schema.yml';

let cx = classNames.bind(styles);

@define
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

  connecting() {
    const root = this;

    // If the initial <bolt-link> element contains a link, break apart the original HTML so we can retain the a tag but swap out the inner content with slots.

    // Make sure the button component ONLY ever reuses any existing HTML ONCE. This, in part, helps to prevent rendering diff errors in HyperHTML after booting up!
    if (this._wasInitiallyRendered === false) {
      this.childNodes.forEach((childElement, i) => {
        if (childElement.tagName === 'BLOCKQUOTE') {
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

  quoteTemplate(children = null) {
    const text = html`
      <bolt-text
        tag="div"
        font-size="${this.props.size}"
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
      content,
      indent,
      fullBleed,
      authorName,
      authorTitle,
      authorImage,
    } = this.validateProps(this.getModifiedSchema(schema), this.props);

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
      const quote = this.quoteTemplate(this.slot('default'));
      const author = this.authorTemplate(authorName, authorTitle, authorImage);
      const blockquoteInner = html`
        ${quote} ${author}
      `;
      renderedBlockquote = this.blockquoteTemplate(classes, blockquoteInner);
    }

    return html`
      ${this.addStyles([styles])} ${renderedBlockquote}
    `;
  }
}

export { BoltBlockquote };
