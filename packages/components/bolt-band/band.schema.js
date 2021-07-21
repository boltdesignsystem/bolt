module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Band',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['fullBleed'],
      },
      {
        required: ['contentTag'],
      },
      {
        required: ['items'],
      },
      {
        required: ['row_gutter'],
      },
      {
        required: ['content_row_start'],
      },
    ],
  },
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: ['string', 'array', 'object'],
      description: 'Main content of the band.',
    },
    pinned_content: {
      type: 'object',
      description: 'Pinned content of the band.',
      properties: {
        upper: {
          type: 'array',
          description: 'Pinned to the upper area of the band.',
          properties: {
            content: {
              type: ['string', 'array', 'object'],
              description: 'A pinned area can contain 1 or more items.',
            },
            align: {
              type: 'string',
              description: 'Horizontal alignment of a single item.',
              enum: ['start', 'center', 'end'],
            },
          },
        },
        lower: {
          type: 'array',
          description: 'Pinned to the lower area of the band.',
          properties: {
            content: {
              type: ['string', 'array', 'object'],
              description: 'A pinned area can contain 1 or more items.',
            },
            align: {
              type: 'string',
              description: 'Horizontal alignment of a single item.',
              enum: ['start', 'center', 'end'],
            },
          },
        },
      },
    },
    tag: {
      type: 'string',
      description:
        "Controls the semantic HTML tag to use for the band's content.",
      default: 'div',
      enum: ['div', 'article', 'section', 'header', 'footer', 'nav', 'figure'],
    },
    valign: {
      type: 'string',
      description:
        "Controls the internal vertical alignment of the band's content.",
      default: 'center',
      enum: ['start', 'center', 'end'],
    },
    size: {
      type: 'string',
      description: 'Controls the vertical spacing of the band.',
      default: 'medium',
      enum: ['none', 'xsmall', 'small', 'medium', 'large'],
    },
    full_bleed: {
      type: 'boolean',
      default: true,
      description:
        'If set to true, the band will take the full width of the page.',
    },
    theme: {
      type: 'string',
      description: 'Controls the theme of the band.',
      default: 'dark',
      enum: ['none', 'xlight', 'light', 'dark', 'xdark', 'xxdark'],
    },
    row_gutter: {
      title: 'DEPRECATED',
      description:
        'Please use `pinned_content`. Instructions on how to use `pinned_content` is on the Band with Pinned Content demo page.',
    },
    content_row_start: {
      title: 'DEPRECATED',
      description:
        'Please use `pinned_content`. Instructions on how to use `pinned_content` is on the Band with Pinned Content demo page.',
    },
    items: {
      title: 'DEPRECATED',
      description:
        'Please use `content` and `pinned_content`. Instructions on how to use `pinned_content` is on the Band with Pinned Content demo page.',
    },
    fullBleed: {
      title: 'DEPRECATED',
      description: 'This prop has been renamed. Please use `full_bleed`.',
    },
    contentTag: {
      title: 'DEPRECATED',
      description:
        'This prop is no longer needed. `tag` takes care of the semantic markup automatically.',
    },
  },
};
