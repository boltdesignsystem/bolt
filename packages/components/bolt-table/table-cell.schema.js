module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table Cell',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-table&gt; tag.',
    },
    content: {
      type: 'any',
      description:
        'Generates a table cell &lt;td&gt; tag. To render a button which triggers expanding hidden rows use table-expand-button.twig. To render a button which triggers sorting use table-sorting-text-button.twig',
    },
    header: {
      type: 'boolean',
      default: false,
      description:
        'Generates a table cell as a header &lt;th&gt; tag, if sets to true. &lt;Th&gt; tags can be both at the top or side of the table',
    },
    filters: {
      type: 'object',
      description:
        'Renders control buttons of a filter fetaure. Use already existing bolt form elements and bolt popover to create a filter set. Then pass it to the prop.',
    },
  },
};
