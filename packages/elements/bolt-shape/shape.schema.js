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
    size: {
      type: 'string',
      description: 'Changes the size of the interior element',
      default: 'small',
      enum: ['small', 'medium', 'large', 'xlarge'],
    },
    border_radius: {
      type: 'string',
      description:
        'Customizes the outside radius of the shape. "none" will render as a square shape, "small" and "large" will render as a rounded corners square and "full" will render as a circle.',
      default: 'full',
      enum: ['none', 'small', 'large', 'full'],
    },
  },
};
