module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Background',
  description:
    'A content container that delivers important messages to the user.',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['contentItems'],
      },
      {
        required: ['content_items'],
      },
      {
        required: ['fill_color'],
      },
    ],
  },
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
      default: 'solid',
      enum: ['solid', 'gradient'],
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
    items: {
      type: 'array',
      description: 'An array of renderable items to place in the background.',
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
      description:
        'This is deprecated. Solid overlay on the background component can be achieved by adding <a href="/pattern-lab/?p=visual-styles-theming-system" class="e-bolt-text-link" target="_blank" rel="noopener">theming class</a> <code>t-bolt-*</code> to the parent of a background component.',
    },
    focalPoint: {
      title: 'DEPRECATED',
      description: 'Use focal_point instead.',
    },
    contentItems: {
      title: 'DEPRECATED',
      description: 'Use content_items instead.',
    },
    content_items: {
      title: 'DEPRECATED',
      description:
        'Use items instead (each item must be renderable, e.g. a string or render array.  Arrays inteded to be rendered with pattern_template() are no longer supported).',
    },
    fill_color: {
      title: 'DEPRECATED',
      description:
        'This is deprecated. Solid overlay on the background component can be achieved by adding <a href="/pattern-lab/?p=visual-styles-theming-system" class="e-bolt-text-link" target="_blank" rel="noopener">theming class</a> <code>t-bolt-*</code> to the parent of a background component.',
    },
  },
};
