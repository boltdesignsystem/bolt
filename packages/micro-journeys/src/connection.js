import { html, customElement } from '@bolt/element';
import { props, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitContext, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './connection.scss';
import schema from './connection.schema';

let cx = classNames.bind(styles);

const boltConnectionIs = 'bolt-connection';

@customElement('bolt-connection')
class BoltConnection extends withLitContext {
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

  static get observedContexts() {
    return ['theme'];
  }

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent(`${BoltConnection.is}:connected`, {
          bubbles: true,
        }),
      );
    }, 0);
  }

  contextChangedCallback(name, oldValue, value) {
    this.triggerUpdate();
  }

  /**
   * Chrome gets confused about the linear gradient and renders it as nothing in
   * some arbitrary cases, specifically switching to a new step--but not always.
   * It needs to be re-rendered to make it show. Many other things attempted.
   */
  refreshLinearGradient() {
    // @TODO make this less dependent on `bolt-svg-animations` `connnectionBand` markup.
    // Turns out that selectors `#connectionGradientBG, stop` must all be refreshed to re-render.
    [
      ...this.renderRoot
        .querySelector('bolt-svg-animations')
        .renderRoot.querySelector('svg')
        .querySelectorAll('#connectionGradientBG, stop'),
    ].forEach(e => {
      e.style.display = 'none';
      setTimeout(() => {
        e.style.display = 'block';
      }, 0);
    });
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
          theme=${this.context.theme}
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

export { BoltConnection, boltConnectionIs };
