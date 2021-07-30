module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Header Nav ul',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description: 'Content of page header nav ul. Nav li are expected here.',
    },
    category: {
      type: 'string',
      description: 'Indicate which set of navigation this nav ul is rendering.',
      enum: ['site', 'related-sites', 'user'],
    },
    popover_position: {
      type: 'string',
      description:
        'Set the position of the nav ul if the parent nav li has the popover prop set to "true". This only applies if the nav ul is a child of a nav li.',
      enum: ['edge-start', 'edge-end'],
    },
  },
};
