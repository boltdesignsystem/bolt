import {
  customElement,
  BoltElement,
  html,
  ifDefined,
  unsafeCSS,
  convertInitialTags,
} from '@bolt/element';

import classNames from 'classnames/bind';
import textStyles from '@bolt/components-text/index.scss';
import styles from './blockquote.scss';
import { AuthorImage, AuthorName, AuthorTitle } from './Author';
let cx = classNames.bind([styles, textStyles]);
import schemaFile from '../blockquote.schema';

@customElement('bolt-blockquote')
@convertInitialTags('blockquote') // The first matching tag will have its attributes converted to component props
class BoltBlockquote extends BoltElement {
  static get styles() {
    return [unsafeCSS(imageStyles)];
  }

  static get properties() {
    return {
      size: {
        type: String,
        attribute: 'size',
      },
      weight: {
        type: String,
        attribute: 'weight',
      },
      alignItems: {
        type: String,
        attribute: 'align-items',
      },
      border: {
        type: String,
        attribute: 'border',
      },
      indent: {
        type: Boolean,
        attribute: 'indent',
      },
      noQuotes: {
        type: Boolean,
        attribute: 'no-quotes',
      },
      lang: {
        type: String,
        attribute: 'lang',
      },
      fullBleed: Boolean,
      authorName: String,
      authorTitle: String,
      authorImage: String,
    };
  }

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor() {
    super();
    // this.useShadow = hasNativeShadowDomSupport;
    // this.schema = this.getModifiedSchema(schema);
  }

  firstUpdated() {
    const self = this;

    // @todo: I've added this.useShadow here to exclude IE.
    // In IE-only this mutation callback causes multiple re-renders
    // and causes component to disappear.
    if (window.MutationObserver && this.useShadow) {
      // Re-generate slots + re-render when mutations are observed
      const mutationCallback = function(mutationsList, observer) {
        self.slots = self._checkSlots();
        self.triggerUpdate();

        // todo: refactor to check for slotted content, light OR shadow DOM
        // mutationsList.forEach(mutation => {
        //   if (mutation.type === 'childList') {
        //     if (mutation.target.parentNode === self) {
        //       console.log(mutation.target);
        //     }
        //   }
        // });
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

  disconnectedCallback() {
    super.disconnected && super.disconnected();

    // remove MutationObserver if supported + exists
    if (window.MutationObserver && this.observer) {
      this.observer.disconnect();
    }
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
    const classes = cx('c-bolt-blockquote', {
      [`c-bolt-blockquote--${size}`]: this.size,
      [`c-bolt-blockquote--${weight}`]: this.weight,
      [`c-bolt-blockquote--align-items-${this.getAlignItemsOption(
        this.alignItems,
      )}`]: this.getAlignItemsOption(alignItems),
      [`c-bolt-blockquote--${this.getBorderOption(
        this.border,
      )}`]: this.getBorderOption(this.border),
      [`c-bolt-blockquote--indented`]: this.indent,
      [`c-bolt-blockquote--full`]: this.fullBleed,
      [`c-bolt-blockquote--no-quotes`]: this.noQuotes,
    });

    let footerItems = [];
    footerItems.push(AuthorImage(this), AuthorName(this), AuthorTitle(this));

    this.addClassesToSlottedChildren();

    const textClasses = cx(
      'c-bolt-text-v2',
      'c-bolt-text-v2--block',
      'c-bolt-text-v2--body',
      `c-bolt-text-v2--font-size-${this.size}`,
      `c-bolt-text-v2--font-weight-${this.weight}`,
      'c-bolt-text-v2--font-style-regular',
      'c-bolt-text-v2--color-theme-headline',
      'c-bolt-text-v2--letter-spacing-regular',
      'c-bolt-text-v2--align-inherit',
      'c-bolt-text-v2--text-transform-regular',
      'c-bolt-text-v2--line-height-regular',
      'c-bolt-text-v2--opacity-100',
    );

    return html`
      ${this.addStyles([styles, textStyles])}
      <blockquote
        class="${classes}"
        lang="${ifDefined(
          this.lang
            ? this.lang
            : this.closest('[lang]')
            ? this.closest('[lang]')
                .getAttribute('lang')
                .toLowerCase()
            : undefined,
        )}"
      >
        ${this.slots.logo
          ? html`
              <div class="${cx('c-bolt-blockquote__logo')}">
                ${this.slot('logo')}
              </div>
            `
          : ''}
        <div class="${cx('c-bolt-blockquote__quote')}">
          <div class="${textClasses}">
            ${this.slot('default')}
          </div>
        </div>
        ${footerItems.length > 0
          ? html`
              <footer class="${cx('c-bolt-blockquote__footer')}">
                ${footerItems.map(
                  footerItem => html`
                    <div class="${cx('c-bolt-blockquote__footer-item')}">
                      ${footerItem}
                    </div>
                  `,
                )}
              </footer>
            `
          : ''}
      </blockquote>
    `;
  }
}

export { BoltBlockquote };

// @todo: Original return statement - backing this out until `bolt-text` is ready for release
// See: https://github.com/bolt-design-system/bolt/pull/1167
// return html`
// ${this.addStyles([styles])}
// <blockquote class="${classes}" is="shadow-root">
//   ${this.slots.logo
//     ? html`
//         <div class="${cx('c-bolt-blockquote__logo')}">
//           ${this.slot('logo')}
//         </div>
//       `
//     : ''}
//   <div class="${cx('c-bolt-blockquote__quote')}">
//     <bolt-text
//       tag="div"
//       font-size="${size}"
//       font-weight="semibold"
//       color="theme-headline"
//     >
//       ${this.slot('default')}
//     </bolt-text>
//   </div>
//   ${footerItems.length > 0
//     ? html`
//         <footer class="${cx('c-bolt-blockquote__footer')}">
//           ${footerItems.map(
//             footerItem => html`
//               <div class="${cx('c-bolt-blockquote__footer-item')}">
//                 ${footerItem}
//               </div>
//             `,
//           )}
//         </footer>
//       `
//     : ''}
// </blockquote>
// `;
// }
