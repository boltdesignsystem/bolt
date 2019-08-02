import { define, props } from 'skatejs';
// import { store } from '../../store.js'; // connect to redux
import { h, withPreact } from '@bolt/core/renderers';

import Fuse from 'fuse.js';
import ReactHtmlParser from 'react-html-parser';
import classnames from './classnames';
import Mousetrap from 'mousetrap';
import VisuallyHidden from '@reach/visually-hidden';
import Autosuggest from 'react-autosuggest';

import styles from './typeahead.scoped.scss';
const cx = classnames.bind(styles);

@define
class BoltTypeahead extends withPreact() {
  static is = 'bolt-typeahead';

  static props = {
    placeholder: props.string,
    hideClearButton: props.boolean,
    clearButtonText: props.string,
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
      isFocused: false,
    };

    // // self.receiveIframeMessage = self.receiveIframeMessage.bind(self);
    self.onChange = self.onChange.bind(self);
    self.toggleSearch = self.toggleSearch.bind(self);
    self.clearSearch = self.clearSearch.bind(self);
    self.closeSearch = self.closeSearch.bind(self);
    self.renderInputComponent = self.renderInputComponent.bind(self);
    self.openSearch = self.openSearch.bind(self);
    self.onSuggestionSelected = self.onSuggestionSelected.bind(self);

    // self.items = [];
    // for (const patternType in window.patternPaths) {
    //   if (window.patternPaths.hasOwnProperty(patternType)) {
    //     for (const pattern in window.patternPaths[patternType]) {
    //       if (window.patternPaths[patternType].hasOwnProperty(pattern)) {
    //         const obj = {};
    //         obj.label = patternType + '-' + pattern;
    //         obj.id = window.patternPaths[patternType][pattern];
    //         this.items.push(obj);
    //       }
    //     }
    //   }
    // }

