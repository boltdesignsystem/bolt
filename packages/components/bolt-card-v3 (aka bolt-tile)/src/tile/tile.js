import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import classNames from 'classnames/bind';
import { withContext } from 'wc-context';
import tileStyles from './tile.scss';
let cx = classNames.bind(tileStyles);

// define which specific props to provide to children that subscribe
// export const tileContext = defineContext({
//   tag: 'div',
// });

@customElement('bolt-tile')
class Bolttile extends withContext(BoltElement) {
  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  // static get provides() {
  //   return [tileContext];
  // }

  static get providedContexts() {
    return {
      horizontal: { value: this.horizontal },
    };
  }

  static get styles() {
    return [unsafeCSS(tileStyles)];
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
      this.querySelector('bolt-tile-link');

    // validate the original prop data passed along -- returns back the validated data w/ added default values
    // const { theme, tag } = this.validateProps(this.props);

    const classes = cx('c-bolt-tile', {
      [`c-bolt-tile--raised`]: isRaised,
      [`c-bolt-tile--horizontal`]: this.horizontal,
      [`c-bolt-tile--rounded`]: this.rounded,
      [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'none',
    });

    let renderedtile;

    const tileLink =
      this.url && !this.querySelector('bolt-tile-link')
        ? html`
            <bolt-tile-link url="${this.url}" ?target="${this.target}"
              >${this.urlText}</bolt-tile-link
            >
          `
        : '';

    const tileContent = html`
      ${tileLink}
      ${this.templateMap.get('media') &&
        html`
          <bolt-tile-media>${this.slotify('media')}</bolt-tile-media>
        `}
      ${this.templateMap.get('body') &&
        html`
          <bolt-tile-body .tag=${this.tag}
            >${this.slotify('body')}</bolt-tile-body
          >
        `}
      ${this.slotify('default')}
    `;

    switch (this.tag) {
      case 'article':
        renderedtile = html`
          <article class="${classes}">
            ${tileContent}
          </article>
        `;
        break;
      case 'figure':
        renderedtile = html`
          <figure class="${classes}">
            ${tileContent}
          </figure>
        `;
        break;
      default:
        renderedtile = html`
          <div class="${classes}">
            ${tileContent}
          </div>
        `;
    }

    return html`
      ${renderedtile}
    `;
  }
}

export { Bolttile };
