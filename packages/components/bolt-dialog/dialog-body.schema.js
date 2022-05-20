module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Dialog Body',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description: 'Main content of the dialog body.',
    },
  },
};