    return self;
  }

  connecting() {
    super.connecting && super.connecting();
    // this._fire('connecting');

    // Keep an object of listener types mapped to callback functions
    this._listeners = {};

    this.items = [];
    for (const patternType in window.patternPaths) {
      if (window.patternPaths.hasOwnProperty(patternType)) {
        for (const pattern in window.patternPaths[patternType]) {
          if (window.patternPaths[patternType].hasOwnProperty(pattern)) {
            const obj = {};
            obj.label = patternType + '-' + pattern;
            obj.id = window.patternPaths[patternType][pattern];
            this.items.push(obj);
          }
        }
      }
    }
  }

  disconnecting() {
    super.disconnecting && super.disconnecting();
    // Execute all callbacks registered for the `destroy` event
    this._fire('disconnecting');

    // Keep an object of listener types mapped to callback functions
    this._listeners = {};
  }

  connected() {
    super.connected && super.connected();

    const self = this;
    Mousetrap.bind('command+shift+f', function(e) {
      e.preventDefault();
      self.toggleSearch();
    });
    // window.addEventListener('message', this.receiveIframeMessage, false);
  }

  _stateChanged(state) {
    // throw new Error('_stateChanged() not implemented', this);
    this.triggerUpdate();
  }

  rendered() {
    super.rendered && super.rendered();
    this.inputElement = this.renderRoot.querySelector('.js-c-typeahead__input');
  }

  onInput = e => {
    this._fire('onInput', e, e.target.value);

    let value = e.target.value;

    this.setState({
      value: value,
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
    this.inputElement.focus();
    this.setState({
      value: '',
    });
  }

  openSearch() {
    this.inputElement.focus();
  }

  closeSearch() {
    document.activeElement.blur();
  }

  getSuggestionValue = suggestion => suggestion.label;

  renderSuggestion(item, { query, isHighlighted }) {
    return <span>{item.highlightedLabel}</span>;
  }

  // highlights keywords in the search results in a react-friendly way + limits total number / max displayed
  getSuggestions(value) {
    const maxResults = this.props.maxResults;

    const fuseOptions = {
      shouldSort: true,
      threshold: 0.3,
      tokenize: true,
      includeMatches: true,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['label'],
    };
    const fuse = new Fuse(this.items, fuseOptions);
    const results = fuse.search(value);

    const highlighter = function(item) {
      const resultItem = item;
      resultItem.matches.forEach(matchItem => {
        const text = resultItem.item[matchItem.key];
        const result = [];
        const matches = [].concat(matchItem.indices);
        let pair = matches.shift();

        for (let i = 0; i < text.length; i++) {
          const char = text.charAt(i);
          if (pair && i === pair[0]) {
            result.push('<strong>');
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
            highlighter(child);
          });
        }
      });
    };

    results.forEach(resultItem => {
      highlighter(resultItem);
    });

    const reducedResults = results.reduce((total, result) => {
      total.push(result.item);
      return total;
    }, []);

    if (reducedResults.length < maxResults) {
      return reducedResults;
    } else {
      return reducedResults.slice(0, maxResults);
    }
  }

  // onSelect
  // - open
  // - updateValue
  // -

  // Autosuggest calls this when a search result is selected
  onChange = (event, { newValue }) => {
    // const patternName = urlHandler.getFileName(newValue);

    this._fire('onChange', event, newValue);

    // console.log(this._listeners['onChange']);
    this.setState({ value: newValue });

    // skip default onChange behavior if external listeners have hooked in
    if (this._listeners['onChange']) {
      return;
    }
  };

  // Autosuggest calls this every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    // console.log('onSuggestionsFetchRequested');
    this.setState({ isOpen: true });

    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  renderInputComponent(inputProps) {
    const { value } = this.state;

    const shouldShowClearButton =
      this.props.hideClearButton !== undefined &&
      this.props.hideClearButton !== true &&
      value !== '';

    const clearButtonText = this.props.clearButtonText
      ? this.props.clearButtonText
      : 'Clear Search Results';

    return (
      <div
        className={cx(`c-bolt-typeahead__input-wrapper`, {
          [`c-bolt-typeahead__input-wrapper--with-clear-button`]: shouldShowClearButton,
        })}>
        <input {...inputProps} />
        {shouldShowClearButton && (
          <button
            className={cx('c-bolt-typeahead__clear-button', {
              [`is-visible`]: value !== '',
            })}
            onClick={() => {
              this.clearSearch();
            }}>
            <VisuallyHidden>{clearButtonText}</VisuallyHidden>
            <bolt-icon name="close"
              className={cx('c-bolt-typeahead__clear-icon')}
              title={clearButtonText}
            ></bolt-icon>
          </button>
        )}
      </div>
    );
  }

  // Autosuggest calls this every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    // console.log('onSuggestionsClearRequested');
    this.setState({
      suggestions: [],
    });

    this.setState({ isOpen: false });
  };

  // maps to our custom onSelected event hook
  onSuggestionSelected(event, suggestion) {
    this._fire('onSelected', event, suggestion);

    // console.log(this._listeners['onChange']);
    this.setState({ value: suggestion.suggestionValue });

    this.closeSearch();

    // skip default onChange behavior if external listeners have hooked in
    if (this._listeners['onSelected']) {
      return;
    }
  }

  render() {
    const { value, suggestions } = this.state;

    const shouldShowClearButton =
      this.props.hideClearButton !== undefined &&
      this.props.hideClearButton !== true &&
      value !== '';

    // no CSS for these Autosuggest selectors yet -- not yet needed
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
      sectionContainer: cx('c-bolt-typeahead__section-container') /* [1] */,
      sectionContainerFirst: cx(
        'c-bolt-typeahead__section-container--first',
      ) /* [1] */,
      sectionTitle: cx('c-bolt-typeahead__section-title') /* [1] */,
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange,
      onInput: this.onInput,
    };

    return (
      <div>
        {this.addStyles([styles])}
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          renderInputComponent={this.renderInputComponent}
        />
      </div>
    );
  }

  /**
   * Register a new callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  on(type, handler) {
    if (typeof this._listeners[type] === 'undefined') {
      this._listeners[type] = [];
    }

    this._listeners[type].push(handler);

    return this;
  }

  /**
   * Unregister an existing callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  off(type, handler) {
    var index = this._listeners[type].indexOf(handler);

    if (index > -1) {
      this._listeners[type].splice(index, 1);
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
    var listeners = this._listeners[type] || [];

    listeners.forEach(
      function(listener) {
        listener(this, ...props);
      }.bind(this),
    );
  }
}

/* <Tooltip
  placement="bottom"
  trigger="hover"
  tooltip="Hotkey: ⌘ + shift + f"
  usePortal={false}
>
  {({ getTriggerProps, triggerRef }) => (
    <div
      {...getTriggerProps({
        ref: triggerRef,
      })}
    >
      <Autosuggest
        theme={theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={this.renderInputComponent}
      />
    </div>
  )}
</Tooltip> */

export { BoltTypeahead };
