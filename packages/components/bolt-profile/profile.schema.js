module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Profile',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to parent container.',
    },
    avatar: {
      type: 'any',
      description: 'Render a custom avatar image.',
    },
    cover: {
      type: 'any',
      description: 'Render a custom cover image.',
    },
    name: {
      type: 'object',
      description: 'Render a name and/or username for the user.',
      properties: {
        content: {
          type: 'any',
          description: 'Set the text content.',
        },
        tag: {
          type: 'string',
          description: 'Set the semantic heading level.',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          default: 'h2',
        },
      },
    },
    job_title: {
      type: 'any',
      description: 'Render job title of the user.',
    },
    location: {
      type: 'any',
      description: 'Render location of the user.',
    },
    actions: {
      type: 'any',
      description:
        'Render user actions. Icon-only button elements are expected here.',
    },
    chips: {
      type: 'any',
      description:
        'Render chips based on user info. Chip components (no Chip List) are expected here.',
    },
    message: {
      type: 'object',
      description: 'Render a message button.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the message container.',
        },
        label: {
          type: 'any',
          description: 'Text label of the message button.',
        },
      },
    },
    stats: {
      type: 'array',
      description: 'Render stats with text labels.',
      items: {
        type: 'object',
        properties: {
          attributes: {
            type: 'object',
            description:
              'A Drupal attributes object. Applies extra HTML attributes to the stat container.',
          },
          label: {
            type: 'any',
            description: 'Text label of the stat.',
          },
          number: {
            type: 'any',
            description: 'Number of the stat.',
          },
        },
      },
    },
    full_bleed: {
      type: 'boolean',
      description:
        'Set the profile to expand the full viewport. Use this prop for building a profile header for a particular page.',
      default: false,
    },
  },
};
