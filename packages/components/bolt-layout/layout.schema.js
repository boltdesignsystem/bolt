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
      description: 'The spacing in between layout items.',
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
      type: 'boolean',
      description: 'Stack items until the layout is at specified breakpoint.',
      enum: ['until@small', 'until@medium'],
      default: 'until@small',
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
            'Percent number for the width of a particular layout item.',
        },
      },
    },
  },
};
