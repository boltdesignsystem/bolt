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
      description: 'Content of the List. List Items are expected here.',
    },
    tag: {
      type: 'string',
      description: 'Set the semantic tag for the list.',
      default: 'ul',
      enum: ['ul', 'ol'],
    },
    display: {
      type: 'string',
      description:
        'Display either an horizontal list of items or a vertical list of items. Responsive options are also available for transforming from block to horizontal at specific breakpoints.',
      default: 'vertical',
      enum: [
        'vertical',
        'horizontal',
        'horizontal@xxsmall',
        'horizontal@xsmall',
        'horizontal@small',
        'horizontal@medium',
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
    align: {
      type: 'string',
      description: 'Control the horizontal alignment of items.',
      default: 'start',
      enum: ['start', 'center', 'end', 'justify'],
    },
    valign: {
      type: 'string',
      description: 'Control the vertical alignment of items.',
      default: 'center',
      enum: ['start', 'center', 'end'],
    },
    inset: {
      type: 'boolean',
      description: 'Set spacing on the inside of each item.',
      default: false,
    },
    nowrap: {
      type: 'boolean',
      description:
        'Prevent horizontal/flex list items from wrapping to a second line.',
      default: false,
    },
  },
};
