module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Notifications List',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outermost container.',
    },
    content: {
      type: 'any',
      description: 'Render either heading dividers and/or list items.',
    },
  },
};
