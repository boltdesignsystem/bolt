const layoutItemSchema = require('@bolt/layouts-layout/layout-item.schema');
const backgroundSchema = require('@bolt/components-background/background.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Layout',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-layout&gt; tag.',
    },
    template: {
      type: 'string',
      description:
        'The column widths of the items and when they change from stacked.',
      enum: [
        '25/25/50@from-medium',
        '25/25/50@from-small',
        '25/50/25@from-medium',
        '25/50/25@from-small',
        '25/75@from-medium',
        '25/75@from-small',
        '33/67@from-medium',
        '33/67@from-small',
        '50/25/25@from-medium',
        '50/25/25@from-small',
        '67/33@from-medium',
        '67/33@from-small',
        '75/25@from-medium',
        '75/25@from-small',
        'flag-150px@from-medium',
        'flag-150px@from-small',
        'flag-80px@from-medium',
        'flag-80px@from-small',
        'fourths@from-medium',
        'fourths@from-small',
        'halves@from-medium',
        'halves@from-small',
        'thirds@from-medium',
        'thirds@from-small',
        'tiles@from-medium',
        'tiles@from-small',
      ],
    },
    gutter: {
      type: 'string',
      description: 'The spacing in between layout items (when not stacked).',
      enum: ['small', 'medium', 'large', 'xlarge'],
      default: 'medium',
    },
    row_gutter: {
      type: 'string',
      description: 'The spacing in between layout items (when stacked).',
      enum: ['small', 'medium', 'large', 'xlarge'],
      default: 'medium',
    },
    padding_top: {
      type: 'string',
      description: 'Top padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
      default: 'medium',
    },
    padding_bottom: {
      type: 'string',
      description: 'Bottom padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
      default: 'medium',
    },
    align_items: {
      type: 'string',
      description: 'Horizontal alignment of layout items.',
      enum: ['unset', 'justify', 'start', 'center', 'end'],
      default: 'center',
    },
    valign_items: {
      type: 'string',
      description: 'Vertical alignment of layout items (when not stacked).',
      enum: ['unset', 'justify', 'start', 'center', 'end'],
      default: 'unset',
    },
    background: {
      type: 'string',
      ...backgroundSchema,
    },
    items: {
      type: 'array',
      description: 'Array of layout items to render inside the layout.',
      ...layoutItemSchema,
    },
  },
};
