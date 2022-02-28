module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table',
  description: 'Table layout for tabular content.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    borderless: {
      type: 'boolean',
      description: 'Removes all borders from the table.',
      default: false,
    },
    sticky_headers: {
      type: 'string',
      description: 'Makes top table headers or side table headers sticky.',
      default: 'none',
      enum: ['top', 'side'],
    },
    header: {
      type: 'object',
      description: 'Generates a table head - &lt;thead&gt; tag.',
      properties: {
        content: {
          type: 'object',
          description:
            'Renders a table row - &lt;tr&gt; tag. Use table-row.twig to render a single table row',
        },
        attributes: {
          type: 'object',
        },
      },
    },
    body: {
      type: 'object',
      description: 'Generates a main table content - &lt;tbody&gt; tag.',
      properties: {
        content: {
          type: 'array',
          description:
            'Renders a collection of single table rows. Use table-row.twig to render table rows',
        },
        attributes: {
          type: 'object',
        },
      },
    },
    footer: {
      type: 'object',
      description: 'Generates a table footer - &lt;tfoot&gt; tag.',
      properties: {
        content: {
          type: 'object',
          description:
            'Renders a table row - &lt;tr&gt; tag. Use table-row.twig to render a single table row',
        },
        attributes: {
          type: 'object',
        },
      },
    },
    caption: {
      type: 'any',
      description: 'Generates a table caption - &lt;tr&gt; tag.',
      properties: {
        content: {
          type: 'any',
          description:
            'It specifies the title of a table which is displayed at the bottom of the table.',
        },
        attributes: {
          type: 'object',
        },
      },
    },
  },
};
