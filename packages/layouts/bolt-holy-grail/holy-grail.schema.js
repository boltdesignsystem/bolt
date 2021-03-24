module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Holy Grail Layout',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
  },
};
