// @ts-nocheck
import { define, props } from 'skatejs';
import { h, withPreact } from '@bolt/core/renderers';
import { render } from '@bolt/core/renderers/renderer-lit-html';
import Fuse from 'fuse.js';
import ReactHtmlParser from 'react-html-parser';
import Mousetrap from 'mousetrap';
import Autosuggest from 'react-autosuggest';
import { Component } from 'preact';
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
    // console.log(matchItem);
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

  // @todo: replace with auto-wired up props approach used in Carousel
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
      this._setState({
        value: this._externalInputElement.value || '',
      });
    }

    // @todo: allow for this to be customized?
    Mousetrap.bind('command+shift+f', (e) => {
      this.toggleSearch();
    });

  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this._listeners = {};
  }

  _updateInputFallback(newValue) {
    if (this.hasExternalInput) {
      this.hasExternalInput.setAttribute('value', newValue);
    }
  }

  _setState(newValue) {
    super.setState && super.setState(newValue);

    if (newValue.value) {
      this.value = newValue.value;
      this._updateInputFallback(newValue.value);
    } else if (newValue.value === '') {
      this.value = '';
      this._updateInputFallback('');
    }
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
    this._setState({ value: newValue });
  };

  // Autosuggest calls this every time you need to update suggestions.
  onSuggestionsFetchRequested = async ({ value }) => {
    await this._fire('onSuggestionsFetchRequested', value);
    await this._setState({ isOpen: true });

    const suggestions = await this.getSuggestions(value);

    await this._setState({
      suggestions,
    });

    await this._fire('onSuggestionsReceived', suggestions);
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
          shouldRenderSuggestions={this.shouldRenderSuggestions}
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

  shouldRenderSuggestions(value) {
    if (value) {
      if (typeof value === 'function') {
        return value();
      }
      return value.trim();
    }
  }

  rendered() {
    super.rendered && super.rendered();
    this._inputElement = this.renderRoot.querySelector(
      '.js-c-typeahead__input',
    );
  }
}

export { BoltAutosuggest };
