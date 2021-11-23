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
          description:
            'Render a switch button. Usually to toggle viewing read/unread notifications.',
        },
        actions: {
          type: 'any',
          description: 'Render action buttons.',
        },
        content: {
          type: 'any',
          description:
            'Render custom content for the header. This prop overrides switch_button and actions.',
        },
      },
    },
    footer: {
      type: 'object',
      properties: {
        content: {
          type: 'any',
          description: 'Render content for the footer.',
        },
      },
    },
  },
};
