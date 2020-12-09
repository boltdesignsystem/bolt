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
    content: {
      type: 'any',
      description:
        'Content of the layout. While anything can be passed, layout items are preferred.',
      ...layoutItemSchema,
    },
    template: {
      type: 'string',
      description:
        'Select from a predefined set of layout templates. Numbers represent % of each layout item widths. The @from-* keywords mean "starting from a particular breakpoint".',
      enum: [
        '50@from-small',
        '50@from-medium',
        '67@from-small',
        '67@from-medium',
        '75@from-small',
        '75@from-medium',
        '25/25/50@from-small',
        '25/25/50@from-medium',
        '25/50/25@from-small',
        '25/50/25@from-medium',
        '25/75@from-small',
        '25/75@from-medium',
        '33/67@from-small',
        '33/67@from-medium',
        '50/25/25@from-small',
        '50/25/25@from-medium',
        '67/33@from-small',
        '67/33@from-medium',
        '75/25@from-small',
        '75/25@from-medium',
        'fourths@from-small',
        'fourths@from-medium',
        'halves',
        'halves@from-small',
        'halves@from-medium',
        'thirds@from-small',
        'thirds@from-medium',
        'tiles',
        'tiles@from-small',
        'tiles@from-medium',
        'flag',
        'flag@from-small',
        'flag@from-medium',
      ],
      default: '67/33@from-small',
    },
    gutter: {
      type: 'string',
      description: 'Set the horizontal spacing in between layout items.',
      enum: ['none', 'small', 'medium', 'large'],
      default: 'medium',
    },
    row_gutter: {
      type: 'string',
      description: 'Set the vertical spacing in between layout items.',
      enum: ['none', 'small', 'medium', 'large'],
      default: 'medium',
    },
    padding_top: {
      type: 'string',
      description: 'Set the top padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge'],
      default: 'medium',
    },
    padding_bottom: {
      type: 'string',
      description: 'Set the bottom padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge'],
      default: 'medium',
    },
    align_items: {
      type: 'string',
      description: 'Control the horizontal alignment of all layout items.',
      enum: ['start', 'center', 'end'],
      default: 'center',
    },
    valign_items: {
      type: 'string',
      description:
        'Control the vertical alignment of all layout items. Unset is required for setting equal-height layout items, do not set this prop if that is the intention.',
      enum: ['start', 'center', 'end'],
    },
    background: {
      type: 'string',
      ...backgroundSchema,
    },
  },
};
