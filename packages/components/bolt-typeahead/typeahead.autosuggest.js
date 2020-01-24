// @ts-nocheck
import { customElement } from '@bolt/element';
import { props } from 'skatejs';
import { h, withPreact, Fragment } from '@bolt/core-v3.x/renderers';
import { getUniqueId } from '@bolt/core-v3.x/utils/get-unique-id';
import Fuse from 'fuse.js';
import ReactHtmlParser from 'react-html-parser';
import Mousetrap from 'mousetrap';
import Autosuggest from 'react-autosuggest';
import { TypeaheadStatus } from './typeahead.status';
import { bind } from './classnames';

import styles from './typeahead.scoped.scss';
const cx = bind(styles);

export const highlightSearchResults = function(item) {
  const resultItem = item;
  resultItem.matches.forEach(matchItem => {
    const text = resultItem.item[matchItem.key];
    const result = [];
    const matches = [].concat(matchItem.indices);
    let pair = matches.shift();

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (pair && i === pair[0]) {
        result.push(
          `<strong class="${cx('c-bolt-typeahead__result-highlight')}">`,
        );
      }
      result.push(char);
      if (pair && i === pair[1]) {
        result.push('</strong>');
        pair = matches.shift();
      }
    }
    resultItem.item.highlightedLabel = result.join('');

    resultItem.item.highlightedLabel = ReactHtmlParser(
      resultItem.item.highlightedLabel,
    );

    if (resultItem.children && resultItem.children.length > 0) {
      resultItem.children.forEach(child => {
        highlightSearchResults(child);
      });
    }
  });
};

@customElement('bolt-autosuggest')
class BoltAutosuggest extends withPreact {
  get getParent() {
    return this.$parent;
  }

  a11yStatusResults(length, contentSelectedOption) {
    const words = {
      result: length === 1 ? 'result' : 'results',
      is: length === 1 ? 'is' : 'are',
    };
    return (
      <span>
        {length} {words.result} {words.is} available. {contentSelectedOption}
      </span>
    );
  }

  a11ySelectedOption(selectedOption, length, index) {
    return `${selectedOption} ${
      index + 1 <= length ? index + 1 : index
    } of ${length} is highlighted`;
  }

  a11yQueryTooShort(minQueryLength) {
    return `Type in ${minQueryLength} or more characters for results`;
  }

  a11yNoResults() {
    return 'No search results';
  }

  a11yAssistiveHint() {
    return 'When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.';
  }

  // @todo: replace with auto-wired up props approach originally used in Carousel
  static props = {
    placeholder: props.string,
    value: props.string,
    noHighlight: props.boolean,
    noClearButton: props.boolean,
    items: props.array,
    maxResults: {
      ...props.number,
      ...{ default: 10 },
    },
  };

  connecting() {
    super.connecting && super.connecting();
    // Keep an object of listener types mapped to callback functions
    this._listeners = {};
  }

  disconnecting() {
    super.disconnecting && super.disconnecting();
    // Keep an object of listener types mapped to callback functions
    this._listeners = {};

    // hack so that "ready" event will fire next time component connects,
    // and any external listeners will be re-added
    this._wasInitiallyRendered = false;
  }

  // return the parent that's rendering <bolt-autosuggest> based on Shadow DOM usage
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode
  //
  // @todo: move this into it's own decorator in Bolt Core?
  get $parent() {
    if (this.parentFound) {
      return this.parentFound;
    }

    if (this.getRootNode && this.useShadow === true) {
      this.parentFound = this.getRootNode().host;
    } else {
      this.parentFound = this.closest('bolt-typeahead');
    }
    return this.parentFound;
  }

  /**
   * Register a new callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  on(type, handler) {
    if (typeof this.getParent._listeners[type] === 'undefined') {
      this.getParent._listeners[type] = [];
    }

    this.getParent._listeners[type].push(handler);

    return this;
  }

  /**
   * Unregister an existing callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  off(type, handler) {
    var index = this.getParent._listeners[type].indexOf(handler);

    if (index > -1) {
      this.getParent._listeners[type].splice(index, 1);
    }

    return this;
  }

  /**
   * Iterate over all registered handlers for given type and call them all with
   * the dialog element as first argument, event as second argument (if any).
   *
   * @access private
   * @param {string} type
   * @param {Event} event
   */
  _fire(type, ...props) {
    var listeners = this.getParent._listeners[type] || [];

    listeners.forEach(
      function(listener) {
        listener(this, ...props);
      }.bind(this),
    );
  }

