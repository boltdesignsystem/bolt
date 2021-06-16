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
    content: {
      type: 'any',
      description:
        'The main content of the site. <code>site_content</code> block is also available.',
    },
    header: {
      type: 'any',
      description:
        'The header of the site. <code>site_header</code> block is also available.',
    },
    footer: {
      type: 'any',
      description:
        'The footer of the site. <code>site_footer</code> block is also available.',
    },
  },
};
