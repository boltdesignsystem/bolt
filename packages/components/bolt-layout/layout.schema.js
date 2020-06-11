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
    stack_items: {
      type: 'string',
      description: 'Stack items until the layout is at specified breakpoint.',
      enum: ['@until-small', '@until-medium'],
      default: '@until-small',
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
    items: {
      type: 'array',
      description: 'Array of layout items to render inside the layout.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-layout&gt; tag.',
        },
        content: {
          type: 'any',
          description: 'Content to render inside each layout item.',
        },
        width: {
          type: 'string',
          description:
            'Percent number or pixel value for the width of a particular layout item.',
          enum: [
            'auto',
            '80px',
            '150px',
            '50%',
            '80px@from-small',
            '150px@from-small',
            '25%@from-small',
            '33%@from-small',
            '50%@from-small',
            '67%@from-small',
            '75%@from-small',
            '80px@from-medium',
            '150px@from-medium',
            '25%@from-medium',
            '33%@from-medium',
            '50%@from-medium',
            '67%@from-medium',
            '75%@from-medium',
          ],
          default: 'auto',
        },
        valign_self: {
          type: 'string',
          description:
            'Vertical alignment of a particular layout item. This will ignore the vertical alignment of the whole layout.',
          enum: [
            'unset',
            'justify',
            'start',
            'center',
            'end',
            'start-offset-small',
            'start-offset-medium',
            'start-offset-large',
            'start-offset-xlarge',
            'start-offset-xxlarge',
            'end-offset-small',
            'end-offset-medium',
            'end-offset-large',
            'end-offset-xlarge',
            'end-offset-xxlarge',
          ],
          default: 'unset',
        },
        stack_order: {
          type: 'string',
          description:
            'The order of the layout item when layout items are stacked. Only enabled when <code>data-stack-items</code> prop is also in use.',
          enum: ['auto', 'primary', 'secondary'],
          default: 'auto',
        },
      },
    },
  },
};
