module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Button Group',
  type: 'object',
  properties: {
    tag: {
      type: 'string',
      description: 'Set the HTML tag for the button group container.',
      enum: ['ul', 'ol'],
    },
    buttons: {
      type: 'array',
      description: 'An array of buttons.',
      items: {
        type: ['string', 'object', 'array'],
        description:
          'Items should be passed as renderable content (i.e. a string, render array, or included pattern). Passing anything besides a Bolt button is not supported.',
      },
    },
  },
};
