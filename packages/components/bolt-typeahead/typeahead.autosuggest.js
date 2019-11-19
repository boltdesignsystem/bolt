// @ts-nocheck
import { define, props } from 'skatejs';
import { h, withPreact } from '@bolt/core/renderers';
import { render } from '@bolt/core/renderers/renderer-lit-html';
import Fuse from 'fuse.js';
import ReactHtmlParser from 'react-html-parser';
import Mousetrap from 'mousetrap';
import Autosuggest from 'react-autosuggest';
import { createRef, Component } from 'preact';
import { shallowEqualArrays } from 'shallow-equal';
import { bind } from './classnames';
import styles from './typeahead.scoped.scss';
const cx = bind(styles);

// @todo: abstract this out and move into standalone / reusable wrapper component for using lit-based WCs in Preact without the diffing headaches!
class AutosuggestFooter extends Component {
  shouldComponentUpdate() {
    return false; // don't re-render via diff:
  }

  // if the parent component's props change, only re-render if the template values themselves have changed
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqualArrays(this.props.template.values, nextProps.template.values)
    ) {
      this.shouldRerender = true;
      this.componentDidMount();
    } else if (this.shouldRerender === true) {
      this.shouldRerender = false;
      this.componentDidMount();
    } else {
      this.shouldRerender === false;
    }
  }

  componentDidMount() {
    render(this.props.template, this.ref);
  }

  componentWillUnmount() {
    // component is about to be removed from the DOM, perform any cleanup.
  }

  render() {
    return (
      <div
        // eslint-disable-next-line no-return-assign
        ref={c => (this.ref = c)}
        className={this.props.className}
      />
    );
  }
}

