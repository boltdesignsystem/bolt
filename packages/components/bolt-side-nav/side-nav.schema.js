module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Side Nav',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description:
        'Content of the side nav. side-nav-ul template is expected here.',
    },
    headline: {
      type: 'object',
      description: 'Set the title of the side nav.',
      properties: {
        content: {
          type: 'string',
          description: 'Text content of the headline.',
        },
        link_attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the link element.',
        },
      },
    },
  },
};
