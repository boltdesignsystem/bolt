import classNames from 'classnames/bind';
import cardStyles from './card.scss';
import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
let cx = classNames.bind(cardStyles);

// define which specific props to provide to children that subscribe
// export const CardContext = defineContext({
//   tag: 'div',
// });

@customElement('bolt-card')
class BoltCard extends BoltElement {
  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  // static get provides() {
  //   return [CardContext];
  // }

  static get styles() {
    return [unsafeCSS(cardStyles)];
  }

  static get properties() {
    return {
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
      this.querySelector('bolt-card-link');

    // validate the original prop data passed along -- returns back the validated data w/ added default values
    // const { theme, tag } = this.validateProps(this.props);

    const classes = cx('c-bolt-card', {
      [`c-bolt-card--raised`]: isRaised,
      [`c-bolt-card--rounded`]: this.rounded,
      [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'none',
    });

    let renderedCard;

    const cardLink =
      this.url && !this.querySelector('bolt-card-link')
        ? html`
            <bolt-card-link url="${this.url}" ?target="${this.target}"
              >${this.urlText}</bolt-card-link
            >
          `
        : '';

    const cardContent = html`
      ${cardLink}
      ${this.slotMap.get('media') &&
        html`
          <bolt-card-media>${this.slotify('media')}</bolt-card-media>
        `}
      ${this.slotMap.get('body') &&
        html`
          <bolt-card-body .tag=${this.tag}
            >${this.slotify('body')}</bolt-card-body
          >
        `}
      ${this.slotify('default')}
      ${this.slotMap.get('actions') &&
        html`
          <bolt-card-actions>
            ${this.slotMap.get('actions')}
          </bolt-card-actions>
        `}
    `;

    switch (this.tag) {
      case 'article':
        return html`
          <article class="${classes}">
            ${cardContent}
          </article>
        `;
        break;
      case 'figure':
        return html`
          <figure class="${classes}">
            ${cardContent}
          </figure>
        `;
        break;
      default:
        return html`
          <div class="${classes}">
            ${cardContent}
          </div>
        `;
    }
  }
}

export { BoltCard };