  // @ts-ignore
  constructor(self) {
    self = super(self);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    self.state = {
      value: '',
      suggestions: [],
      selectedOptionIndex: -1,
      selectedOptionText: null,
      shouldMenuAutoOpen: true,
    };

    // self.onChange = self.onChange.bind(self);
    self.renderSuggestionsContainer = self.renderSuggestionsContainer.bind(
      self,
    );
    self.toggleSearch = self.toggleSearch.bind(self);
    self.clearSearch = self.clearSearch.bind(self);
    self.closeSearch = self.closeSearch.bind(self);
    self.renderInputComponent = self.renderInputComponent.bind(self);
    self.openSearch = self.openSearch.bind(self);
    self.onSelected = self.onSelected.bind(self);
    self.renderSuggestion = self.renderSuggestion.bind(self);
    return self;
  }

  connected() {
    super.connected && super.connected();
    this.id = getUniqueId();
    const self = this;

    // if an input element exists when booting up, use the initial text value if it exists
    this._externalInputElement = this.querySelector('input[type="text"]');
    if (this._externalInputElement) {
      this._setState({
        value: this._externalInputElement.value || '',
      });
    }

    // @todo: allow for this to be customized?
    Mousetrap.bind('command+shift+f', function(e) {
      e.preventDefault();
      self.toggleSearch();
    });
  }

  _updateInputFallback(newValue) {
    if (this.hasExternalInput) {
      this.hasExternalInput.setAttribute('value', newValue);
    }
  }

  _setState(newValue) {
    this.setState(newValue);
  }

  // try to update up the external fallback input whenever the input value changes
  setState(newValue) {
    super.setState && super.setState(newValue);

    if (newValue.value) {
      this.value = newValue.value;
      this._updateInputFallback(newValue.value);
    } else if (newValue.value === '') {
      this.value = '';
      this._updateInputFallback('');
    }
  }

  _stateChanged(state) {
    // throw new Error('_stateChanged() not implemented', this);
    this.triggerUpdate();
  }

  onInput = e => {
    this._fire('onInput', e, e.target.value);
    let value = e.target.value;

    this._setState({
      value,
    });

    this.onSuggestionsFetchRequested({ value }); // re-render search results immediately based on latest input value
  };

  toggleSearch() {
    if (!this.state.isOpen) {
      this.openSearch();
    } else {
      this.closeSearch();
    }
  }

  clearSearch() {
    this._inputElement.focus();
    this._setState({
      value: '',
    });
  }

  openSearch() {
    this._inputElement.focus();
  }

  closeSearch() {
    document.activeElement.blur();
  }

  getSuggestionValue = suggestion => suggestion.label;

  // customized UI that the search results are rendered within
  // we customize the default from react-autosuggest by adding optional footer UI
  renderSuggestionsContainer({ containerProps, children, query }) {
    return (
      <div {...containerProps}>
        {children}
        <span id={`hint-${this.id || ''}`} style={{ display: 'none' }}>
          {this.$parent.a11yAssistiveHint
            ? this.$parent.a11yAssistiveHint()
            : this.a11yAssistiveHint()}
        </span>
      </div>
    );
  }

  // highlights keywords in the search results in a react-friendly way + limits the total number of results displayed
  async getSuggestions(value) {
    let items;

    // skip default onChange behavior if external listeners have hooked in
    if (!this.getParent._listeners['getSuggestions']) {
      items = this.getParent.items;
      this.items = items;
    } else {
      await new Promise(async resolve => {
        const listeners = this.getParent._listeners['getSuggestions'] || [];
        const listener = listeners[0];
        items = await listener(this, value);
        this.items = items;
        return resolve();
      });
    }

    // @todo: decide if / how this sorting / highlighting logic should stay built-in vs getting exposed via an external hook
    const fuseOptions = {
      shouldSort: true,
      threshold: 0.2,
      tokenize: true,
      includeScore: true,
      includeMatches: true,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      // @todo: re-enable description meta data after further testing + refinement
      // keys: ['label', 'description'],
      keys: ['label'],
    };
    const fuse = new Fuse(items, fuseOptions);
    this.results = fuse.search(value);

    this.results.forEach(resultItem => {
      highlightSearchResults(resultItem, cx);
    });

    this.results = this.results.filter(result => result.score <= 0.9);

    const reducedResults = this.results.reduce((total, result) => {
      total.push(result.item);
      return total;
    }, []);

    if (reducedResults.length < this.props.maxResults) {
      return reducedResults;
    } else {
      return reducedResults.slice(0, this.props.maxResults);
    }
  }

