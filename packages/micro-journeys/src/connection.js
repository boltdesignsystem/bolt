import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './connection.scss';
import schema from './connection.schema';

let cx = classNames.bind(styles);

@define
class BoltConnection extends withLitHtml() {
  static is = 'bolt-connection';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const props = this.validateProps(this.props);
    const classes = cx('c-bolt-connection');
    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${this.slots.top &&
          html`
            <span class="c-bolt-connection__slot--top">
              ${this.slot('top')}
            </span>
          `}
        <bolt-svg-animations
          class="c-bolt-connection__main-image"
          speed="${props.speed}"
          anim-type="${props.animType}"
          direction="${props.direction}"
        />
        ${this.slots.bottom &&
          html`
            <span class="c-bolt-connection__slot--bottom">
              ${this.slot('bottom')}
            </span>
          `}
      </div>
    `;
  }
}

export { BoltConnection };
