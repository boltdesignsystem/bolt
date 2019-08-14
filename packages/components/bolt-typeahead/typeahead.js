// @ts-nocheck
import { define, props } from 'skatejs';
// import { store } from '../../store.js'; // connect to redux
import { h, withPreact } from '@bolt/core/renderers';
import { withEvents } from '@bolt/core/renderers/with-events';
import Fuse from 'fuse.js';
import ReactHtmlParser from 'react-html-parser';
import Mousetrap from 'mousetrap';
import VisuallyHidden from '@reach/visually-hidden';
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
class BoltTypeahead extends withEvents(withPreact()) {
  static is = 'bolt-typeahead';

  static props = {
    placeholder: props.string,
    noClearButton: props.boolean,
    clearButtonText: props.string,
    submitButtonText: props.string,
    maxResults: {
      ...props.string,
      ...{ default: 10 },
    },
  };

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
    };

    // self.onChange = self.onChange.bind(self);
    self.toggleSearch = self.toggleSearch.bind(self);
    self.clearSearch = self.clearSearch.bind(self);
    self.closeSearch = self.closeSearch.bind(self);
    self.renderInputComponent = self.renderInputComponent.bind(self);
    self.openSearch = self.openSearch.bind(self);
    self.onSelected = self.onSelected.bind(self);

    return self;
  }

  connecting() {
    super.connecting && super.connecting();
    this.items = this.items || [];
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
      // this.hasExternalInput.value = value;
      this.hasExternalInput.setAttribute('value', newValue);
    }
  }

  _setState(newValue) {
    super.setState && super.setState(newValue);

    if (newValue.value) {
      this._updateInputFallback(newValue.value);
    } else if (newValue.value === '') {
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
    if (this._listeners['onInput']) {
      return;
    }

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

    console.log(this._listeners['getSuggestions']);

    // skip default onChange behavior if external listeners have hooked in
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
      const fuse = new Fuse(this.items, fuseOptions);
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
  onChange = (event, { newValue }) => {
    this._fire('onChange', event, newValue);
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
    // console.log('onSuggestionsClearRequested');
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
        {suggestion.label}
      </span>
    );
  }

  /**
   * Customizes the rendering of the input.
   * @param {object} inputProps - Props passed to the rendered input. https://github.com/moroshko/react-autosuggest#inputprops-required
   */
  renderInputComponent(inputProps) {
    const { value } = this.state;

    const shouldShowClearButton =
      this.props.noClearButton !== undefined &&
      this.props.noClearButton !== true &&
      value !== '';

    const clearButtonText = this.props.clearButtonText
      ? this.props.clearButtonText
      : 'Clear Search Results';

    const submitButtonText = this.props.submitButtonText
      ? this.props.submitButtonText
      : 'Submit';

    return (
      <div
        className={cx(`c-bolt-typeahead__input-wrapper`, {
          [`c-bolt-typeahead__input-wrapper--with-clear-button`]: shouldShowClearButton,
        })}>
        <input {...inputProps} />
        {shouldShowClearButton && (
          <bolt-button
            color="text"
            icon-only
            type="reset"
            className={cx(
              'c-bolt-typeahead__button',
              'c-bolt-typeahead__button--clear',
              {
                [`is-visible`]: value !== '',
              },
            )}
            onClick={() => {
              this.clearSearch();
            }}>
            {clearButtonText}
            <bolt-icon
              name="close"
              slot="before"
              className={cx('c-bolt-typeahead__icon')}
              title={clearButtonText}
            />
          </bolt-button>
        )}
        <bolt-button
          type="submit"
          color="text"
          icon-only
          onClick={() => {
            this.querySelector('form')
              ? this.querySelector('form').submit()
              : '';
          }}
          className={cx(
            'c-bolt-typeahead__button',
            'c-bolt-typeahead__button--submit',
          )}>
          {submitButtonText}
          <bolt-icon
            name="search"
            className={cx('c-bolt-typeahead__icon')}
            title={submitButtonText}
            slot="before"
          />
        </bolt-button>
      </div>
    );
  }

  render() {
    const { value, suggestions } = this.state;

    const shouldShowClearButton =
      this.props.noClearButton !== undefined &&
      this.props.noClearButton !== true &&
      value !== '';

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
      value,
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

export { BoltTypeahead };
