// @ts-nocheck
import { define, props } from 'skatejs';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { withEvents } from '@bolt/core/renderers/with-events';
import { bind } from './classnames';
import './autosuggest';

import styles from './typeahead.scoped.scss';
const cx = bind(styles);

@define
class BoltTypeahead extends withEvents(withLitHtml()) {
  static is = 'bolt-typeahead';

  static props = {
    placeholder: props.string,
    clearButtonText: {
      ...props.string,
      ...{ default: 'Clear Search Results' },
    },
    initialValue: props.string,
    items: props.array,
    submitButtonText: {
      ...props.string,
      ...{ default: 'Submit' },
    },
    maxResults: {
      ...props.number,
      ...{ default: 10 },
    },
  };

  // @ts-ignore
  constructor() {
    super();
    this.clearSearch = this.clearSearch.bind(this);
    this.submit = this.submit.bind(this);
    this.on = this.on.bind(this);
  }

  connected() {
    super.connected && super.connected();

    this._externalInputElement = this.querySelector('input[type="text"]');
    if (this._externalInputElement) {
      this.initialValue = this._externalInputElement.value || '';
      this.placeholder = this._externalInputElement.placeholder || '';
    }
  }

  clearSearch() {
    this.initialValue = '';
    this.autosuggest.clearSearch();
  }

  submit() {
    var evt = new KeyboardEvent('keypress', {
      keyCode: 13,
      which: 13,
      key: 'Enter',
    });
    this.autosuggest.dispatchEvent(evt);
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.autosuggest.onSelected(e, {
          suggestionValue: this.initialValue,
          suggestion: {
            label: this.initialValue,
          },
        });
      }
    }
  }

  render() {
    return html`
      ${this.addStyles([styles])}
      <bolt-autosuggest
        .value=${this.initialValue}
        .items=${this.items}
        .placeholder=${this.placeholder}
        @keypress=${this.handleKeyPress.bind(this)}
      ></bolt-autosuggest>
      <bolt-button
        type="submit"
        color="text"
        icon-only
        @click=${this.submit}
        class=${cx(
          'c-bolt-typeahead__button',
          'c-bolt-typeahead__button--submit',
        )}
      >
        ${this.submitButtonText}
        <bolt-icon
          name="search"
          class=${cx('c-bolt-typeahead__icon')}
          title=${this.submitButtonText}
          slot="before"
        ></bolt-icon>
      </bolt-button>

      <bolt-button
        color="text"
        icon-only
        type="reset"
        @click=${this.clearSearch}
        class=${cx(
          'c-bolt-typeahead__button',
          'c-bolt-typeahead__button--clear',
          {
            [`is-visible`]: this.initialValue !== '',
          },
        )}
      >
        ${this.clearButtonText}
        <bolt-icon
          name="close-solid"
          slot="before"
          class=${cx('c-bolt-typeahead__icon')}
          title=${this.clearButtonText}
        />
      </bolt-button>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

    if (!this.autosuggest) {
      this.autosuggest = this.renderRoot.querySelector('bolt-autosuggest');
      this.autosuggest.addEventListener('ready', () => {
        this.autosuggest.on('onInput', (element, event, newValue) => {
          this.initialValue = newValue;
        });

        this.autosuggest.on('onChange', (element, event, newValue) => {
          this.initialValue = newValue;
        });
      });
    }
  }
}

export { BoltTypeahead };
