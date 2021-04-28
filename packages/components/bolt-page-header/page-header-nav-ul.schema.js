module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Header Nav Ul',
  type: 'object',
  required: ['content', 'category'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: ['string', 'array', 'object'],
      description: 'Content of page header nav ul. Nav li are expected here.',
    },
    category: {
      type: 'string',
      description: 'Indicate which set of navigation this nav ul is rendering.',
      enum: ['site', 'related-sites', 'user'],
    },
    wrap_site_nav_items: {
      type: 'boolean',
      description:
        'Set the site nav items to wrap once it runs out of available space. This only applies when category is set to "site", it has no effects on other categories.',
      default: false,
    },
    popover_position: {
      type: 'string',
      description:
        'Set the position of the nav ul if the parent nav li has popover set to "true". This only applies if the nav ul is a child of a nav li.',
      enum: ['edge-start', 'edge-end'],
    },
    flat: {
      type: 'boolean',
      description:
        'Indicate if the nav ul is a flat list (no nesting at all). This only applies when category is set to "site", it has no effects on other categories.',
      default: false,
    },
  },
};
