module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Side Nav List',
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
        'Content of the side nav list. side-nav-li template is expected here.',
    },
  },
};
