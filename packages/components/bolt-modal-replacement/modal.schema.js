module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Modal',
  type: 'object',
  properties: {
    attributes: {
      title: 'Attributes (Twig-only)',
      type: 'object',
      description:
        'A Drupal attributes object. Used to apply additional HTML attributes to the outer &lt;bolt-modal&gt; tag.',
    },
  },
};
