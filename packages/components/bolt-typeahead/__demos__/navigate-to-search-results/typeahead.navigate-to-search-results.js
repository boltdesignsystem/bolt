// NOTE: make sure you're running this code through a tool like Babel before shipping for cross browser compatibility!
const typeahead = document.querySelector('.js-typeahead-hook');

const items = [
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
  {
    label: 'Pega Data & Integrations',
    description:
      "Take full advantage of integration opportunities with Pega's open architecture, allowing you to build applications faster and meet the increasing demands of your business.",
    url: 'https://www.pega.com/products/pega-platform/data-integrations',
  },
  {
    label: 'Digital Customer Experiences',
    description:
      'Deliver engaging digital customer experiences anywhere, anytime, with unique designs for your business right out of the box.',
    url:
      'https://www.pega.com/products/pega-platform/digital-customer-experiences',
  },
  {
    label: 'DevOps and Testing',
    description:
      "Continuous integration and deployment. Continuous evolution. With one-click DevOps, you'll break barriers to delivery – and leapfrog competitors – by empowering business teams to…",
    url: 'https://www.pega.com/products/pega-platform/devops-testing',
  },
  {
    label: 'Pega Onboarding',
    description:
      'Intelligent work automation dramatically cuts time to revenue while ensuring compliance with global and local regulations, whether you are onboarding new clients, adding products…',
    url: 'https://www.pega.com/industries/financial-services/onboarding',
  },
  {
    label: 'Case Management',
    description:
      'Pega BPM and case management solutions allow you to build and manage enterprise-level strategic applications that can communicate with legacy systems.',
    url: 'https://www.pega.com/products/pega-platform/case-management',
  },
  {
    label: 'Pega Intelligent Virtual Assistant',
    description:
      "Across all channels, Pega's Intelligent Virtual Assistant engages users where they are and gives them experiences based on context, not just auto-responses.",
    url:
      'https://www.pega.com/products/pega-platform/intelligent-virtual-assistant',
  },
];

if (typeahead) {
  typeahead.addEventListener('ready', function(e) {
    if (e.detail.name === 'bolt-autosuggest') {
      typeahead.items = items;
      typeahead.on('onSelected', (element, event, suggestion) => {
        const itemSelected = element.items.filter(
          item => item.label === suggestion.suggestionValue,
        )[0];

        if (itemSelected) {
          if (itemSelected.label) {
            if (window.location !== window.parent.location) {
              // const win = window.open(`${itemSelected.url}`, '_blank');
              const win = window.open(
                `https://www.pega.com/search?q=${itemSelected.label}`,
                '_blank',
              );
              win.focus();
            } else {
              window.location = `https://www.pega.com/search?q=${itemSelected.label}`;
            }
          }
        }
      });
    }
  });
}
