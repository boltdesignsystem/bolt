// @ts-nocheck
import { define, props } from 'skatejs';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { withEvents } from '@bolt/core/renderers/with-events';
import { bind } from './classnames';
import './typeahead.autosuggest'; // main Preact logic split from lit-html wrapper
import schema from './typeahead.schema.yml';

import styles from './typeahead.scoped.scss';
const cx = bind(styles);

@define
class BoltTypeahead extends withEvents(withLitHtml()) {
  static is = 'bolt-typeahead';

  // @todo: replace with auto-wired up props approach used in Carousel
  static props = {
    renderSuggestionTemplate: props.any,
    keys: {
      ...props.array,
      ...{ default: schema.properties.keys.default },
    },
    inputPlaceholder: props.string,
    inputValue: props.string,
    noHighlight: props.boolean,
    clearInputText: {
      ...props.string,
      ...{ default: 'Clear search results' },
    },
    items: props.array,
    submitButtonText: {
      ...props.string,
      ...{ default: 'Submit search query' },
    },
    maxResults: {
      ...props.number,
      ...{ default: 10 },
    },
  };

  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.clearSearch = self.clearSearch.bind(self);
    self.submit = self.submit.bind(self);
    self.on = self.on.bind(self);
    return self;
  }

  connected() {
    super.connected && super.connected();

    this._externalInputElement = this.querySelector('input[type="text"]');
    if (this._externalInputElement) {
      this.inputValue = this._externalInputElement.value || '';
      this.inputPlaceholder = this._externalInputElement.placeholder || '';
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

  render() {
    return html`
      ${this.addStyles([styles])}
      <bolt-autosuggest
        .renderSuggestionTemplate=${this.renderSuggestionTemplate}
        .keys=${this.keys}
        .value=${this.inputValue}
        .items=${this.items}
        .maxResults=${this.maxResults}
        .noHighlight=${this.noHighlight}
        .placeholder=${this.inputPlaceholder}
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
            [`is-visible`]: this.inputValue !== '',
          },
        )}
      >
        ${this.clearInputText}
        <bolt-icon
          name="close-solid"
          slot="before"
          class=${cx('c-bolt-typeahead__icon')}
          title=${this.clearInputText}
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
