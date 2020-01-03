// NOTE: make sure you're running this code through a tool like Babel before shipping for cross browser compatibility!
const typeaheadDemo = document.querySelector(
  '.js-typeahead-hook--exact-result',
);

const typeaheadDemoItems = [
  {
    label: 'AI and improving the customer experience',
    description:
      '“Artificial intelligence” (AI) presents both distracting hype and powerful opportunities to drive customer engagement.',
    url: 'https://www.pega.com/ai-and-improving-customer-experience',
  },
  {
    label:
      'Gartner Magic Quadrant for Enterprise Low-Code Application Platforms 2019',
    description:
      'Pega was cited as a Visionary in Gartner’s new 2019 Magic Quadrant for Enterprise Low-Code Application Platforms.',
    url:
      'https://www.pega.com/insights/resources/gartner-magic-quadrant-enterprise-low-code-application-platforms-2019',
  },
];

const setupEventHandlers = () => {
  typeaheadDemo.items = typeaheadDemoItems;

  typeaheadDemo.on('onSelected', (element, event, suggestion) => {
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
      navigateTo(`https://www.pega.com/search?q=${suggestion.suggestionValue}`);
    }
  });
};

if (typeaheadDemo) {
  if (typeaheadDemo._wasInitiallyRendered) {
    setupEventHandlers();
  }

  typeaheadDemo.addEventListener('ready', e => {
    if (e.detail.name === 'bolt-typeahead') {
      setupEventHandlers();
    }
  });
}
