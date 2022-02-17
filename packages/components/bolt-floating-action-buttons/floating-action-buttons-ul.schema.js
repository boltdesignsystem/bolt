module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Floating Action Buttons UL',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-floating-action-buttons&gt; tag.',
    },
    content: {
      type: 'any',
      description: 'The main content.',
    },
  },
};
