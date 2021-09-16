module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Side Nav li',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    link: {
      type: 'object',
      description: 'Set a nav link item.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the link element.',
        },
        content: {
          type: 'any',
          description: 'Text content of the link.',
        },
        icon: {
          type: 'any',
          description:
            'Set an icon after the link text. Use this to indicate external links. Do not use this if the link has children.',
        },
      },
    },
    children: {
      type: 'object',
      description:
        'Render the nested children links. side-nav-ul template is expected here.',
    },
    current: {
      type: 'boolean',
      description: 'Indicate the link item as the current page.',
    },
    expanded: {
      type: 'boolean',
      description:
        'Set the nested children links to be expanded by default. This only applies if the children is also set.',
    },
  },
};
