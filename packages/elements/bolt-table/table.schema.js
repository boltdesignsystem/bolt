module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table',
  description: 'Table layout for tabular content.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    borderless: {
      type: 'boolean',
      description: 'Removes all borders from the table.',
      default: false,
    },
    sticky_headers: {
      type: 'string',
      description: 'Enables/disables sticky table headers.',
      default: 'none',
      enum: ['top', 'side', 'none'],
    },
    format: {
      type: 'string',
      description:
        'Display either a regular table or a more complex numeric table.',
      default: 'regular',
      enum: ['regular', 'numeric'],
    },
    fixed_width_table: {
      type: 'boolean',
      description:
        "The table's layout ignores the content and instead uses the table's width. Makes each column of the same width. With this prop table doesn't have horizontal scroll but squeezes on smaller screens.<code>fixed_width_columns</code> doesn't work with this prop together.",
      default: false,
    },
    fixed_width_columns: {
      type: 'string',
      description:
        'Sets the number of columns that will be the width of the longest text.',
      default: 'none',
      enum: ['none', 'first', 'second', 'first-two'],
    },
    caption: {
      type: 'any',
      description: 'Generates a table caption &lt;caption&gt; element.',
      properties: {
        content: {
          type: 'any',
          description: 'Displays a caption at the bottom of the table.',
        },
        attributes: {
          type: 'object',
        },
      },
    },
    header: {
      type: 'object',
      description: 'Generates a table head &lt;thead&gt; element.',
      properties: {
        content: {
          type: 'object',
          description:
            'Content must be a table row. Use table-row.twig to render a single table row.',
        },
        attributes: {
          type: 'object',
        },
      },
    },
    body: {
      type: 'object',
      description: 'Generates a main table content &lt;tbody&gt; element.',
      properties: {
        content: {
          type: 'array',
          description:
            'Content must be a collection of table rows. Use table-row.twig to render table rows.',
        },
        attributes: {
          type: 'object',
        },
      },
    },
    footer: {
      type: 'object',
      description: 'Generates a table footer &lt;tfoot&gt; element.',
      properties: {
        content: {
          type: 'object',
          description:
            'Content must be a collection of table rows. Use table-row.twig to render table rows.',
        },
        attributes: {
          type: 'object',
        },
      },
    },
  },
};
