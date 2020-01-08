import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import classNames from 'classnames/bind';
import { withContext } from 'wc-context';
import cardReplacementStyles from './card-replacement.scss';
let cx = classNames.bind(cardReplacementStyles);

// define which specific props to provide to children that subscribe
// export const card-replacementContext = defineContext({
//   tag: 'div',
// });

@customElement('bolt-card-replacement')
class BoltCardReplacement extends withContext(BoltElement) {
  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  // static get provides() {
  //   return [card-replacementContext];
  // }

  static get providedContexts() {
    return {
      horizontal: { value: this.horizontal },
    };
  }

  static get styles() {
    return [unsafeCSS(cardReplacementStyles)];
  }

  static get properties() {
    return {
      horizontal: {
        type: Boolean,
        reflect: true,
      },
      theme: String, // xdark | dark | light | xlight
      tag: String, // div | figure | article
      height: String, // full | auto
      raised: Boolean,
      url: String,
      urlText: String,
      rounded: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  render() {
    const isRaised =
      (this.raised && this.raised === true) ||
      (this.url && this.url.length > 0) ||
      this.querySelector('bolt-card-replacement-link');

    // validate the original prop data passed along -- returns back the validated data w/ added default values
    // const { theme, tag } = this.validateProps(this.props);

    const classes = cx('c-bolt-card-replacement', {
      [`c-bolt-card-replacement--raised`]: isRaised,
      [`c-bolt-card-replacement--horizontal`]: this.horizontal,
      [`c-bolt-card-replacement--rounded`]: this.rounded,
      [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'none',
    });

    let renderedCardReplacement;

    const cardReplacementLink =
      this.url && !this.querySelector('bolt-card-replacement-link')
        ? html`
            <bolt-card-replacement-link url="${this.url}" ?target="${this.target}"
              >${this.urlText}</bolt-card-replacement-link
            >
          `
        : '';

    const cardReplacementContent = html`
      ${cardReplacementLink}
      ${this.slotMap.get('media') &&
        html`
          <bolt-card-replacement-media>${this.slotify('media')}</bolt-card-replacement-media>
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
