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
      description: 'An element with set up aspect ratio (image or video)',
    },
    ratio: {
      type: 'string',
      description:
        'An aspect ratio between the width and height. Expressed as width divided by height',
    },
  },
};
