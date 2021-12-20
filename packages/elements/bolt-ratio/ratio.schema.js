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
    content: {
      type: 'any',
      description:
        'A nested element with proportions defined through ratio property. It can be for example image or video.',
    },
    ratio: {
      type: 'string',
      description:
        'An aspect ratio between the width and height. Expressed as width divided by height. You can choose from: standard(4/3), square(1/1), wide(16/9). Custom aspect ratio can be set via the CSS custom property <code>--e-bolt-aspect-ratio</code>.',
      default: 'standard',
      enum: ['standard', 'square', 'wide'],
    },
  },
};
