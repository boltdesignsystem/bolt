// NOTE: make sure you're running this code through a tool like Babel before shipping for cross browser compatibility!
import { html } from 'lit-html';

const dynamicTypeaheadDemo = document.querySelector(
  '.js-typeahead-hook--render-custom-footer-ui',
);

if (dynamicTypeaheadDemo) {
  dynamicTypeaheadDemo.addEventListener('ready', function(e) {
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

      dynamicTypeaheadDemo.footerTemplate = function(query, suggestions) {
        return html`
          <bolt-link
            target="_blank"
            url="https://www.pega.com/search?q=${query}"
          >
            See All Results
          </bolt-link>
        `;
      };
    }
  });
}
