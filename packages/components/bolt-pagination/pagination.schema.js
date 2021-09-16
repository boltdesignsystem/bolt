module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Pagination',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    align: {
      type: 'string',
      description: 'Horizontally align the items.',
      default: 'center',
      enum: ['start', 'end', 'center'],
    },
    total: {
      type: 'integer',
      title: 'Total pages',
      description: 'Total pages within the pagination',
    },
    current: {
      type: 'integer',
      title: 'Current page',
      description: 'Current page selected',
    },
    pages: {
      type: ['array', 'object'],
      description:
        'A keyed array of page item objects where the key is the page number',
      items: {
        type: 'object',
        description: 'A single page link object',
        properties: {
          href: {
            type: 'string',
            description:
              'The link for this pager item.  Href may also be passed as part of attributes (which will take precedence).',
          },
          attributes: {
            type: 'object',
            description: 'A Drupal-style attributes object for this link.',
          },
        },
      },
    },
    first: {
      type: 'object',
      description: 'A link object for the first page',
      properties: {
        href: {
          type: 'string',
          description:
            'The link for this pager item. Href may also be passed as part of attributes (which will take precedence).',
        },
        attributes: {
          type: 'object',
          description: 'A Drupal-style attributes object for this link.',
        },
      },
    },
    previous: {
      type: 'object',
      description:
        'A link object for the previous page (e.g. if on page 3, this links to page 2)',
      properties: {
        href: {
          type: 'string',
          description:
            'The link for this pager item. Href may also be passed as part of attributes (which will take precedence)',
        },
        attributes: {
          type: 'object',
          description: 'A Drupal-style attributes object for this link.',
        },
      },
    },
    next: {
      type: 'object',
      description:
        'A link object for the next page (e.g. if on page 3, this links to page 4)',
      properties: {
        href: {
          type: 'string',
          description:
            'The link for this pager item. Href may also be passed as part of attributes (which will take precedence)',
        },
        attributes: {
          type: 'object',
          description: 'A Drupal-style attributes object for this link.',
        },
      },
    },
    last: {
      type: 'object',
      description: 'A link object for the last page',
      properties: {
        href: {
          type: 'string',
          description:
            'The link for this pager item. Href may also be passed as part of attributes (which will take precedence)',
        },
        attributes: {
          type: 'object',
          description: 'A Drupal-style attributes object for this link.',
        },
      },
    },
    previousText: {
      type: 'any',
      title: 'Previous text',
      description: 'Text to be displayed for the previous anchor',
      default: 'Previous',
    },
    nextText: {
      type: 'any',
      title: 'Next text',
      description: 'Text to be displayed for the next anchor',
      default: 'Next',
    },
  },
  required: ['current', 'pages', 'total'],
};
