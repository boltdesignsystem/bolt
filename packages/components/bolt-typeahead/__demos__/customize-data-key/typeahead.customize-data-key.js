// NOTE: make sure you're running this code through a tool like Babel before shipping for cross browser compatibility!
const typeaheadCustomDataKeyDemo = document.querySelector(
  '.js-typeahead-hook--customize-data-key',
);

import { h } from 'preact';

if (typeaheadCustomDataKeyDemo) {
  typeaheadCustomDataKeyDemo.keys = ['title', 'author.firstName'];
  typeaheadCustomDataKeyDemo.noHighlight = true;

  typeaheadCustomDataKeyDemo.renderSuggestionTemplate = function(
    suggestion,
  ) {
    return (
      /* classname changes from c-bolt-typeahead__result-text to c-bolt-typeahead__result-item in upstream branch so keeping both classes for now */
      <span class="c-bolt-typeahead__result-item c-bolt-typeahead__result-text">
        <strong>{suggestion.title}</strong> by {suggestion.author.firstName}
        {suggestion.author.lastName}
      </span>
    );
  };

  typeaheadCustomDataKeyDemo.addEventListener('ready', function(e) {
    if (e.detail.name === 'bolt-typeahead') {
      // note: make sure to let Typeahead know when the data fetched is ready
      typeaheadCustomDataKeyDemo.on('getSuggestions', async value => {
        return await new Promise(async resolve => {
          await fetch('/build/data/typeahead.demo-data.json')
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              return resolve(data);
            });
        });
      });

      typeaheadCustomDataKeyDemo.on(
        'getSuggestionValue',
        (elem, suggestion) => {
          return `${suggestion.title}, by ${suggestion.author.firstName} ${suggestion.author.lastName}`;
        },
      );
    }
  });
}
