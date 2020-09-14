import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { mapWithDepth } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import styles from './li.scss';
import schema from '../li.schema';

let cx = classNames.bind(styles);

@customElement('bolt-li')
class BoltListItem extends BoltElement {
  static schema = schema;

  // static props = {
  //   last: {
  //     ...props.boolean,
  //     ...{ default: false },
  //   },
  //   level: {
  //     ...props.number,
  //     ...{ default: 0 },
  //   },
  //   type: {
  //     ...props.string,
  //     ...{ default: 'ul' },
  //   },
  // };
  static get properties() {
    return {
      last: { type: Boolean },
      level: { type: Number },
      type: { type: String },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    // @DAN lets talk about this

    this.type =
      this.parentNode.tagName === 'BOLT-OL' || this.parentNode.tagName === 'OL'
        ? 'ol'
        : 'ul';
    this.level =
      this.parentNode.level && this.type === 'ul'
        ? this.parentNode.level
        : this.level;
    // @DAN WHAT DO I DO
  }

  render() {
    const classes = cx('c-bolt-li', {
      [`c-bolt-li--l${this.level}`]: this.level,
      [`c-bolt-li--${this.type}-item`]: this.type,
      [`c-bolt-li--last-item`]: this.last,
      [`c-bolt-li--level-${this.level % 3 !== 0 ? this.level % 3 : 3}`]: this
        .level, // allow up to 3 levels of nested styles before repeating
    });

    // helper function called by the mapWithDepth util to increment the depth of nested children
    function addNestedLevelProps(childNode, depth) {
      childNode.level = depth + 1;
    }

    // this.slotMap.get('default') = this.slotMap
    //   .get('default')
    //   .map(mapWithDepth(this.level, addNestedLevelProps));

    return html`
      <div class="${classes}" role="listitem">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltListItem };
