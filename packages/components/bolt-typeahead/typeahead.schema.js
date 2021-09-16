module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Typeahead',
  description: 'Typeahead + autocomplete.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    max_results: {
      type: 'number',
      description: 'The maximum number of typeahead results to display',
      default: 10,
    },
    items: {
      type: 'array',
      description:
        "An array of objects that's used to populate the suggestion list that appears below the input as the users type. This array of objects can be asynchronously fetched and should contain a `label`, `url`, and optionally `description`.",
    },
    clear_input_text: {
      type: 'any',
      description:
        "Screenreader-specific text for the clear search button, intended to provide a longer, more descriptive explanation of the clear button's behavior.",
      default: 'Clear search results',
    },
    submit_button_text: {
      type: 'any',
      description:
        "Screenreader-specific text for the submit button, intended to provide a longer, more descriptive explanation of the submit button's behavior.",
      default: 'Submit',
    },
    input_label: {
      type: 'any',
      description:
        'Screenreader-specific label text associated with the search input.',
    },
    input_placeholder: {
      type: 'any',
      description:
        'The placeholder text to display inside the Typeahead search input.',
      default: 'Search',
    },
    input_value: {
      type: 'any',
      description: 'Initial value to pre-populate the input field',
    },
    input_name: {
      type: 'any',
      description:
        "Input element's name attribute used when pre-rendering the component",
    },
    no_highlight: {
      type: 'boolean',
      description:
        'Disable text highlighting in matching search results (highlighting is enabled by default)',
      default: false,
    },
    disabled: {
      type: 'boolean',
      description: 'Disables input as well as the search and cancel buttons.',
      default: false,
    },
  },
};
