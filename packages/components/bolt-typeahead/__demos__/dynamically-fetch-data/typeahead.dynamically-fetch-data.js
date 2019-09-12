// NOTE: make sure you're running this code through a tool like Babel before shipping for cross browser compatibility!
const dynamicTypeaheadDemo = document.querySelector(
  '.js-typeahead-hook--dynamically-fetch-data',
);

if (dynamicTypeaheadDemo) {
  document.body.addEventListener('ready', function(e) {
    if (e.detail.name === 'bolt-typeahead') {
      // note: make sure to let Typeahead know when the data fetched is ready
      dynamicTypeaheadDemo.on('getSuggestions', async value => {
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

      dynamicTypeaheadDemo.on('onSelected', (element, event, suggestion) => {
        const exactMatch = element.items.filter(
          item => item.label === suggestion.suggestionValue,
        )[0];

        function navigateTo(url) {
          if (window.location !== window.parent.location) {
            const win = window.open(url, '_blank');
            win.focus();
          } else {
            window.location = url;
          }
        }

        if (exactMatch && exactMatch.url) {
          if (exactMatch.url) {
            navigateTo(exactMatch.url);
          } else {
            navigateTo(`https://www.pega.com/search?q=${itemSelected.label}`);
          }
        } else if (suggestion.suggestionValue !== '') {
          navigateTo(
            `https://www.pega.com/search?q=${suggestion.suggestionValue}`,
          );
        }
      });
    }
  });
}
