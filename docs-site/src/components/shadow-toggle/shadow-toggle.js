/* --------------------------------
  NOTE: This is a fork of our upcoming <bolt-radio-switch> component!
  @todo: Once <bolt-radio-switch> is more fully baked, the majority of this code should be able to be cleared out
-------------------------------- */

import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import styles from './shadow-toggle.scss';

@define
class BoltShadowToggle extends withLitHtml() {
  static is = 'bolt-shadow-toggle';

  static props = {
    isIndeterminate: props.boolean,
    isEnabled: props.boolean,
    isDisabled: props.boolean,
  };

  constructor(props) {
    super(props);
    this.useShadow = false;
    this.onFormChange = this.onFormChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onReset = this.onReset.bind(this);

    this.isIndeterminate = window.localStorage.getItem('bolt-debug')
      ? false
      : true;
    this.isEnabled = window.localStorage.getItem('bolt-enable-shadow')
      ? true
      : null;
    this.isDisabled = window.localStorage.getItem('bolt-disable-shadow')
      ? true
      : null;
  }

  onReset() {
    this.isIndeterminate = true;
    this.isEnabled = null;
    this.isDisabled = null;

    window.localStorage.removeItem('bolt-debug');
    window.localStorage.removeItem('bolt-enable-shadow');
    window.localStorage.removeItem('bolt-disable-shadow');

    setTimeout(() => {
      document.location.search = '';
    }, 500);
  }

  onClick() {
    if (this.isIndeterminate === true) {
      this.isIndeterminate = false;
    }
  }

