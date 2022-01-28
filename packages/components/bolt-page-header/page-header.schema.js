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
      type: 'any',
      description:
        'Primary content of page header. Primary nav and search panel are expected here.',
    },
    secondary_content: {
      type: 'any',
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
    subheadline: {
      type: 'any',
      description: 'Text or other content to display next to the logo.',
    },
    cta: {
      type: 'any',
      description:
        'Set the main call-to-action. Button element is expected here.',
    },
    static: {
      type: 'boolean',
      description: 'Set the page header to be static instead of sticky.',
      default: false,
    },
    full_width: {
      type: 'boolean',
      description:
        'Set the page header width to span across the full viewport.',
      default: false,
    },
  },
};
