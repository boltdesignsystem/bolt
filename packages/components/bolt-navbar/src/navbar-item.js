import {
  customElement,
  BoltElement,
  html,
  ifDefined,
  unsafeCSS,
} from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import {
  smoothScroll,
  scrollOptions,
  getScrollTarget,
} from '@bolt/components-smooth-scroll/src/smooth-scroll';
// import isVisible from 'is-visible';
import classNames from 'classnames/bind';
import styles from './navbar-item.scss';
import schema from '../navbar-item.schema';

let cx = classNames.bind(styles);

@customElement('bolt-navbar-item')
class BoltNavbarItem extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      role: {
        type: String,
        reflect: true,
      },
      scrollOffset: {
        type: Number,
      },
      scrollOffsetSelector: {
        type: String,
      },
      isDropdownLink: { type: Boolean },
    };
  }

  // static useShadow = false;

  constructor() {
    super();
    this.role = 'listitem';

    this.activeClass = 'c-bolt-navbar-item--active';
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static get observedContexts() {
    return ['activeItem', 'scrollOffsetSelector', 'scrollOffset'];
  }

  contextChangedCallback(name, oldValue, value) {
    if (name === 'activeItem') {
      this.active = value === this;
      // setTimeout(() => {
      if (this.active) {
        this.shadowLink.classList.add(this.activeClass);
      } else {
        this.shadowLink.classList.remove(this.activeClass);
      }
      // }, 100); // delay required for css transitions, otherwise re-render breaks transition
    } else {
      this[name] = value;
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    // this.addEventListener('click', this.handleClick);

    // const isAlreadyActive =
    //   // @todo
    //   this.shadowLink?.classList.contains(this.activeClass) ||
    //   this.shadowLink?.getAttribute('href') === window.location.hash ||
    //   this.active;

    // if (this.shadowLink && !this.waypointElement) {
    //   const href = this.shadowLink.getAttribute('href');
    //   if (href.indexOf('#') === 0 && href !== '#!') {
    //     const target = document.querySelector(href);
    //     if (target) {
    //       this.waypointElement = target;
    //     }
    //   }
    // }

    // Set an initially active link if appropriate.
    // if (isAlreadyActive) {
    //   this.activate(false);
    // }
  }

  // `attributeChangedCallback` processes changes to the `active` attr
  updated(prevProps, prevState) {
    // if (this.isDropdownLink) {
    //   this.shadowLink?.classList.add('is-dropdown-link');
    // } else {
    //   this.shadowLink?.classList.remove('is-dropdown-link');
    // }
  }

  handleClick(event) {}

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    // `smoothScroll` needs the anchor as its second argument, does not
    // appear to do anything but throws an error if missing
    // https://github.com/cferdinandi/smooth-scroll#animatescroll
    this.shadowLink = this.querySelector('a');
  }

  render() {
    //         @click="${this.handleClick}"

    return html`
      ${this.slotify('default')}
    `;
  }
}

export { BoltNavbarItem };
