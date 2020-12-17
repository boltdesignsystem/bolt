module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Page Header',
  type: 'object',
  required: ['content', 'logo'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: ['string', 'array', 'object'],
      description:
        'Primary content of page header. Primary nav and search panel are expected here.',
    },
    secondary_content: {
      type: ['string', 'array', 'object'],
      description:
        'Secondary content of page header (sub nav, visible search bar, breadcrumbs, etc.).',
    },
    logo: {
      type: 'object',
      description:
        'Set the site logo. This can be turned into a link by passing the "href" attribute.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
        },
        image_src: {
          type: 'string',
          description: 'Set the path to the logo image.',
        },
        label: {
          type: 'string',
          description: 'Set a label (visually hidden) for the logo.',
        },
      },
    },
    cta: {
      type: 'object',
      description:
        'Set the main call-to-action. This can be either a semantic link or button. Passing the "href" attribute will turn it into a link while the "type" attribute will turn it into a button.',
      properties: {
        attributes: {
          type: 'object',
          description:
            'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
        },
        content: {
          type: 'string',
          description: 'Text content of the call-to-action.',
        },
      },
    },
  },
};
