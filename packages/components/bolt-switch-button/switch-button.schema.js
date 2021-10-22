module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Switch Button',
  type: 'object',
  required: ['label'],
  properties: {
    attributes: {
      type: 'object',
      description:
        "A Drupal attributes object. Applies extra HTML attributes to this component's parent container.",
    },
    button_attributes: {
      type: 'object',
      description:
        "A Drupal attributes object. Applies extra HTML attributes to this component's &lt;button&gt; element.",
    },
    label: {
      type: 'any',
      description: 'Render a label in front of the switch button.',
    },
  },
};
