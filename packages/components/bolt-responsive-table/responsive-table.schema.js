module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Responsive Table',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-responsive-table&gt; tag.',
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
  },
};