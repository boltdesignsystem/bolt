module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Layout-Item',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-layout-item&gt; tag.',
    },
    content: {
      type: 'any',
      description: 'Content of the layout item.',
    },
    valign_self: {
      type: 'string',
      description:
        'Control the vertical alignment of the layout item. This will ignore the vertical alignment set on the layout.',
      enum: ['start', 'center', 'end', 'start-offset', 'end-offset'],
    },
    order: {
      type: 'string',
      description:
        'Bring the layout item to the start or the end of the layout. Only use this if the order of layout items need to be adjusted at specific breakpoints. The @from-* keywords mean "starting from a particular breakpoint".',
      enum: [
        'first',
        'last',
        'first@from-small',
        'first@from-medium',
        'last@from-small',
        'last@from-medium',
      ],
    },
  },
};