  /**
   * Autosuggest calls this when a search result is selected
   * @event onChange
   * @param {event} event - The onChange event emitted
   * @param {{newValue: string}} newValue - the updated input value
   */
  onChange = (event, { newValue, method }) => {
    this._fire('onChange', method, newValue);

    // @todo: replace this workaround with this.results.findIndex(findSelectedIndex) once `findIndex` can be safely polyfilled
    const suggestionIndex = this.results.indexOf(
      this.results.find(result => result.item.label === newValue),
    );

    this.setState({
      value: newValue,
      selectedOptionText: suggestionIndex === -1 ? null : newValue,
      selectedOptionIndex: suggestionIndex === -1 ? -1 : suggestionIndex,
    });
  };

  // Autosuggest calls this every time you need to update suggestions.
  onSuggestionsFetchRequested = async ({ value }) => {
    await this._fire('onSuggestionsFetchRequested', value);
    await this._setState({ isOpen: true });

    await this._setState({
      suggestions: await this.getSuggestions(value),
    });
  };

  // Autosuggest calls this every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this._fire('onSuggestionsClearRequested');
    this._setState({
      suggestions: [],
      isOpen: false,
    });
  };

  // maps to our custom onSelected event hook
  onSelected(event, suggestion) {
    this._fire('onSelected', event, suggestion);
    this._setState({ value: suggestion.suggestionValue });
    this.closeSearch();
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    return (
      <span
        className={cx('c-bolt-typeahead__result-text')}
        title={suggestion.description || ''}>
        {this.noHighlight
          ? suggestion.label
          : suggestion.highlightedLabel
          ? suggestion.highlightedLabel
          : suggestion.label}
      </span>
    );
  }

  /**
   * Customizes the rendering of the input.
   * @param {object} inputProps - Props passed to the rendered input. https://github.com/moroshko/react-autosuggest#inputprops-required
   */
  renderInputComponent(inputProps) {
    const { value } = this.state;
    this._fire('onRenderInput', value);

    return (
      <>
        <TypeaheadStatus
          id={`bolt-typeahead-status--${this.id}`}
          length={this.state.suggestions.length}
          queryLength={value.length}
          minQueryLength={0}
          selectedOption={this.state.selectedOptionText}
          selectedOptionIndex={this.state.selectedOptionIndex}
          isInFocus={true}
          tQueryTooShort={
            this.$parent.a11yQueryTooShort
              ? this.$parent.a11yQueryTooShort
              : this.a11yQueryTooShort
          }
          tNoResults={
            this.$parent.a11yNoResults
              ? this.$parent.a11yNoResults
              : this.a11yNoResults
          }
          tSelectedOption={
            this.$parent.a11ySelectedOption
              ? this.$parent.a11ySelectedOption
              : this.a11ySelectedOption
          }
          tResults={
            this.$parent.a11yStatusResults
              ? this.$parent.a11yStatusResults
              : this.a11yStatusResults
          }
        />
        <div className={cx(`c-bolt-typeahead__input-wrapper`, {})}>
          <input {...inputProps} />
        </div>
      </>
    );
  }

  render() {
    const { suggestions } = this.state;

    const shouldShowClearButton =
      (this.props.noClearButton !== undefined &&
        this.props.noClearButton !== true &&
        this.state.value !== '') ||
      this.value !== '';

    const theme = {
      container: cx('c-bolt-typeahead'),
      containerOpen: cx('c-bolt-typeahead--open'),
      input: cx('c-bolt-typeahead__input', 'js-c-typeahead__input', {
        [`c-bolt-typeahead__input--with-clear-button`]: shouldShowClearButton,
      }),
      inputOpen: cx('c-bolt-typeahead__input--open'),
      inputFocused: cx('c-bolt-typeahead__input--focused'),
      suggestionsContainer: cx('c-bolt-typeahead__menu'),
      suggestionsContainerOpen: cx('is-open'),
      suggestionsList: cx('c-bolt-typeahead__results'),
      suggestion: cx('c-bolt-typeahead__result'),
      suggestionFirst: cx('c-bolt-typeahead__result--first'),
      suggestionHighlighted: cx('has-cursor'),
      sectionContainer: cx('c-bolt-typeahead__section-container'),
      sectionContainerFirst: cx('c-bolt-typeahead__section-container--first'),
      sectionTitle: cx('c-bolt-typeahead__section-title'),
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: this.props.placeholder,
      value: this.state.value || this.value,
      onChange: this.onChange,
      onInput: this.onInput,
    };

    return (
      <div
        class={cx('c-bolt-typeahead__wrapper')}
        style={`--typeahead-height: ${this.offsetHeight}px;`}>
        {this.addStyles([styles])}
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          inputProps={inputProps}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={this.onSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInputComponent}
        />
      </div>
    );
  }

  rendered() {
    super.rendered && super.rendered();
    this._inputElement = this.renderRoot.querySelector(
      '.js-c-typeahead__input',
    );
  }
}

export { BoltAutosuggest };
