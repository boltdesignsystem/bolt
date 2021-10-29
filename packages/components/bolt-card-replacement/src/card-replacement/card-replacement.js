import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import classNames from 'classnames/bind';
// import cardReplacementStyles from './card-replacement.scss';
import schema from '../../card-replacement.schema';

let cx = classNames.bind(cardReplacementStyles);

@customElement('bolt-card-replacement')
class BoltCardReplacement extends withContext(BoltElement) {
  static schema = schema;

  // static get styles() {
  //   return [unsafeCSS(cardReplacementStyles)];
  // }

  static get properties() {
    return {
      ...this.props,
      url: {
        type: String,
      },
      urlText: {
        type: String,
      },
    };
  }

  static get providedContexts() {
    return {
      horizontal: { property: 'horizontal' },
      spacing: { property: 'spacing' },
    };
  }

  render() {
    const isRaised =
      (this.raised && this.raised === true) ||
      (this.url && this.url.length > 0) ||
      this.querySelector('bolt-card-replacement-link');

    const classes = cx('c-bolt-card-replacement', {
      [`c-bolt-card-replacement--raised`]: isRaised,
      [`c-bolt-card-replacement--horizontal`]: this.horizontal,
      [`c-bolt-card-replacement--spacing-${this.spacing}`]: this.spacing,
      [`c-bolt-card-replacement--border-radius-${this.borderRadius}`]: this
        .borderRadius,
      [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'none',
    });

    let renderedCardReplacement;

    const cardReplacementLink =
      this.url !== undefined &&
      !this.querySelector('bolt-card-replacement-link')
        ? html`
            <bolt-card-replacement-link
              url="${this.url}"
              ?target="${this.target}"
              >${this.urlText}</bolt-card-replacement-link
            >
          `
        : '';

    // @todo do we need to support "media" and "body" slots? I dont see these in use in the Bolt codebase. If not, can we remove them here?
    const cardReplacementContent = html`
      ${cardReplacementLink}
      ${this.slotMap.get('media') &&
        html`
          <bolt-card-replacement-media
            >${this.slotify('media')}</bolt-card-replacement-media
          >
        `}
      ${this.slotMap.get('body') &&
        html`
          <bolt-card-replacement-body .tag=${this.tag}
            >${this.slotify('body')}</bolt-card-replacement-body
          >
        `}
      ${this.slotify('default')}
    `;

    switch (this.tag) {
      case 'article':
        renderedCardReplacement = html`
          <article class="${classes}">
            ${cardReplacementContent}
          </article>
        `;
        break;
      case 'figure':
        renderedCardReplacement = html`
          <figure class="${classes}">
            ${cardReplacementContent}
          </figure>
        `;
        break;
      default:
        renderedCardReplacement = html`
          <div class="${classes}">
            ${cardReplacementContent}
          </div>
        `;
    }

    return html`
      ${renderedCardReplacement}
    `;
  }
}

export { BoltCardReplacement };
