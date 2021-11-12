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
    first_name: {
      type: 'any',
      description: 'Render first name of the user.',
    },
    last_name: {
      type: 'any',
      description: 'Render last name of the user.',
    },
    username: {
      type: 'any',
      description: 'Render username of the user.',
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
    full_bleed: {
      type: 'boolean',
      description:
        'Set the profile to expand the full viewport. Use this prop for building a profile header for a particular page.',
      default: false,
    },
  },
};
