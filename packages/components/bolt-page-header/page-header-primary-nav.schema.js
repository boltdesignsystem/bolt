module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Header Primary Nav',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: ['string', 'array', 'object'],
      description:
        'Content of page header primary nav. Nav ul are expected here.',
    },
    align_site_nav_items: {
      type: 'string',
      description:
        'Set the site nav item alignment. This only applies to children nav ul with category set to "site", it has no effects on other categories.',
      enum: ['start', 'center', 'end'],
    },
  },
};
