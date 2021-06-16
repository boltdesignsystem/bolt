module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Site',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    header: {
      type: 'any',
      description: 'The header of the site.',
    },
    main: {
      type: 'object',
      description:
        'The main area of the site. This creates the <code>&lt;main&gt;</code> element.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the <code>&lt;main&gt;</code> element.',
        },
        content: {
          type: 'any',
          description: 'The main content of the site.',
        },
      },
    },
    footer: {
      type: 'any',
      description: 'The footer of the site.',
    },
  },
};