export const highlightSearchResults = function(item) {
  const resultItem = item;
  resultItem.matches.forEach(matchItem => {
    const text = resultItem.item[matchItem.key];
    const result = [];
    const matches = [].concat(matchItem.indices);
    let pair = matches.shift();

    if (text) {
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
    }
  });
};

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
  get getParent() {
    if (this.getRootNode && this.useShadow === true) {
      return this.getRootNode().host;
    } else {
      return this.closest('bolt-typeahead');
    }
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
    };

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

    // if an input element exists when booting up, use the initial text value if it exists
    this._externalInputElement = this.querySelector('input[type="text"]');
    if (this._externalInputElement) {
      this.setState({
        value: this._externalInputElement.value || '',
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
      if (this.autosuggest && this.autosuggest.current) {
        this.autosuggest.current.input.removeEventListener(
          'click',
          this.onInputClick,
        );
        this.autosuggest.current.suggestionsContainer.removeEventListener(
          'click',
          this.onSuggestionsContainerClick,
        );
      }

      if (this.getParent) {
        this.getParent.removeEventListener('focus', this.onFocus);
        this.getParent.removeEventListener('blur', this.onBlur);
      }

      if (this.clearButton) {
        this.clearButton.removeEventListener('click', this.onClearButtonClick);
      }

      document.removeEventListener('click', this.onExternalClick);
      document.removeEventListener('keydown', this.onKeyUp);
    }
  }

  // handle auto-closing when hitting the escape key
  onKeyUp(e) {
    if (e.keyCode === 27 && this.state.isOpen) {
      this.wasClickedInside = false;
      this.setState({
        suggestions: [],
        isOpen: false,
      });
    }
  }

  // automatically close the dropdown when clicking outside of the Typeahead UI
  onExternalClick(e) {
    if (!this.getParent.contains(e.target) && this.state.isOpen) {
      this.wasClickedInside = false;
      this.setState({
        isOpen: false,
      });
    }
  }

  // auto-open when the input field itself is clicked on while being focused
  onInputClick(e) {
    this.setState({
      isOpen: true,
    });
  }

  // auto-clear the search input when clicking the clear button
  onClearButtonClick() {
    this.clearSearch();
  }

  // track clicks inside of the results container to know when a blur event should auto-close or not.
  onSuggestionsContainerClick(e) {
    if (!e.target.closest('.c-bolt-typeahead__result')) {
      this.wasClickedInside = true;
    }
  }

  // track when the UI in Typeahead loses focus
  // NOTE: we add a slight delay here to let the click event fire FIRST so we can better account for clicks vs keyboard usage
  onBlur(e) {
    setTimeout(() => {
      if (!this.wasClickedInside && this.state.isOpen === true) {
        this.setState({
          isOpen: false,
        });
      }
      this.wasClickedInside = false;
    }, 150);
  }

  // auto-open the results dropdown when focusing in on any Typeahead UI
  onFocus() {
    this.setState({
      isOpen: true,
    });
  }

  // if an external HTML input exists manually update the input value to match
  _updateInputFallback(newValue) {
    if (this.hasExternalInput) {
      this.hasExternalInput.setAttribute('value', newValue);
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

    if (value !== this.state.value) {
      this.setState({
        value,
      });

      this.onSuggestionsFetchRequested({ value }); // re-render search results immediately based on latest input value

      this.setState({
        isOpen: true,
      });
    }
  };

  toggleSearch() {
    if (!this.state.isOpen) {
      this.openSearch();
    } else {
      this.closeSearch();
    }
  }

  // clear the search input + refocus to allow the user to continue typing
  clearSearch() {
    this.wasClickedInside = true;
    this.setState({
      isOpen: true,
      value: '',
      suggestions: [],
    });

    setTimeout(() => {
      this._inputElement.focus();
    }, 20);
  }

  // manually displays the search result dropdown (if there are any results)
  openSearch() {
    this.setState({
      isOpen: true,
    });
  }

  // manually hides the the search result dropdown
  closeSearch() {
    this.setState({
      isOpen: false,
    });
  }

  // logic handling how suggestion values are interpretted.
  // can be overwritten via the getSuggestionValue event hook
  getSuggestionValue = suggestion => {
    if (this.getParent._listeners['getSuggestionValue']) {
      return this.getParent._listeners['getSuggestionValue'][0](
        this,
        suggestion,
      );
    } else {
      return suggestion.label;
    }
  };

  // customized UI that the search results are rendered within
  // we customize the default from react-autosuggest by adding optional footer UI
  renderSuggestionsContainer({ containerProps, children, query }) {
    return (
      <div {...containerProps}>
        {children}
        {this.getParent.footerTemplate && (
          <div class="c-bolt-typeahead__footer">
            <AutosuggestFooter
              template={this.getParent.footerTemplate(
                this.state.value,
                this.results,
              )}
              className="c-bolt-typeahead__footer-inner"
            />
          </div>
        )}
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
      highlightSearchResults(resultItem);
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
    this._fire('onChange', event, newValue, method);
    this.setState({ value: newValue });
  };

  // Autosuggest calls this every time you need to update suggestions.
  onSuggestionsFetchRequested = async ({ value }) => {
    await this._fire('onSuggestionsFetchRequested', value);
    await this.setState({ value });

    const suggestions = await this.getSuggestions(value);

    await this.setState({
      suggestions,
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
    this._inputElement.focus();
    this.setState({
      value: suggestion.suggestionValue,
      isOpen: false,
    });
  }

  // handles how an individual search result item is rendered
  renderSuggestion(suggestion, { query, isHighlighted }) {
    if (this.renderSuggestionTemplate) {
      return this.renderSuggestionTemplate(suggestion);
    } else {
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
  }

  /**
   * Customizes the rendering of the input.
   * @param {object} inputProps - Props passed to the rendered input. https://github.com/moroshko/react-autosuggest#inputprops-required
   */
  renderInputComponent(inputProps) {
    const { value } = this.state;

    this._fire('onRenderInput', value);

    return (
      <div
        className={cx(`c-bolt-typeahead__input-wrapper`, {
          [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'auto',
        })}>
        <input {...inputProps} />
      </div>
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
            this.state.isOpen &&
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
          alwaysRenderSuggestions={true}
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
  // manually adjusts aria behavior due to react-autosuggest API limitations
  rendered() {
    super.rendered && super.rendered();

    if (!this.hasEventListenersAdded) {
      this.hasEventListenersAdded = true;

      // register query selectors
      this._inputElement = this.autosuggest.current.input;
      this.clearButton = this.getParent.renderRoot.querySelector(
        '.c-bolt-typeahead__button--clear',
      );

      // add event listeners to manage the dropdown behavior in different use cases
      this.autosuggest.current.input.addEventListener(
        'click',
        this.onInputClick,
      );
      this.autosuggest.current.suggestionsContainer.addEventListener(
        'click',
        this.onSuggestionsContainerClick,
      );
      this.clearButton.addEventListener('click', this.onClearButtonClick);
      document.addEventListener('click', this.onExternalClick);
      document.addEventListener('keydown', this.onKeyUp);
      this.getParent.addEventListener('focus', this.onFocus);
      this.getParent.addEventListener('blur', this.onBlur);
    }

    if (this.state.isOpen && this.state.value && this.state.value.length > 0) {
      this.autosuggest.current.base.setAttribute('aria-expanded', true);
    } else {
      this.autosuggest.current.base.setAttribute('aria-expanded', false);
    }
  }
}

export { BoltAutosuggest };
