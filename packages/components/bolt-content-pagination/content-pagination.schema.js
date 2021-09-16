module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Content Pagination',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    parent: {
      type: 'object',
      description: 'Set the parent page link.',
      properties: {
        content: {
          type: 'any',
          description: 'Text content of the link.',
        },
        tooltip_content: {
          type: 'any',
          description: 'Text content of the tooltip.',
        },
        link_attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the link element.',
        },
      },
    },
    previous: {
      type: 'object',
      description: 'Set the previous page link.',
      properties: {
        content: {
          type: 'any',
          description: 'Text content of the link.',
        },
        tooltip_content: {
          type: 'any',
          description: 'Text content of the tooltip.',
        },
        link_attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the link element.',
        },
      },
    },
    next: {
      type: 'object',
      description: 'Set the next page link.',
      properties: {
        content: {
          type: 'any',
          description: 'Text content of the link.',
        },
        tooltip_content: {
          type: 'any',
          description: 'Text content of the tooltip.',
        },
        link_attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the link element.',
        },
      },
    },
  },
};
