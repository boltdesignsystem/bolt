module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Billboard',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the &lt;bolt-billboard&gt; tag.',
    },
    content: {
      type: 'any',
      description: 'The main Example content.',
    },
    template: {
      type: 'string',
      default: 'halves@from-small',
    },
    theme: {
      type: 'string',
      default: 'light',
    },
    image: {},
    image_valign: {
      type: 'string',
      default: 'start',
    },
  },
};
