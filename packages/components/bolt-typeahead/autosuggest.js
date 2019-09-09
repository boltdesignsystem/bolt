// @ts-nocheck
import { define, props } from 'skatejs';
import { h, withPreact } from '@bolt/core/renderers';
import Fuse from 'fuse.js';
import ReactHtmlParser from 'react-html-parser';
import Mousetrap from 'mousetrap';
import Autosuggest from 'react-autosuggest';
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

@define
class BoltAutosuggest extends withPreact() {
  static is = 'bolt-autosuggest';

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  // static get consumes() {
  //   return [[TypeaheadContext, 'items']];
  // }

  static props = {
    placeholder: props.string,
    value: props.string,
    noHighlight: {
      ...props.boolean,
      ...{ default: false },
    },
    noClearButton: props.boolean,
    clearButtonText: {
      ...props.string,
      ...{ default: 'Clear Search Results' },
    },
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

  connecting() {
    super.connecting && super.connecting();
    // Keep an object of listener types mapped to callback functions
    this._listeners = {};
  }

  disconnecting() {
    super.disconnecting && super.disconnecting();
    // Keep an object of listener types mapped to callback functions
    this._listeners = {};
  }

  // return the parent that's rendering <bolt-autosuggest> based on Shadow DOM usage
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode
  //
  // @todo: move this into it's own decorator in Bolt Core?
  get getParent() {
    if (this.getRootNode) {
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
  constructor() {
    super();
    // self.useShadow = false;
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
    };

    // self.onChange = self.onChange.bind(self);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.openSearch = this.openSearch.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  connected() {
    super.connected && super.connected();

    this._externalInputElement = this.querySelector('input[type="text"]');
    if (this._externalInputElement) {
      this._setState({
        value: this._externalInputElement.value || '',
      });
    }

    const self = this;
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

    // skip default onInput behavior if external listeners have hooked in
    // if (this._listeners['onInput']) {
    //   return;
    // }

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

  // highlights keywords in the search results in a react-friendly way + limits the total number of results displayed
  getSuggestions(value) {
    this._fire('getSuggestions', value);

    const items = this.getParent.items;
    this.items = items;

    // skip default onChange behavior if external listeners have hooked in
    // @todo: decide if / how this logic should actually get fully bypassed when hooking into the getSuggestions method
    if (!this._listeners['getSuggestions']) {
      const fuseOptions = {
        shouldSort: true,
        threshold: 0.3,
        tokenize: true,
        includeMatches: true,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['label', 'description'],
      };
      const fuse = new Fuse(items, fuseOptions);
      const results = fuse.search(value);

      results.forEach(resultItem => {
        highlightSearchResults(resultItem);
      });

      const reducedResults = results.reduce((total, result) => {
        total.push(result.item);
        return total;
      }, []);

      if (reducedResults.length < this.props.maxResults) {
        return reducedResults;
      } else {
        return reducedResults.slice(0, this.props.maxResults);
      }
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
  onSuggestionsFetchRequested = ({ value }) => {
    this._fire('onSuggestionsFetchRequested', value);
    this._setState({ isOpen: true });

    this._setState({
      suggestions: this.getSuggestions(value),
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
        {this.noHighlight ? suggestion.label : suggestion.highlightedLabel}
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
      <div className={cx(`c-bolt-typeahead__input-wrapper`)}>
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
          suggestions={suggestions}
          inputProps={inputProps}
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
