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
        'Link of the nav list item. Passing the "href" attribute will turn it into a semantic link and passing the "type" attribute will turn it into a semantic button.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
        },
        content: {
          type: 'any',
          description: 'Set the label text for the link.',
        },
        icon_before: {
          type: 'any',
          description: 'Set an icon before a social link.',
        },
      },
    },
  },
};
