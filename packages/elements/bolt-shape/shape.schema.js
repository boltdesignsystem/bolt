module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Shape',
  type: 'object',
  required: ['content'],
  properties: {
    content: {
      type: 'any',
      description: 'Content of the shape.',
    },
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this element.',
    },
    variant: {
      type: 'string',
      description:
        "Customizes the background that's displayed behind the SVG icon itself. Choosing any option other than `none` will automatically add a bit of space around the SVG so the background has the necessary space. Note, this option is now available to icons of all sizes!",
      default: 'none',
      enum: ['none', 'circle', 'square'],
    },
  },
};
