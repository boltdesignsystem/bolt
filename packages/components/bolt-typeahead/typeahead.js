// @ts-nocheck
import { define, props } from 'skatejs';
// import { store } from '../../store.js'; // connect to redux
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
    noClearButton: props.boolean,
    clearButtonText: {
      ...props.string,
      ...{ default: 'Clear Search Results' },
    },
    inputValue: props.string,
    // fallbackMethod: props.string,
    // fallbackTarget: props.string,
    // fallbackAction: props.string,
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
      this.inputValue = this._externalInputElement.value || '';
      this.placeholder = this._externalInputElement.placeholder || '';
    }
  }

  clearSearch() {
    this.inputValue = '';
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
          suggestionValue: this.inputValue,
          suggestion: {
            label: this.inputValue,
          },
        });
      }
    }
  }

  render(data) {
    return html`
      ${this.addStyles([styles])}
      <bolt-autosuggest no-shadow
        .value=${data.inputValue}
        .items=${data.items}
        .placeholder=${data.placeholder}
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
            [`is-visible`]: data.inputValue !== '',
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
          this.inputValue = newValue;
        });

        this.autosuggest.on('onChange', (element, event, newValue) => {
          this.inputValue = newValue;
        });
      });
    }
  }
}

export { BoltTypeahead };
