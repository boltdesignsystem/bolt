module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Stack',
  type: 'object',
  properties: {
    attributes: {
      title: 'Attributes (Twig-only)',
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outer &lt;bolt-stack&gt; tag.',
    },
    spacing: {
      type: 'string',
      description: 'Control the spacing in between items.',
      default: 'medium',
      enum: ['xlarge', 'large', 'medium', 'small', 'xsmall', 'none'],
    },
    content: {
      type: ['string', 'array', 'object'],
      description: 'Content of the stack.',
    },
  },
};
