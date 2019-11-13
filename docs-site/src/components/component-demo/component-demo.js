import { styleMap } from 'lit-html/directives/style-map.js';
import { BoltElement } from '@bolt/element';
import { html, customElement } from 'lit-element';

/**
 * Generates a UUID.
 * https://gist.github.com/jed/982883
 * @param {string|undefined=} a
 * @return {string}
 */
// @todo: move to Bolt Element's new utils file
const uuid = function b(a) {
  return a
    ? // eslint-disable-next-line no-bitwise
      (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

@customElement('bolt-component-demo')
class BoltComponentDemo extends BoltElement {
  static get properties() {
    return {
      theme: String,
    };
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.theme = this.theme || 'none';
    this.uuid = uuid();
  }

  switchTheme(themeName) {
    this.theme = themeName;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div
        class="u-bolt-flex-grow u-bolt-flex-shrink u-bolt-width-1/1 ${this
          .theme === ''
          ? ''
          : `t-bolt-${this.theme}`}"
        style="${styleMap({
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        })}"
      >
        <bolt-list
          class="u-bolt-padding-small-squished u-bolt-padding-bottom-none u-bolt-margin-bottom-none"
          tag="ul"
          display="inline"
          spacing="none"
          separator="none"
          align="end"
          valign="center"
          inset
        >
          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-none-${this.uuid}"
              name="radio-theme-picker-${this.uuid}"
              @click=${() => this.switchTheme('')}
              class="c-bolt-input c-bolt-input--radio is-filled"
              checked
            />

            <label
              for="theme-none-${this.uuid}"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >none</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-xlight-${this.uuid}"
              name="radio-theme-picker-${this.uuid}"
              @click=${() => this.switchTheme('xlight')}
              class="c-bolt-input c-bolt-input--radio"
            />

            <label
              for="theme-xlight-${this.uuid}"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >xlight</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-light-${this.uuid}"
              name="radio-theme-picker-${this.uuid}"
              @click=${() => this.switchTheme('light')}
              class="c-bolt-input c-bolt-input--radio is-filled"
            />

            <label
              for="theme-light-${this.uuid}"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >light</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-dark-${this.uuid}"
              name="radio-theme-picker-${this.uuid}"
              @click=${() => this.switchTheme('dark')}
              class="c-bolt-input c-bolt-input--radio is-filled"
            />

            <label
              for="theme-dark-${this.uuid}"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >dark</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-xdark-${this.uuid}"
              name="radio-theme-picker-${this.uuid}"
              @click=${() => this.switchTheme('xdark')}
              class="c-bolt-input c-bolt-input--radio is-filled"
            />

            <label
              for="theme-xdark-${this.uuid}"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >xdark</label
            >
          </bolt-list-item>
        </bolt-list>

        <div class="u-bolt-padding-small-squished">
          ${this.slotify('default')}
        </div>
      </div>
    `;
  }
}
