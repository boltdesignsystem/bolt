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

    return html`
      <blockquote class="${classes}">
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
