module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Table of Content',
  description: 'Table of Content.',
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
    },
    header: {
      type: 'string',
      description: 'Controls the header of the table of content.',
    },
    uuid: {
      type: 'string',
      description: 'Unique ID for popover, randomly generated if not provided.',
    },
  },
};
