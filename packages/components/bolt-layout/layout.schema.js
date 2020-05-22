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
    dataGutter: {
      type: 'string',
      description: 'The spacing in between layout items (when not stacked).',
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    dataRowGutter: {
      type: 'string',
      description: 'The spacing in between layout items (when stacked).',
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    dataPaddingTop: {
      type: 'string',
      description: 'Top padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
      default: 'medium',
    },
    dataPaddingBottom: {
      type: 'string',
      description: 'Bottom padding of the layout.',
      enum: ['none', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
      default: 'medium',
    },
    dataStackItems: {
      type: 'string',
      description: 'Stack items until the layout is at specified breakpoint.',
      enum: ['until@small', 'until@medium'],
      default: 'until@small',
    },
    dataAlignItems: {
      type: 'string',
      description: 'Horizontal alignment of layout items (when not stacked).',
      enum: ['start', 'center', 'end'],
      default: 'center',
    },
    dataValignItems: {
      type: 'string',
      description: 'Vertical alignment of layout items (when not stacked).',
      enum: ['unset', 'start', 'center', 'end'],
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
        dataWidth: {
          type: 'string',
          description:
            'Percent number or pixel value for the width of a particular layout item.',
          enum: ['auto', '80px', '150px', '25%', '33%', '50%', '67%', '75%'],
          default: 'auto',
        },
        dataStackFirst: {
          type: 'boolean',
          description:
            'The order of the layout item will be prioritized when layout items are stacked. Only enabled when <code>stack-items</code> prop on <code>bolt-layout</code> is also in use.',
        },
      },
    },
  },
};
