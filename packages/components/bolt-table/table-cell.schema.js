module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table Cell',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description:
        'Generates a table cell &lt;td&gt; element. To render a button which triggers expanding hidden rows, pass table-expand-button.twig as the content. To render a button which triggers sorting, pass table-sorting-button.twig as the content.',
    },
    header: {
      type: 'boolean',
      default: false,
      description:
        'Generates a table cell as a table header &lt;th&gt; element if set to true. &lt;th&gt; elements can be used in table head, table body, or table footer.',
    },
    filters: {
      type: 'object',
      description:
        'Generates space for a popover filter button. It is recommended to pass the Button element and Popover component here.',
    },
  },
};
