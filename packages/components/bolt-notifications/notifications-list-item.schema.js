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
    signifier: {
      type: 'any',
      description: 'Render an icon as a signifier for the notification.',
    },
    site_name: {
      type: 'any',
      description: 'Set the site name that the notification belongs to.',
    },
    timestamp: {
      type: 'any',
      description: 'Set the timestamp of the notification.',
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
          description:
            'Render content of the notification. Use <em> HTML element to emphasize certain words.',
        },
      },
    },
    read: {
      type: 'boolean',
      default: false,
      descriptions: 'Set this prop to true for read messages.',
    },
  },
};
