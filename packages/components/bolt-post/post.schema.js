module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Post',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-post&gt; tag.',
    },
    disabled: {
      type: 'boolean',
      description:
        'Default `disabled` prop supported globally by most Bolt components.',
      default: false,
    },
  },
};
