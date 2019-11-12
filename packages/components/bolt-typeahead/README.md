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

### What's Next? (Future Updates)
- Fully support theming system colors
- JSDoc support / further improve docs and demos
- Broader testing coverage
- Look into adding `<slot>` support
- More customization for additional use cases?
- Multi-section support

<hr>

# API

### JavaScript Properties/Attributes

| Name              | Type                | Description
| ----------------- | ------------------- |------------
| `items`           | `array`             | An array of objects that populates the dropdown

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