  onFormChange(value) {
    if (value === 'enable-shadow') {
      this.isEnabled = true;
      this.isDisabled = false;
      window.localStorage.setItem('bolt-debug', true);
      window.localStorage.setItem('bolt-enable-shadow', true);
      window.localStorage.removeItem('bolt-disable-shadow');

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else if (value === 'disable-shadow') {
      this.isEnabled = false;
      this.isDisabled = true;

      window.localStorage.setItem('bolt-debug', true);
      window.localStorage.setItem('bolt-disable-shadow', true);
      window.localStorage.removeItem('bolt-enable-shadow');

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  render() {
      // ${this.addStyles([styles])}
    return html`
      <div class="c-bolt-shadow-toggle__wrapper" @click=${this.onClick}>
        <ul
          class="c-bolt-shadow-toggle ${this.isIndeterminate === false
            ? 'is-enabled'
            : ''} ${this.isEnabled === true ? 'has-shadow-enabled' : ''} ${this
            .isDisabled === true
            ? 'has-shadow-disabled'
            : ''}"
        >
          <li class="c-bolt-shadow-toggle__item">
            <input
              value="enable-shadow"
              class="c-bolt-shadow-toggle__input reset"
              type="radio"
              ?checked=${this.isEnabled}
              name="shadowToggle"
              id="radio1"
              @change=${e => this.onFormChange(e.target.value)}
            />
            <label class="c-bolt-shadow-toggle__label" for="radio1">
              <svg viewBox="0 0 24 24" height="32" width="32">
                <title>Enable Shadow DOM</title>
                <path
                  d="M12 20.863c-0.38-0.215-0.972-0.57-1.655-1.049-0.679-0.476-1.442-1.068-2.175-1.761-0.849-0.803-1.641-1.725-2.22-2.739-0.079-0.137-0.153-0.276-0.223-0.417-0.248-0.496-0.441-1.009-0.566-1.536-0.104-0.442-0.161-0.895-0.161-1.361v-6.307l7-2.625 7 2.625v6.307c0 0.466-0.057 0.919-0.161 1.361-0.124 0.527-0.317 1.040-0.566 1.536-0.070 0.14-0.145 0.279-0.223 0.417-0.579 1.014-1.371 1.936-2.22 2.739-0.733 0.693-1.495 1.286-2.175 1.761-0.684 0.478-1.275 0.833-1.655 1.049zM12.447 22.894c0.028-0.014 1.041-0.522 2.355-1.442 0.74-0.518 1.583-1.171 2.402-1.947 0.945-0.894 1.878-1.967 2.582-3.2 0.096-0.168 0.188-0.34 0.276-0.515 0.309-0.618 0.559-1.276 0.723-1.971 0.138-0.582 0.215-1.19 0.215-1.819v-7c0-0.426-0.267-0.79-0.649-0.936l-8-3c-0.236-0.089-0.485-0.082-0.702 0l-8 3c-0.399 0.149-0.646 0.527-0.649 0.936v7c0 0.629 0.077 1.237 0.214 1.82 0.164 0.695 0.414 1.353 0.723 1.971 0.087 0.175 0.179 0.346 0.276 0.515 0.704 1.233 1.637 2.306 2.582 3.2 0.82 0.776 1.663 1.429 2.402 1.947 1.314 0.92 2.327 1.428 2.355 1.442 0.292 0.146 0.62 0.136 0.894 0z"
                  fill="currentColor"
                ></path>
              </svg>
            </label>
          </li>

          <li class="c-bolt-shadow-toggle__item">
            <input
              value="disable-shadow"
              class="c-bolt-shadow-toggle__input reset"
              type="radio"
              name="shadowToggle"
              ?checked=${this.isDisabled}
              id="radio2"
              @change=${e => this.onFormChange(e.target.value)}
            />
            <label class="c-bolt-shadow-toggle__label" for="radio2">
              <svg viewBox="0 0 24 24" height="32" width="32">
                <title>Disable Shadow DOM</title>
                <path
                  d="M20.645 14.296c0.241-0.776 0.358-1.567 0.355-2.3v-6.996c0-0.426-0.267-0.79-0.649-0.936l-8-3c-0.236-0.088-0.484-0.082-0.701 0l-3.16 1.18c-0.517 0.192-0.78 0.768-0.587 1.286s0.769 0.78 1.287 0.587l2.809-1.049 7.001 2.625v6.311c0.002 0.522-0.082 1.111-0.265 1.7-0.164 0.527 0.131 1.088 0.659 1.251s1.088-0.131 1.251-0.659zM5 6.414l11.231 11.231c-1.181 1.2-2.612 2.306-4.232 3.217-0.38-0.216-0.971-0.57-1.654-1.048-0.679-0.476-1.442-1.068-2.175-1.761-0.849-0.803-1.641-1.725-2.22-2.739-0.079-0.137-0.153-0.276-0.223-0.417-0.248-0.496-0.441-1.009-0.566-1.536-0.104-0.442-0.161-0.895-0.161-1.361zM0.293 1.707l2.824 2.825c-0.075 0.142-0.116 0.302-0.117 0.468v7c0 0.629 0.077 1.237 0.214 1.82 0.164 0.695 0.414 1.353 0.723 1.971 0.087 0.175 0.179 0.346 0.276 0.515 0.704 1.233 1.637 2.306 2.582 3.2 0.82 0.776 1.663 1.429 2.402 1.947 1.314 0.92 2.327 1.428 2.355 1.442 0.298 0.149 0.636 0.135 0.914-0.010 1.985-1.047 3.74-2.366 5.178-3.825l4.648 4.648c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-21.999-22.001c-0.391-0.391-1.024-0.391-1.414 0-0.39 0.39-0.391 1.023 0 1.414z"
                  fill="currentColor"
                ></path></svg
            ></label>
            <div aria-hidden="true" class="c-bolt-shadow-toggle__toggle">
              <span class="c-bolt-shadow-toggle__marker"></span>
            </div>
          </li>
        </ul>

        <div
          class="c-bolt-shadow-toggle__reset ${this.isIndeterminate === true
            ? 'is-enabled'
            : ''}"
        >
          <bolt-button
            color="text"
            size="xsmall"
            @click=${e => this.onReset(e.target.value)}
          >
            ${this.isIndeterminate
              ? 'Click to Override Shadow DOM'
              : this.isEnabled === true || this.isDisabled === true
              ? 'Reset Shadow DOM Overrides'
              : 'Choose An Override'}
          </bolt-button>
        </div>
      </div>
    `;
  }

  rendered() {
    if (!this._wasInitiallyRendered) {
      this._wasInitiallyRendered = true;
      if (
        window.localStorage.getItem('bolt-enable-shadow') ||
        window.localStorage.getItem('bolt-disable-shadow')
      ) {
        this.isEnabled = window.localStorage.getItem('bolt-enable-shadow')
          ? true
          : false;
        this.isDisabled = window.localStorage.getItem('bolt-disable-shadow')
          ? true
          : false;
      } else {
        var inputs = this.renderRoot.getElementsByTagName('input');

        for (var i = 0; i < inputs.length; i++) {
          inputs[i].indeterminate = true;
        }
      }
    }

    super.rendered && super.rendered();
  }
}

export { BoltShadowToggle };
