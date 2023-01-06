module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Background',
  description:
    'A content container that delivers important messages to the user.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    opacity: {
      type: 'string',
      description: 'Overlay opacity',
      default: 'none',
      enum: ['none', 'light', 'medium', 'heavy', 'full'],
    },
    fill: {
      type: 'string',
      description: 'Type of fill to use for the overlay.',
      default: 'solid',
      enum: ['solid', 'gradient'],
    },
    focal_point: {
      type: 'object',
      description:
        'Point where the background gradient highlight should originate.',
      properties: {
        horizontal: {
          type: 'string',
          description: 'X-axis positioning for the background focal point',
          enum: ['center', 'left', 'right'],
          default: 'right',
        },
        vertical: {
          type: 'string',
          description: 'Y-axis positioning for the background focal point',
          enum: ['center', 'top', 'bottom'],
          default: 'bottom',
        },
      },
    },
    video: {
      type: 'boolean',
      description: 'Set to true if you like to use video as a background.',
      default: false,
    },
    items: {
      type: 'array',
      description: 'An array of renderable items to place in the background.',
      items: {
        type: 'any',
      },
    },
    shape_group: {
      type: 'string',
      description: 'Add a Bolt Background Shapes group.',
      default: 'none',
      enum: ['A', 'B', 'none'],
    },
    shape_alignment: {
      type: 'string',
      description: 'Alignment of shape group.',
      default: 'right',
      enum: ['left', 'right'],
    },
  },
};
