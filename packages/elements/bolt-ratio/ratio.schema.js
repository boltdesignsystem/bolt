module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Ratio',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this element.',
    },
    children: {
      type: 'any',
      description: 'An element with set up ratio.',
    },
    ratio: {
      type: 'string',
      description: 'Ratio between the width and height.',
    },
  },
};
