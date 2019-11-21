// NOTE: make sure you're running this code through a tool like Babel before shipping for cross browser compatibility!
const disableSearchFilteringTypeaheadDemo = document.querySelector(
  '.js-typeahead-hook--disable-search-filtering',
);

import { h } from 'preact';

if (disableSearchFilteringTypeaheadDemo) {
  disableSearchFilteringTypeaheadDemo.keys = ['title', 'author.firstName'];
  disableSearchFilteringTypeaheadDemo.noHighlight = true;

  disableSearchFilteringTypeaheadDemo.addEventListener('ready', function(e) {
    if (e.detail.name === 'bolt-typeahead') {
      // note: make sure to let Typeahead know when the data fetched is ready
      disableSearchFilteringTypeaheadDemo.on('getSuggestions', async value => {
        return await new Promise(async resolve => {
          await fetch('/build/data/typeahead.data.json')
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              return resolve(data);
            });
        });
      });
    }
  });
}
