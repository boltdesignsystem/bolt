module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table Cell',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-responsive-table&gt; tag.',
    },
    content: {
      type: 'any',
      description: 'Generates a table cell &lt;td&gt; tag.',
    },
    header: {
      type: 'boolean',
      default: false,
      description:
        'Generates a table cell as a header &lt;th&gt; tag, if sets to true. &lt;Th&gt; tags can be both at the top or side of the table',
    },
    filters: {
      type: 'object',
      description: 'Generates control buttons (sort and filter).',
    },
  },
};
