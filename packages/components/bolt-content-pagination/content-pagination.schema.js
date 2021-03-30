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
  },
};
