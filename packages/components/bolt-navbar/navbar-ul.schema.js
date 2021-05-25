module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar list',
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
      description: 'Content of navbar ul. Navbar li are expected here.',
    },
  },
};
