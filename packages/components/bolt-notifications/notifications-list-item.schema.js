module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Notifications List Item',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the outermost container.',
    },
    properties: {
      signifier: {
        type: 'any',
      },
      site_name: {
        type: 'any',
      },
      timestamp: {
        type: 'any',
      },
      message: {
        type: 'object',
        properties: {
          attributes: {
            type: 'object',
            description:
              'A Drupal attributes object. Applies extra HTML attributes to the message container.',
          },
          content: {
            type: 'any',
          },
        },
      },
      read: {
        type: 'boolean',
        default: false,
        descriptions: 'Set this prop to true for read messages.',
      },
    },
  },
};
