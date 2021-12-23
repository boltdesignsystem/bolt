module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Satellite',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-satellite&gt; tag.',
    },
    title: {
      type: 'any',
      description: 'Title of Example.',
    },
    content: {
      type: 'any',
      description: 'The main Example content.',
    },
    disabled: {
      type: 'boolean',
      description:
        'Default `disabled` prop supported globally by most Bolt components.',
      default: false,
    },
    position: {
      type: 'string',
      description: '',
      enum: ['bottom-right', 'middle-right', 'top-right', 'static'],
      default: 'bottom-right',
    },
    stash: {
      type: 'number',
      description: '',
      enum: [1, 2, 3],
      default: 2,
    },
  },
};
