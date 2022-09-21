module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'List',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this element.',
    },
    items: {
      type: 'any',
      description: 'An array of renderable items to place in the list.',
      content: {
        type: 'any',
      },
    },
    tag: {
      type: 'string',
      description: 'Apply the semantic tag for the list.',
      default: 'ul',
      enum: ['ul', 'ol'],
    },
    display: {
      type: 'string',
      description:
        'Display either an inline list of items or a block (stacked) list of items. Responsive options are also available for transforming from block to inline at specific breakpoints.',
      default: 'block',
      enum: [
        'block',
        'flex',
        'inline',
        'inline@xxsmall',
        'inline@xsmall',
        'inline@small',
        'inline@medium',
      ],
    },
    spacing: {
      type: 'string',
      description: 'Control the spacing in between items.',
      default: 'xsmall',
      enum: ['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    separator: {
      type: 'string',
      description: 'Display a separator in between items.',
      default: 'none',
      enum: ['none', 'solid', 'dashed'],
    },
    inset: {
      type: 'boolean',
      description: 'Turn spacing to the inside of each item.',
      default: false,
    },
    nowrap: {
      type: 'boolean',
      description:
        'Prevent inline/flex list items from wrapping to a second line.',
      default: false,
    },
  },
};
