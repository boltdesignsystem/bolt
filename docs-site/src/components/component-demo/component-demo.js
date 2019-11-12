import { styleMap } from 'lit-html/directives/style-map.js';
import { BoltElement } from '@bolt/element';
import { html, customElement } from 'lit-element';

@customElement('bolt-component-demo')
class BoltComponentDemo extends BoltElement {
  static get properties() {
    return {
      theme: String,
    };
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
              id="theme-none"
              name="radio-theme-picker"
              @click=${() => this.switchTheme('')}
              class="c-bolt-input c-bolt-input--radio is-filled"
              checked
            />

            <label
              for="theme-none"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >none</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-xlight"
              name="radio-theme-picker"
              @click=${() => this.switchTheme('xlight')}
              class="c-bolt-input c-bolt-input--radio"
            />

            <label
              for="theme-xlight"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >xlight</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-light"
              name="radio-theme-picker"
              @click=${() => this.switchTheme('light')}
              class="c-bolt-input c-bolt-input--radio is-filled"
            />

            <label
              for="theme-light"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >light</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-dark"
              name="radio-theme-picker"
              @click=${() => this.switchTheme('dark')}
              class="c-bolt-input c-bolt-input--radio is-filled"
            />

            <label
              for="theme-dark"
              class="c-bolt-inline-label c-bolt-inline-label--radio"
              >dark</label
            >
          </bolt-list-item>

          <bolt-list-item class="u-bolt-margin-left-small">
            <input
              type="radio"
              id="theme-xdark"
              name="radio-theme-picker"
              @click=${() => this.switchTheme('xdark')}
              class="c-bolt-input c-bolt-input--radio is-filled"
            />

            <label
              for="theme-xdark"
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
