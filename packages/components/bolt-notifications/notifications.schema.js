module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Notifications',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outermost container.',
    },
    header: {
      type: 'object',
      properties: {
        switch_button: {
          type: 'any',
        },
        actions: {
          type: 'any',
        },
        content: {
          type: 'any',
        },
      },
    },
    footer: {
      type: 'object',
      properties: {
        content: {
          type: 'any',
        },
      },
    },
  },
};
