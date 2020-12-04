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
      enum: [
        'unset',
        'start',
        'center',
        'end',
        'start-offset-small',
        'start-offset-medium',
        'start-offset-large',
        'start-offset-xlarge',
        'end-offset-small',
        'end-offset-medium',
        'end-offset-large',
        'end-offset-xlarge',
      ],
      default: 'unset',
    },
    order: {
      type: 'string',
      description:
        'Bring the layout item to the start of the layout. Only use this if the order of layout items need to be adjusted at specific breakpoints. The @until-* keywords mean "starting at 0px until a particular breakpoint".',
      enum: ['unset', 'primary@until-small', 'primary@until-medium'],
      default: 'unset',
    },
  },
};
