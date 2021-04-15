module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Action blocks',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['maxItemsPerRow'],
      },
      {
        required: ['align'],
      },
      {
        required: ['border'],
      },
      {
        required: ['contentItems'],
      },
    ],
  },
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    spacing: {
      type: 'string',
      description: 'Spacing surrounding each action block.',
      default: 'medium',
      enum: ['xsmall', 'small', 'medium'],
    },
    max_items_per_row: {
      type: 'number',
      description:
        'The max amount of items (action blocks) to be displayed in one row.',
      default: 6,
      enum: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    valign: {
      type: 'string',
      description:
        'Vertical alignment of the content inside each action block.',
      default: 'start',
      enum: ['start', 'center', 'end'],
    },
    borderless: {
      type: 'boolean',
      description: 'Removes the border in between each action block.',
      default: false,
    },
    content: {
      type: ['string', 'array', 'object'],
      description: 'Free form content to populate the action blocks',
    },
    children: {
      title: 'DEPRECATED',
      description: 'Use content prop instead.',
    },
    items: {
      type: 'array',
      description: 'Content items to populate the action blocks.',
      items: {
        type: ['string', 'object', 'array'],
        description:
          'Either a renderable item (string or render array) or an object with specific properties.',
        not: {
          anyOf: [
            {
              required: ['icon'],
            },
          ],
        },
        properties: {
          attributes: {
            type: 'object',
            description:
              'A Drupal-style attributes object with extra attributes to append to this component.',
          },
          text: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          media: {
            type: ['string', 'object', 'array'],
            description:
              'Renderable media content (i.e. a string, render array, or included pattern) for this item, usually an icon or an image',
          },
          icon: {
            title: 'DEPRECATED',
            description:
              'Use media prop instead and pass a fully rendered icon',
          },
        },
      },
    },
    maxItemsPerRow: {
      title: 'DEPRECATED',
      description: 'Use max_items_per_row prop instead.',
    },
    align: {
      title: 'DEPRECATED',
      description: 'Use valign prop instead.',
    },
    border: {
      title: 'DEPRECATED',
      description: 'Use borderless prop instead.',
    },
  },
};
