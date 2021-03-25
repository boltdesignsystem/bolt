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
      type: ['string', 'array', 'object'],
      description: 'Content of the article.',
    },
  },
};
