module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Printable',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: 'any',
      description: 'Content to be styled for print.',
    },
    tag: {
      type: 'string',
      description: 'Set the HTML tag for the content container.',
      default: 'article',
      enum: ['article', 'div'],
    },
  },
};
