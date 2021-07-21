import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import { getUniqueId } from '@bolt/core-v3.x/utils';
import { withContext } from 'wc-context/lit-element';
import { Waypoint } from '@bolt/core-v3.x/utils/waypoint';
import classNames from 'classnames/bind';
import styles from './toc.scss';
import schema from '../toc.schema';

let cx = classNames.bind(styles);

/*
 * 2. role="list": declares that an element is a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

@customElement('bolt-toc')
class BoltToc extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      activeItem: {
        type: Object,
      },
    };
  }

  constructor() {
    super();

    this.uuid =
      this.uuid || bolt.config.env === 'test' ? '12345' : getUniqueId();
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static get providedContexts() {
    return {
      activeItem: { property: 'activeItem' },
      scrollOffsetSelector: { property: 'scrollOffsetSelector' },
      scrollOffset: { property: 'scrollOffset' },
    };
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.addEventListener('toc:activate', this.onActivate);
    this.scrollOffsetEl = document.querySelector(this.scrollOffsetSelector);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    this.removeEventListener('toc:activate', this.onActivate);
    this.waypoint.destroy();
  }

  get items() {
    return this.querySelectorAll('bolt-toc-item');
  }

  getWaypointData() {
    const data = [];

    this.items.forEach(item => {
      if (item.waypointElement) {
        data.push({
          trigger: item,
          element: item.waypointElement,
        });
      }
    });

    return data;
  }

  onActivate(event) {
    if (event?.detail?.activeItem) {
      this.activeItem = event.detail.activeItem;
    }
  }

  getItemByElement(element, shift = 0) {
    const match = this.waypointData.find(
      item => item.waypointElement === element,
    );
    const index = this.waypointData.indexOf(match) + shift;

    if (index !== -1) {
      return this.waypointData[index];
    }
  }

  onEnter({ trigger }) {
    // Fires when waypoint enters the boundary
    if (trigger && trigger !== this.activeItem) {
      this.activeItem = trigger;
    }
  }

  onPositionChange({ element, currentPosition }) {
    this.setStickyOffset();

    // If `activeItem` is undefined (could be first load), use the first item
    // with position 'below' to get the previous item, which is assumed to be
    // the most visible section
    if (!this.activeItem) {
      if (currentPosition === 'below') {
        let item = this.getItemByElement(element, -1);
        if (item) {
          this.activeItem = item.trigger;
        }
      }
    }
  }

  get stickyOffset() {
    if (!this.sticky) return;
    return (this.scrollOffsetEl?.offsetHeight || 0) + (this.scrollOffset || 0);
  }

  setStickyOffset() {
    const offset = this.stickyOffset;

    if (offset) {
      // Set TOC offset
      this.style.top = `${offset}px`;

      if (this.waypoint) {
        // Set Waypoint offset
        this.waypoint.options.stickyOffset = offset;
      }
    }
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    this.waypointData = this.getWaypointData();
    this.waypoint = new Waypoint({
      items: this.waypointData,
      topOffset: 0,
      bottomOffset: '75%',
      stickyOffset: this.stickyOffset || 0,
      onEnter: args => {
        this.onEnter(args);
      },
      onPositionChange: args => {
        this.onPositionChange(args);
      },
      // Show waypoint boundary on-screen
      // debug: true,
    });
  }

  render() {
    const classes = cx('c-bolt-toc', {
      [`c-bolt-toc--variant-${this.variant}`]:
        this.variant && this.variant !== 'transparent',
    });

    return html`
      <nav class="${classes}" aria-labelledby="js-bolt-toc-${this.uuid}">
        <strong
          class="${cx(`c-bolt-toc__header`, {
            [`c-bolt-toc__header--hidden`]: !this.header,
          })}"
          id="js-bolt-toc-${this.uuid}"
        >
          ${this.header ? this.header : 'Table of Contents'}
        </strong>
        <div class="${cx(`c-bolt-toc__list`)}" role="list">
          ${this.slotify('default')}
        </div>
      </nav>
    `;
  }
}

export { BoltToc };
