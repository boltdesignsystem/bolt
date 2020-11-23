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
      description: 'Content to render inside each layout item.',
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
    source_order: {
      type: 'string',
      description:
        'The order of the layout item when layout items are stacked.',
      enum: [
        'auto',
        'primary@until-small',
        'primary@until-medium',
        'secondary@until-small',
        'secondary@until-medium',
      ],
      default: 'auto',
    },
  },
};
