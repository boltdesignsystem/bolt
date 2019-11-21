### Installation
```sh
npm install @bolt/components-typeahead
```

<hr>

### Features
- Progressively enhanced simple html `<form>` fallback (via Twig)
- Server-side pre-rendered SVG icons (when using Twig)!
- Uses the new `withEvents` base class to allow for much deeper JavaScript customization
- Fuzzy logic search / fuzzy matching using [fuse.io](https://fusejs.io/)
- Keyboard combo-support (command+shift+f)
- Wired up to use CSS Modules (once they ship in a future Bolt release)
- Fully customizable behavior to handle partial vs full result matches, etc 
- Supports rendering to the Shadow DOM _and_ the Light DOM
- Fully support theming system colors
- Customizable content below search results
- Improved Accessibility + Internationalization Support

### What's Next? (Future Updates)
- JSDoc support / further improve docs and demos
- Broader testing coverage
- More customization for additional use cases?
- Multi-section support

<hr>

# API

### JavaScript Properties/Attributes

| Name              | Type                | Description
| ----------------- | ------------------- |------------
| `items`           | `array`             | An array of objects that populates the dropdown


### Accessibility / Internationalization
Typeahead automatically generates and updates visually hidden messages to help users using assistive technologies. These messages can be customized and translated by replace the default functions with custom defined ones.

Ex. 

```js
const typeahead = document.querySelector('bolt-typeahead');
// wait for the component to be ready

typeahead.a11yQueryTooShort = function(minQueryLength) {
  return `Please type in ${minQueryLength} or more characters for results`;
}
```

#### `a11ySelectedOption(selectedOption, length, index)`
- Type: `Function`
- Description: A function that receives three arguments, the selectedOption, the amount of available options, and the index of the selected item, and it should return the text used in the accessibility hint to indicate which option is selected.
- Default:
  ```js
  a11ySelectedOption(selectedOption, length, index) {
    return `${selectedOption} ${
      index + 1 <= length ? index + 1 : index
    } of ${length} is highlighted`;
  }
  ```

#### `a11yQueryTooShort(minQueryLength)`
- Type: `Function`
- Description: A function that receives one argument that indicates the minimal amount of characters needed for the dropdown to trigger and should return the text used in the accessibility hint to indicate that the query is too short.
- Default:
  ```js
  a11yQueryTooShort(minQueryLength) {
    return `Type in ${minQueryLength} or more characters for results`;
  }
  ```

#### `a11yStatusResults(length, contentSelectedOption)`
- Type: `Function`
- Description: A function that receives two arguments, the count of available options and the return value of tStatusSelectedOption, and should return the text used in the accessibility hint to indicate which options are available and which is selected.
- Default:
  ```js
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
```

#### `a11yNoResults()`
- Type: `Function`
- Description: A function that receives no arguments and should return the text used in the dropdown to indicate that there are no results.
- Default:
  ```js
  a11yNoResults() {
    return 'No search results';
  }
  ```

#### `a11yAssistiveHint()`
- Type: `Function`
- Description: A function that receives no arguments and should return the text to be assigned as the aria description of the html input element, via the aria-describedby attribute. This text is intended as an initial instruction to the assistive tech user. The aria-describedby attribute is automatically removed once user input is detected, in order to reduce screen reader verbosity.
- Default:
  ```js
  a11yAssistiveHint(){
    return 'When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.';
  }
  ```


### Methods ()
| Name     | Description
| -------- | -------------
|`footerTemplate(query, suggestions)` | Render custom UI below the list of suggestions


```
// example
import { html } from 'lit-html';

const myTypeahead = document.querySelector('bolt-typeahead');

myTypeahead.footerTemplate = function(query, suggestions) {
  return html`
    <bolt-link
      target="_blank"
      url="https://www.pega.com/search?q=${query}"
    >
      See All Results
    </bolt-link>
  `;
};
```


### JavaScript Event Hooks

| Name                           | Params                | Description
| ------------------------------ | --------------------- | -----------
| `onInput`                      | `event`, <br> `value`  | Called every time the input value changes
| `getSuggestions`               | `value`               | Called by `onSuggestionsFetchRequested` when re-rendering suggestions. Handles highlighting keywords in the search results in a React-friendly way + handles limiting the total number of results displayed
| `onChange`                     | `event`, <br> `newValue`, `method` | Called when a suggestion is selected. Includes info on how the particular item was selected (click, keyboard, etc)
| `onSuggestionsFetchRequested`  | `value`                  | Called every very time you need to gather / update suggestions to display. See [onSuggestionsFetchRequested](https://github.com/moroshko/react-autosuggest#onsuggestionsfetchrequested-required) for more info.
| `onSuggestionsClearRequested`  |                        | Called when clearing suggestions. See [onSuggestionsClearRequested](https://github.com/moroshko/react-autosuggest#onsuggestionsclearrequested-required-unless-alwaysrendersuggestionstrue) for more info.
| `onSelected`                   | `event`, <br> `suggestion` | Will be called every time suggestion is selected via mouse or keyboard. See [onSuggestionSelected](https://github.com/moroshko/react-autosuggest#onsuggestionsfetchrequested-required) for more info.
| `onRenderInput`                | `value`                  | Fired when the input is being rendered

## Additional references
- [React Autosuggest](http://react-autosuggest.js.org/)