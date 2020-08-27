import {
  customElement,
  BoltElement,
  html,
  ifDefined,
  unsafeCSS,
  convertInitialTags,
} from '@bolt/element';
import classNames from 'classnames/bind';
import { AuthorImage, AuthorName, AuthorTitle } from './_blockquote-author';
import schema from '../blockquote.schema';
import styles from './blockquote.scss';

let cx = classNames.bind([styles]);

@customElement('bolt-blockquote')
@convertInitialTags('blockquote') // The first matching tag will have its attributes converted to component props
class BoltBlockquote extends BoltElement {
  static schema = schema;

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static get properties() {
    return {
      ...this.props,
      authorName: { type: String, attribute: 'author-name' },
      authorTitle: { type: String, attribute: 'author-title' },
      authorImage: { type: String, attribute: 'author-image' },
    };
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    // @todo: I've added this.useShadow here to exclude IE.
    // In IE-only this mutation callback causes multiple re-renders
    // and causes component to disappear.
    if (window.MutationObserver && this.useShadow && !this.observer) {
      // Re-generate slots + re-render when mutations are observed
      const mutationCallback = (mutationsList, observer) => {
        this.saveSlots();
        this.requestUpdate();
      };

      // Create an observer instance linked to the callback function
      this.observer = new MutationObserver(mutationCallback);

      // Start observing the target node for configured mutations
      this.observer.observe(this, {
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
    if (!this.slotMap?.get('default')) return;

    const defaultSlot = [];

    this.slotMap.get('default').forEach(item => {
      if (item.tagName) {
        item.classList.remove('is-first-child');
        item.classList.remove('is-last-child'); // clean up existing classes
        defaultSlot.push(item);
      }
    });

    if (defaultSlot.length) {
      defaultSlot[0].classList.add('is-first-child');

      if (defaultSlot.length === 1) {
        defaultSlot[0].classList.add('is-last-child');
      } else {
        defaultSlot[defaultSlot.length - 1].classList.add('is-last-child');
      }
    }
  }

  render() {
    const classes = cx('c-bolt-blockquote', {
      [`c-bolt-blockquote--align-items-${this.getAlignItemsOption(
        this.alignItems,
      )}`]: this.getAlignItemsOption(this.alignItems),
      [`c-bolt-blockquote--${this.getBorderOption(
        this.border,
      )}`]: this.getBorderOption(this.border),
      [`c-bolt-blockquote--indented`]: this.indent,
      [`c-bolt-blockquote--full`]: this.fullBleed,
      [`c-bolt-blockquote--no-quotes`]: this.noQuotes,
    });

    const textClasses = cx(
      `c-bolt-blockquote__quote--${this.size}`,
      `c-bolt-blockquote__quote--${this.weight}`,
    );

    const footerItems = [
      AuthorImage(this),
      AuthorName(this),
      AuthorTitle(this),
    ].filter(el => el);

    this.addClassesToSlottedChildren();

    return html`
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
        ${this.slotMap.get('logo')
          ? html`
              <div class="${cx('c-bolt-blockquote__logo')}">
                ${this.slotify('logo')}
              </div>
            `
          : ''}
        <div class="${cx('c-bolt-blockquote__quote')} ${textClasses}">
          ${this.slotify('default')}
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
