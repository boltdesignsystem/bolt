module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Switch Button',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-switch-button&gt; tag.',
    },
    label: {
      type: 'any',
      description: 'Render a label in front of the switch button.',
    },
  },
};
