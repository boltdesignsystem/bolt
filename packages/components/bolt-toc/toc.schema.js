module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table of Content',
  description: 'Table of Content is a navigation list, usually found on an article page, of its section titles.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-toc&gt; tag.',
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
          content: {
            type: 'string',
            description: 'Renders the text for the linked item.',
          },
          url: {
            type: 'string',
            description: 'Renders the `href` for the linked item. This should be the `id` of the responding section. For example: `#section-one-name`.',
          },
          active: {
            type: 'boolean',
            description: 'Indicates that the item represents the current section being viewed.',
          },
        },
      },
    },
    header: {
      type: 'string',
      description: 'Renders a header for the table of content.',
    },
    uuid: {
      type: 'string',
      description:
        'Unique ID for the table of content, randomly generated if not provided.',
    },
  },
};
