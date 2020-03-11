module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table of Contents',
  description:
    'A navigation list, usually found on an article page, of its section titles.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-toc&gt; tag.',
    },
    scrollOffsetSelector: {
      type: 'string',
      description:
        'Selects a fixed element on the page, offsets smooth scrolling by the height of that element. Must be a valid CSS selector.',
    },
    scrollOffset: {
      type: 'integer',
      description:
        'Additional offset for smooth scrolling, integer converted to pixel value.',
    },
    items: {
      type: 'array',
      description:
        'Generates an array of items. The items represent the headlines of top level sections in an article.',
      items: {
        type: 'object',
        description:
          'Renders a linked item that points to the beginning of a particular section.',
        properties: {
          text: {
            type: 'string',
            description: 'Renders the text for the linked item.',
          },
          url: {
            type: 'string',
            description:
              'Renders the `href` for the linked item. This should be the `id` of the responding section. For example: `#section-one-name`.',
          },
          active: {
            type: 'boolean',
            description:
              'Indicates that the item represents the current section being viewed.',
          },
        },
      },
    },
    header: {
      type: 'string',
      description: 'Renders a header for the table of contents.',
    },
    uuid: {
      type: 'string',
      description:
        'Unique ID for the table of contents, randomly generated if not provided.',
    },
  },
};
