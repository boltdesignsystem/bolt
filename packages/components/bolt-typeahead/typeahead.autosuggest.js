// @ts-nocheck
import { define, props } from 'skatejs';
import { h, withPreact, Fragment } from '@bolt/core/renderers';
import { createRef } from 'preact';
import { getUniqueId } from '@bolt/core/utils/get-unique-id';
import Fuse from 'fuse.js';
import Mousetrap from 'mousetrap';
import Autosuggest from 'react-autosuggest';
import { highlightSearchResults } from './typeahead.utils';
import { TypeaheadFooter } from './typeahead.footer';
import { TypeaheadStatus } from './typeahead.status';
import { bind } from './classnames';
import styles from './typeahead.scoped.scss';
const cx = bind(styles);

@define
class BoltAutosuggest extends withPreact() {
  static is = 'bolt-autosuggest';

  // @todo: replace with auto-wired up props approach originally used in Carousel
  static props = {
    renderSuggestionTemplate: props.any,
    keys: props.array,
    theme: props.string,
    noSort: props.boolean,
    noFilter: props.boolean,
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
    if (typeof this.$parent._listeners[type] === 'undefined') {
      this.$parent._listeners[type] = [];
    }

    this.$parent._listeners[type].push(handler);

    return this;
  }

  /**
   * Unregister an existing callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  off(type, handler) {
    var index = this.$parent._listeners[type].indexOf(handler);

    if (index > -1) {
      this.$parent._listeners[type].splice(index, 1);
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
    var listeners = this.$parent._listeners[type] || [];

    listeners.forEach(
      function(listener) {
        listener(this, ...props);
      }.bind(this),
    );
  }

  tStatusQueryTooShort(minQueryLength) {
    return `Type in ${minQueryLength} or more characters for results`;
  }

  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.results = [];
    self.autosuggest = createRef();
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

    self.itemProps = ({ sectionIndex, itemIndex }) => {
      return {
        'data-section-index': sectionIndex,
        'data-suggestion-index': itemIndex,
        onMouseEnter: this.$autosuggest.onSuggestionMouseEnter,
        onMouseLeave: this.$autosuggest.onSuggestionMouseLeave,
        onMouseDown: this.$autosuggest.onSuggestionMouseDown,
        onTouchStart: this.$autosuggest.onSuggestionTouchStart,
        onTouchMove: this.$autosuggest.onSuggestionTouchMove,
        onClick: this.$autosuggest.onSuggestionClick,
        tabindex: -1,
        ariaPosinset: itemIndex + 1,
        ariaSetsize: this.state.suggestions.length + 1,
      };
    };

    self.assistiveHint =
      'When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.';

    // self.onChange = self.onChange.bind(self);
    self.renderSuggestionsContainer = self.renderSuggestionsContainer.bind(
      self,
    );
    self.toggleSearch = self.toggleSearch.bind(self);
    self.clearSearch = self.clearSearch.bind(self);
    self.closeSearch = self.closeSearch.bind(self);

    self.onKeyUp = self.onKeyUp.bind(self);
    self.onExternalClick = self.onExternalClick.bind(self);
    self.onInputClick = self.onInputClick.bind(self);
    self.onClearButtonClick = self.onClearButtonClick.bind(self);
    self.onSuggestionsContainerClick = self.onSuggestionsContainerClick.bind(
      self,
    );
    self.onFocus = self.onFocus.bind(self);
    self.onBlur = self.onBlur.bind(self);
    self.renderInputComponent = self.renderInputComponent.bind(self);
    self.openSearch = self.openSearch.bind(self);
    self.onSelected = self.onSelected.bind(self);
    self.renderSuggestion = self.renderSuggestion.bind(self);
    return self;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this._listeners = {};
    this.id = getUniqueId();

    // if an input element exists when booting up, use the initial text value if it exists
    this.$externalInput = this.querySelector('input[type="text"]');
    if (this.$externalInput) {
      this.setState({
        value: this.$externalInput.value || '',
      });
    }

    // @todo: allow for this to be customized?
    Mousetrap.bind('command+shift+f', e => {
      this.toggleSearch();
    });
  }

  // clean up any external event hooks when tearing down
  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this._listeners = {};

    // remove event listeners if they exist
    if (this.hasEventListenersAdded) {
      this.$input.removeEventListener('click', this.onInputClick);
      this.$autosuggest.suggestionsContainer.removeEventListener(
        'click',
        this.onSuggestionsContainerClick,
      );

      this.$clearButton.removeEventListener('click', this.onClearButtonClick);
      document.removeEventListener('click', this.onExternalClick);
      document.removeEventListener('keydown', this.onKeyUp);

      this.$input.removeEventListener('focus', this.onFocus);
      this.$clearButton.removeEventListener('focus', this.onFocus);
      this.$submitButton.removeEventListener('focus', this.onFocus);

      this.$input.removeEventListener('blur', this.onBlur);
      this.$clearButton.removeEventListener('blur', this.onBlur);
      this.$submitButton.removeEventListener('blur', this.onBlur);
    }
  }

  // handle auto-closing when hitting the escape key
  onKeyUp(e) {
    if (e.keyCode === 27 && this.state.menuOpen) {
      this.wasClickedInside = false;
      this.setState({
        suggestions: [],
        menuOpen: false,
      });
    }
  }

  // automatically close the dropdown when clicking outside of the Typeahead UI
  onExternalClick(e) {
    if (!this.$parent.contains(e.target) && this.state.menuOpen) {
      this.wasClickedInside = false;
      this.setState({
        menuOpen: false,
      });
    }
  }

  // auto-open when the input field itself is clicked on while being focused
  onInputClick(e) {
    this.setState({
      menuOpen: true,
    });
  }

  // auto-clear the search input when clicking the clear button
  onClearButtonClick() {
    this.clearSearch();
  }

  // track clicks inside of the results container to know when a blur event should auto-close or not.
  onSuggestionsContainerClick(e) {
    const resultsContainer = this.$autosuggest.suggestionsContainer.querySelector(
      '.c-bolt-typeahead__results',
    );

    if (resultsContainer && resultsContainer.contains(e.target)) {
      this.wasClickedInside = true;
    }
  }

  // track when the UI in Typeahead loses focus
  // NOTE: we add a slight delay here to let the click event fire FIRST so we can better account for clicks vs keyboard usage
  onBlur(e) {
    this.selectedOptionText = null;
    this.selectedOptionIndex = null;
    setTimeout(() => {
      if (this.$parent.contains(document.activeElement)) {
        return;
      }
      if (!this.wasClickedInside && this.state.menuOpen === true) {
        this.setState({
          menuOpen: false,
        });
      }
    }, 150);
  }

  // auto-open the results dropdown when focusing in on any Typeahead UI
  // skip auto-opening when refocusing on input after selecting an item
  onFocus() {
    this.state.selectedOptionText = null;
    this.state.selectedOptionIndex = null;
    if (
      this.state.menuOpen === false &&
      this.state.shouldMenuAutoOpen === true
    ) {
      this.setState({
        menuOpen: true,
      });
    } else if (this.state.shouldMenuAutoOpen === false) {
      this.state.shouldMenuAutoOpen = true;
    }
  }

  // if an external HTML input exists manually update the input value to match
  _updateInputFallback(newValue) {
    if (this.$externalInput) {
      this.$externalInput.setAttribute('value', newValue);
    }
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

  // get new search suggestions when the input value changes
  onInput = e => {
    this._fire('onInput', e, e.target.value);
    let value = e.target.value;

    this.setState({
      value,
    });

    // re-render search results immediately based on latest input value
    this.onSuggestionsFetchRequested({ value });
  };

  toggleSearch() {
    if (!this.state.menuOpen) {
      this.openSearch();
    } else {
      this.closeSearch();
    }
  }

  // clear the search input + refocus to allow the user to continue typing
  clearSearch() {
    this.wasClickedInside = true;
    this.setState({
      menuOpen: true,
      value: '',
      suggestions: [],
    });

    setTimeout(() => {
      this.$input.focus();
    }, 50);
  }

  // manually displays the search result dropdown (if there are any results)
  openSearch() {
    this.setState({
      menuOpen: true,
    });
  }

  // manually hides the the search result dropdown
  closeSearch() {
    this.setState({
      menuOpen: false,
    });
  }

  // logic handling how suggestion values are interpretted.
  // can be overwritten via the getSuggestionValue event hook
  getSuggestionValue = suggestion => {
    if (this.$parent._listeners['getSuggestionValue']) {
      return this.$parent._listeners['getSuggestionValue'][0](this, suggestion);
    } else {
      return suggestion.label;
    }
  };

  tStatusNoResults() {
    return 'No search results';
  }

  tStatusResults(length, contentSelectedOption) {
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

  tSelectedOption(selectedOption, length, index) {
    return `${selectedOption} ${
      index + 1 <= length ? index + 1 : index
    } of ${length} is highlighted`;
  }

  // customized UI that the search results are rendered within
  // we customize the default from react-autosuggest by adding optional footer UI
  renderSuggestionsContainer({ containerProps, children, query }) {
    return (
      <div {...containerProps}>
        {children}
        {this.$parent.footerTemplate && (
          <div class="c-bolt-typeahead__footer">
            <TypeaheadFooter
              template={this.$parent.footerTemplate(
                this.state.value,
                this.results,
              )}
              className="c-bolt-typeahead__footer-inner"
            />
          </div>
        )}
        <span
          id={this.assistiveHintID || `hint-${this.id}`}
          style={{ display: 'none' }}>
          {this.assistiveHint}
        </span>
      </div>
    );
  }

  // highlights keywords in the search results in a react-friendly way + limits the total number of results displayed
  async getSuggestions(value) {
    let items;

    // skip default onChange behavior if external listeners have hooked in
    if (!this.$parent._listeners['getSuggestions']) {
      items = this.$parent.items;
      this.items = items;
    } else {
      await new Promise(async resolve => {
        const listeners = this.$parent._listeners['getSuggestions'] || [];
        const listener = listeners[0];
        items = await listener(this, value);
        this.items = items;
        return resolve();
      });
    }

    // @todo: decide if / how this sorting / highlighting logic should stay built-in vs getting exposed via an external hook
    // with the new noSort / noFilter props this entire piece of logic can be bypassed
    const fuseOptions = {
      shouldSort: this.noSort ? false : true,
      threshold: this.noFilter ? 1.0 : 0.2,
      tokenize: true,
      includeScore: true,
      includeMatches: true,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      // @todo: re-enable description meta data after further testing + refinement
      keys: this.keys,
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
    this._fire('onChange', newValue, method);

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
    // exit early if we're trying to stop displaying any new results (ex. if a result was just selected).
    // Workaround to default Autosuggest behavior trying to keep returning back new results -- even after selecting an option
    if (this.state.shouldMenuAutoOpen === false) {
      this.state.shouldMenuAutoOpen = true;
      return;
    }
    await this._fire('onSuggestionsFetchRequested', value);
    await this.setState({ value });

    let suggestions = await this.getSuggestions(value);

    // eliminate duplicate results when an option has been picked + only one result shows up
    if (suggestions && suggestions.length === 1) {
      if (suggestions[0].label === this.state.value) {
        suggestions = [];
      }
    }

    await this.setState({
      suggestions,
      menuOpen: true,
    });

    await this._fire('onSuggestionsReceived', suggestions);
  };

  // Autosuggest calls this every time you need to clear suggestions.
  // we handle this logic separately to reduce the # of times the UI gets wiped
  onSuggestionsClearRequested = () => {
    this._fire('onSuggestionsClearRequested');
  };

  // maps to our custom onSelected event hook
  // this fires whenever a suggested result is selected via mouse or keyboard
  onSelected(event, suggestion) {
    this._fire('onSelected', event, suggestion);
    this.state.shouldMenuAutoOpen = false;
    this.state.value = suggestion.suggestionValue;
    this.state.menuOpen = false;
    this.state.suggestions = [];
  }

  // handles how an individual search result item is rendered
  renderSuggestion(suggestion, { query, isHighlighted }) {
    const Tag = suggestion.url ? 'span' : 'span';

    if (this.renderSuggestionTemplate) {
      return this.renderSuggestionTemplate(suggestion);
    } else {
      return (
        <Tag
          href={suggestion.url || undefined}
          className={cx('c-bolt-typeahead__result-item')}
          title={suggestion.description || ''}>
          {this.noHighlight
            ? suggestion.label
            : suggestion.highlightedLabel
            ? suggestion.highlightedLabel
            : suggestion.label}
        </Tag>
      );
    }
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
          isInFocus={false}
          tSelectedOption={this.tSelectedOption}
        />
        <div
          className={cx(`c-bolt-typeahead__input-wrapper`, {
            [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'auto',
          })}>
          <input {...inputProps} />
        </div>
      </>
    );
  }

  // render the Autosuggest react component + assign classes based on state / props
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
      suggestionsContainerOpen: cx(''),
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
        class={cx('c-bolt-typeahead__wrapper', {
          'is-open':
            this.state.menuOpen &&
            this.state.suggestions &&
            this.state.suggestions.length > 0,
        })}
        style={`--typeahead-height: ${this.offsetHeight}px;`}>
        {this.addStyles([styles])}
        <Autosuggest
          theme={theme}
          ref={this.autosuggest}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          suggestions={suggestions}
          inputProps={inputProps}
          focusInputOnSuggestionClick={true}
          alwaysRenderSuggestions={true} // required to allow clicks on custom footer!
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

  // check if results should be displayed based on the data structure
  shouldRenderSuggestions(value) {
    if (value) {
      if (typeof value === 'function') {
        return value();
      }
      return value.trim();
    }
  }

  // setup initial event listeners + cache common DOM selectors
  rendered() {
    super.rendered && super.rendered();

    if (!this.hasEventListenersAdded) {
      this.hasEventListenersAdded = true;

      // register query selectors
      this.$autosuggest = this.autosuggest.current;
      this.$autosuggest.itemProps = this.itemProps;
      this.$input = this.$autosuggest.input;
      this.$clearButton = this.$parent.renderRoot.querySelector(
        '.c-bolt-typeahead__button--clear',
      );
      this.$submitButton = this.$parent.renderRoot.querySelector(
        '.c-bolt-typeahead__button--submit',
      );

      // add event listeners to manage the dropdown behavior in different use cases
      this.$input.addEventListener('click', this.onInputClick);
      this.$autosuggest.suggestionsContainer.addEventListener(
        'click',
        this.onSuggestionsContainerClick,
      );

      this.$clearButton.addEventListener('click', this.onClearButtonClick);
      document.addEventListener('click', this.onExternalClick);
      document.addEventListener('keydown', this.onKeyUp);

      this.$input.addEventListener('focus', this.onFocus);
      this.$clearButton.addEventListener('focus', this.onFocus);
      this.$submitButton.addEventListener('focus', this.onFocus);

      this.$input.addEventListener('blur', this.onBlur);
      this.$clearButton.addEventListener('blur', this.onBlur);
      this.$submitButton.addEventListener('blur', this.onBlur);
    }

    // manually adjusts aria behavior due to react-autosuggest API limitations
    if (
      this.state.menuOpen &&
      this.state.suggestions &&
      this.state.suggestions.length > 0
    ) {
      this.$autosuggest.base.setAttribute('aria-expanded', true);
    } else {
      this.$autosuggest.base.setAttribute('aria-expanded', false);
    }
  }
}

export { BoltAutosuggest };
