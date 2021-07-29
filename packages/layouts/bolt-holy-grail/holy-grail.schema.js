module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Holy Grail',
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
      description: 'The main content area of the layout.',
    },
    sidebar: {
      type: 'object',
      description:
        'The primary sidebar of the layout. Sidebar twig template is expected to be passed here.',
    },
    secondary_sidebar: {
      type: 'object',
      description:
        'The secondary sidebar of the layout. Secondary sidebar twig template is expected to be passed here.',
    },
  },
};
