// @ts-nocheck
import { html, customElement } from '@bolt/element';
import { props } from 'skatejs';
import { withLitEvents } from '@bolt/core-v3.x/renderers/with-events';
import { bind } from './classnames';
import './typeahead.autosuggest'; // main Preact logic split from lit-html wrapper
import styles from './typeahead.scoped.scss';

const cx = bind(styles);

@customElement('bolt-typeahead')
class BoltTypeahead extends withLitEvents {
  // @todo: replace with auto-wired up props approach used in Carousel
  static props = {
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

  disconnected() {
    super.disconnected && super.disconnected();

    // hack so that "ready" event will fire next time component connects,
    // and any external listeners will be re-added
    this._wasInitiallyRendered = false;
  }

  clearSearch() {
    this.inputValue = '';
    this.autosuggest.clearSearch();
  }

  submit(e) {
    this.handleSelected(e);

    // prevent default behavior or form submits multiple times
    e.preventDefault();
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.handleSelected(e);
      }
    }
  }

  handleSelected(e) {
    this.autosuggest.onSelected(e, {
      suggestionValue: this.inputValue,
      suggestion: {
        label: this.inputValue,
      },
    });
  }

  render() {
    return html`
      ${this.addStyles([styles])}
      <bolt-autosuggest
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

    const setupEventHandlers = () => {
      this.autosuggest.on('onInput', (element, event, newValue) => {
        this.inputValue = newValue;
      });

      this.autosuggest.on('onChange', (element, event, newValue) => {
        this.inputValue = newValue;
      });
    };

    if (!this.autosuggest) {
      this.autosuggest = this.renderRoot.querySelector('bolt-autosuggest');

      if (this.autosuggest._wasInitiallyRendered) {
        setupEventHandlers();
      }

      this.autosuggest.addEventListener('ready', e => {
        if (e.detail.name === 'bolt-autosuggest') {
          setupEventHandlers();
        }
      });
    }
  }
}

export { BoltTypeahead };
