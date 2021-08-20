module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Footer Nav li',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    link: {
      type: 'object',
      description:
        'Link of the nav li. Passing the "href" attribute will turn it into a semantic link.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
        },
        content: {
          type: 'any',
          description: 'Displays name of the link.',
        },
        icon: {
          type: 'any',
          description: 'An icon can be passed to the link.',
        },
      },
    },
  },
};
