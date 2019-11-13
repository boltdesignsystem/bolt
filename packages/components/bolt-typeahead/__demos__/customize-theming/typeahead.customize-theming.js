// NOTE: make sure you're running this code through a tool like Babel before shipping for cross browser compatibility!
const dynamicTypeaheadThemingDemos = document.querySelectorAll(
  '.js-typeahead-hook--customize-theming',
);

if (dynamicTypeaheadThemingDemos) {
  dynamicTypeaheadThemingDemos.forEach(typeaheadDemo => {
    typeaheadDemo.addEventListener('ready', function(e) {
      if (e.detail.name === 'bolt-typeahead') {
        // note: make sure to let Typeahead know when the data fetched is ready
        typeaheadDemo.on('getSuggestions', async value => {
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
  });
}
