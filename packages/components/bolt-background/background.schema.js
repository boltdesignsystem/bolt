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
      default: 'medium',
      enum: ['none', 'light', 'medium', 'heavy', 'full'],
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
    fill: {
      type: 'string',
      description: 'Type of fill to use for the overlay.',
      default: 'color',
      enum: ['color', 'gradient', 'linear-gradient', 'radial-gradient'],
    },
    fill_color: {
      type: 'string',
      description: 'Color of the fill to use in the overlay.',
      default: 'default',
      enum: ['default', 'pink', 'navy', 'black'],
    },
    focal_point: {
      type: 'object',
      description: 'Where the opacity background should originate.',
      properties: {
        horizontal: {
          type: 'string',
          description: "Currently only reverses gradient on 'left'.",
          enum: ['center', 'left', 'right'],
        },
      },
      vertical: {
        type: 'string',
        description:
          "Currently doesn't use this value. Intended future application.",
        enum: ['center', 'top', 'bottom'],
      },
    },
    content_items: {
      type: 'array',
      description:
        'An array of objects to place in the background.Works with Image and Shape components.Video option is deprecated.',
      items: {
        type: 'any',
      },
    },
    overlay: {
      title: 'DEPRECATED',
      description: 'Use opacity instead',
    },
    shapeGroup: {
      title: 'DEPRECATED',
      description: 'Use shape_group instead.',
    },
    shapeAlignment: {
      title: 'DEPRECATED',
      description: 'Use shape_alignment instead.',
    },
    fillColor: {
      title: 'DEPRECATED',
      description: 'Use fill_color instead.',
    },
    focalPoint: {
      title: 'DEPRECATED',
      description: 'Use focal_point instead.',
    },
    contentItems: {
      title: 'DEPRECATED',
      description: 'Use content_items instead.',
    },
  },
};
