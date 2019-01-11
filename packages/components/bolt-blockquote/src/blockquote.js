import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import { convertInitialTags } from '@bolt/core/decorators';
import classNames from 'classnames/bind';
import styles from './blockquote.scss';
import schema from '../blockquote.schema.yml';
import { AuthorImage, AuthorName, AuthorTitle } from './Author';

let cx = classNames.bind(styles);

@define
@convertInitialTags('blockquote') // The first matching tag will have its attributes converted to component props
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

  rendered() {
    super.rendered && super.rendered();
    const self = this;

    if (window.MutationObserver) {
      // Re-generate slots + re-render when mutations are observed
      const mutationCallback = function(mutationsList, observer) {
        self.slots = self._checkSlots();
        self.triggerUpdate();
      };

      // Create an observer instance linked to the callback function
      self.observer = new MutationObserver(mutationCallback);

      // Start observing the target node for configured mutations
      self.observer.observe(this, {
        attributes: false,
        childList: true,
        subtree: true,
      });
    }
  }

  disconnected() {
    super.disconnected && super.disconnected();

    // remove MutationObserver if supported + exists
    if (window.MutationObserver && this.observer) {
      this.observer.disconnect();
    }
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

  // automatically adds classes for the first and last slotted item (in the default slot) to help with tricky ::slotted selectors
  addClassesToSlottedChildren() {
    if (this.slots) {
      if (this.slots.default) {
        const defaultSlot = [];

        this.slots.default.forEach(item => {
          if (item.tagName) {
            item.classList.remove('is-first-child');
            item.classList.remove('is-last-child'); // clean up existing classes
            defaultSlot.push(item);
          }
        });

        if (defaultSlot[0]) {
          defaultSlot[0].classList.add('is-first-child');

          if (defaultSlot.length === 1) {
            defaultSlot[0].classList.add('is-last-child');
          }
        }

        if (defaultSlot[defaultSlot.length - 1]) {
          defaultSlot[defaultSlot.length - 1].classList.add('is-last-child');
        }
      }
    }
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

    let footerItems = [];
    footerItems.push(AuthorImage(this), AuthorName(this), AuthorTitle(this));

    this.addClassesToSlottedChildren();

    return html`
      ${this.addStyles([styles])}
      <blockquote class="${classes}" is="shadow-root">
        ${
          this.slots.logo
            ? html`
                <div class="${cx('c-bolt-blockquote__logo')}">
                  ${this.slot('logo')}
                </div>
              `
            : ''
        }
        <div class="${cx('c-bolt-blockquote__quote')}">
          <bolt-text
            tag="div"
            font-size="${size}"
            font-weight="semibold"
            color="theme-headline"
          >
            ${this.slot('default')}
          </bolt-text>
        </div>
        ${
          footerItems.length > 0
            ? html`
                <footer class="${cx('c-bolt-blockquote__footer')}">
                  ${
                    footerItems.map(
                      footerItem => html`
                        <div class="${cx('c-bolt-blockquote__footer-item')}">
                          ${footerItem}
                        </div>
                      `,
                    )
                  }
                </footer>
              `
            : ''
        }
      </blockquote>
    `;
  }
}

export { BoltBlockquote };
