module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table',
  description: 'Table layout for tabular content.',
  type: 'object',
  required: ['rows'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    headers: {
      type: 'object',
      description:
        'Generates top and side headers, each can contain an array of `cells`.',
      properties: {
        top: {
          type: 'object',
          properties: {
            cells: {
              description:
                "Each item represents a cell in the top header.  Accepts either a renderable item (shorthand) or an item with 'content' and 'attributes' keys.",
              type: 'array',
              items: {
                type: 'any',
                properties: {
                  content: {
                    type: 'string',
                  },
                  attributes: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
        side: {
          type: 'object',
          properties: {
            cells: {
              description:
                "Each item represents a cell in the side header.  Accepts either a renderable item (shorthand) or an item with 'content' and 'attributes' keys",
              type: 'array',
              items: {
                type: 'any',
                properties: {
                  content: {
                    type: 'string',
                  },
                  attributes: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
      },
    },
    rows: {
      type: 'array',
      description:
        'Generates an array of rows, each can contain an array of `cells`.',
      properties: {
        cells: {
          description:
            "Each item represents a cell in a row.  Accepts either a renderable item (shorthand) or an item with 'content' and 'attributes' keys",
          type: 'array',
          items: {
            type: 'any',
            properties: {
              content: {
                type: 'string',
              },
              attributes: {
                type: 'object',
              },
            },
          },
        },
      },
    },
    footer: {
      type: 'object',
      description: 'Generates a table footer, can contain an array of `cells`.',
      properties: {
        cells: {
          description:
            "Each item represents a cell in the footer.  Accepts either a renderable item (shorthand) or an item with 'content' and 'attributes' keys",
          type: 'array',
          items: {
            type: 'any',
            properties: {
              content: {
                type: 'string',
              },
              attributes: {
                type: 'object',
              },
            },
          },
        },
      },
    },
    format: {
      type: 'string',
      description:
        'Display either a regular table or a more complex numeric table.',
      default: 'regular',
      enum: ['regular', 'numeric'],
    },
    borderless: {
      type: 'boolean',
      description: 'Removes the vertical border in between cells.',
      default: false,
    },
    first_col_fixed_width: {
      type: 'boolean',
      description:
        'Sets the width of the first column to be as wide as the longest text.',
      default: false,
    },
    caption: {
      type: 'string',
      description: 'Set a table caption, displayed below the table content.',
    },
  },
};
